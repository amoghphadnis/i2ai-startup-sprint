-- Database Migration: Add User Category to Registrations
-- This migration adds user category tracking to the registrations table

-- Step 1: Create enum type for user categories
CREATE TYPE user_category_enum AS ENUM (
  'startup-founder',
  'professional', 
  'mentor',
  'investor',
  'influencer',
  'enabler',
  'facilitator'
);

-- Step 2: Add user_category column to registrations table
ALTER TABLE registrations 
ADD COLUMN user_category user_category_enum;

-- Step 3: Add comment to document the new field
COMMENT ON COLUMN registrations.user_category IS 'Category of the user (startup-founder, professional, mentor, investor, influencer, enabler, facilitator)';

-- Step 4: Create index for better query performance on user_category
CREATE INDEX idx_registrations_user_category ON registrations(user_category);

-- Step 5: Create a view for analytics on registrations by category
CREATE OR REPLACE VIEW registration_category_stats AS
SELECT 
  user_category,
  COUNT(*) as total_registrations,
  COUNT(CASE WHEN registration_status = 'verified' THEN 1 END) as verified_registrations,
  COUNT(CASE WHEN registration_status = 'pending' THEN 1 END) as pending_registrations,
  COUNT(CASE WHEN registration_status = 'rejected' THEN 1 END) as rejected_registrations,
  ROUND(
    (COUNT(CASE WHEN registration_status = 'verified' THEN 1 END)::DECIMAL / COUNT(*)::DECIMAL) * 100, 2
  ) as verification_rate_percent
FROM registrations 
WHERE user_category IS NOT NULL
GROUP BY user_category
ORDER BY total_registrations DESC;

-- Step 6: Create a function to get registration statistics by category
CREATE OR REPLACE FUNCTION get_registration_stats_by_category()
RETURNS TABLE (
  category user_category_enum,
  total_count BIGINT,
  verified_count BIGINT,
  pending_count BIGINT,
  rejected_count BIGINT,
  verification_rate DECIMAL(5,2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rs.user_category,
    rs.total_registrations,
    rs.verified_registrations,
    rs.pending_registrations,
    rs.rejected_registrations,
    rs.verification_rate_percent
  FROM registration_category_stats rs;
END;
$$ LANGUAGE plpgsql;

-- Step 7: Grant necessary permissions (adjust based on your RLS setup)
-- This assumes you have RLS enabled and need to grant access to authenticated users
GRANT SELECT ON registration_category_stats TO authenticated;
GRANT EXECUTE ON FUNCTION get_registration_stats_by_category() TO authenticated;

-- Step 8: Update existing registrations with a default category if needed
-- Uncomment and modify the line below if you want to set a default category for existing records
-- UPDATE registrations SET user_category = 'professional' WHERE user_category IS NULL;

-- Verification queries to test the migration:
-- SELECT * FROM registration_category_stats;
-- SELECT * FROM get_registration_stats_by_category();
-- SELECT COUNT(*) as total_registrations, COUNT(user_category) as with_category FROM registrations;
