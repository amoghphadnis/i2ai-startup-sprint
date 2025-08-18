-- Insert existing referral codes for existing users
-- These codes were generated through a different application

-- 1. Mr. Suhas Wamanrao Kulkarni (Honorary Pioneer)
INSERT INTO public.referral_links (
    id,
    user_id,
    referral_code,
    referral_type,
    is_active,
    click_count,
    successful_referrals,
    total_commission,
    created_at
) VALUES (
    gen_random_uuid(),
    (SELECT id FROM auth.users WHERE email = 'Swk1959@rediffmail.com' LIMIT 1),
    'pc87ace4cd2',
    'Professional Zone', -- Using existing constraint value, but works for both pages
    true,
    0,
    0,
    0.00,
    NOW()
);

-- 2. Microbiology Society (Dr A. M. Deshmukh)
INSERT INTO public.referral_links (
    id,
    user_id,
    referral_code,
    referral_type,
    is_active,
    click_count,
    successful_referrals,
    total_commission,
    created_at
) VALUES (
    gen_random_uuid(),
    (SELECT id FROM auth.users WHERE email = 'mbiosocietyai@gmail.com' LIMIT 1),
    'pcc36be2716',
    'Professional Zone', -- Using existing constraint value, but works for both pages
    true,
    0,
    0,
    0.00,
    NOW()
);

-- ============================================================================
-- IMPORTANT: First, update the database constraint to allow new referral types
-- ============================================================================

-- Step 1: Drop the existing constraint
ALTER TABLE public.referral_links DROP CONSTRAINT referral_links_referral_type_check;

-- Step 2: Create a new constraint that allows all the new page types
ALTER TABLE public.referral_links ADD CONSTRAINT referral_links_referral_type_check 
CHECK (
    referral_type = ANY (
        ARRAY[
            'Professional Zone'::text,
            'Resources'::text,
            'Startups'::text,
            'Mentors'::text,
            'Investors'::text,
            'Enablers'::text,
            'Influencers'::text,
            'Facilitators'::text
        ]
    )
);

-- ============================================================================
-- Now insert the new referral codes
-- ============================================================================

-- 3. Generate referral codes for all new page types (Mentors, Investors, Enablers, Influencers, Facilitators)
-- These codes will be used for testing and initial setup

-- Mentors referral codes
INSERT INTO public.referral_links (
    id,
    user_id,
    referral_code,
    referral_type,
    is_active,
    click_count,
    successful_referrals,
    total_commission,
    created_at
) VALUES 
    (gen_random_uuid(), NULL, 'mtest001', 'Mentors', true, 0, 0, 0.00, NOW()),
    (gen_random_uuid(), NULL, 'mtest002', 'Mentors', true, 0, 0, 0.00, NOW()),
    (gen_random_uuid(), NULL, 'mtest003', 'Mentors', true, 0, 0, 0.00, NOW());

-- Investors referral codes
INSERT INTO public.referral_links (
    id,
    user_id,
    referral_code,
    referral_type,
    is_active,
    click_count,
    successful_referrals,
    total_commission,
    created_at
) VALUES 
    (gen_random_uuid(), NULL, 'itest001', 'Investors', true, 0, 0, 0.00, NOW()),
    (gen_random_uuid(), NULL, 'itest002', 'Investors', true, 0, 0, 0.00, NOW()),
    (gen_random_uuid(), NULL, 'itest003', 'Investors', true, 0, 0, 0.00, NOW());

-- Enablers referral codes
INSERT INTO public.referral_links (
    id,
    user_id,
    referral_code,
    referral_type,
    is_active,
    click_count,
    successful_referrals,
    total_commission,
    created_at
) VALUES 
    (gen_random_uuid(), NULL, 'etest001', 'Enablers', true, 0, 0, 0.00, NOW()),
    (gen_random_uuid(), NULL, 'etest002', 'Enablers', true, 0, 0, 0.00, NOW()),
    (gen_random_uuid(), NULL, 'etest003', 'Enablers', true, 0, 0, 0.00, NOW());

-- Influencers referral codes
INSERT INTO public.referral_links (
    id,
    user_id,
    referral_code,
    referral_type,
    is_active,
    click_count,
    successful_referrals,
    total_commission,
    created_at
) VALUES 
    (gen_random_uuid(), NULL, 'ntest001', 'Influencers', true, 0, 0, 0.00, NOW()),
    (gen_random_uuid(), NULL, 'ntest002', 'Influencers', true, 0, 0, 0.00, NOW()),
    (gen_random_uuid(), NULL, 'ntest003', 'Influencers', true, 0, 0, 0.00, NOW());

-- Facilitators referral codes
INSERT INTO public.referral_links (
    id,
    user_id,
    referral_code,
    referral_type,
    is_active,
    click_count,
    successful_referrals,
    total_commission,
    created_at
) VALUES 
    (gen_random_uuid(), NULL, 'ftest001', 'Facilitators', true, 0, 0, 0.00, NOW()),
    (gen_random_uuid(), NULL, 'ftest002', 'Facilitators', true, 0, 0, 0.00, NOW()),
    (gen_random_uuid(), NULL, 'ftest003', 'Facilitators', true, 0, 0, 0.00, NOW());

-- Startups referral codes (for testing the updated system)
INSERT INTO public.referral_links (
    id,
    user_id,
    referral_code,
    referral_type,
    is_active,
    click_count,
    successful_referrals,
    total_commission,
    created_at
) VALUES 
    (gen_random_uuid(), NULL, 'stest001', 'Startups', true, 0, 0, 0.00, NOW()),
    (gen_random_uuid(), NULL, 'stest002', 'Startups', true, 0, 0, 0.00, NOW()),
    (gen_random_uuid(), NULL, 'stest003', 'Startups', true, 0, 0, 0.00, NOW());

-- Note: If the users don't exist in auth.users yet, you'll need to create them first
-- or set user_id to NULL temporarily and update later

-- Test URLs for the new referral codes:
-- Mentors: https://ws.i2u.ai/#/Mentors?ref=mtest001
-- Investors: https://ws.i2u.ai/#/Investors?ref=itest001
-- Enablers: https://ws.i2u.ai/#/Enablers?ref=etest001
-- Influencers: https://ws.i2u.ai/#/Influencers?ref=ntest001
-- Facilitators: https://ws.i2u.ai/#/Facilitators?ref=ftest001
-- Startups: https://ws.i2u.ai/#/Startups?ref=stest001
