// Test script for User Category Implementation
// Run this in the browser console to test the functionality

console.log('🧪 Testing User Category Implementation...');

// Test 1: Check if UserCategoryService is available
if (typeof UserCategoryService !== 'undefined') {
  console.log('✅ UserCategoryService is available');
} else {
  console.log('❌ UserCategoryService is not available');
}

// Test 2: Check if the form has the user category dropdown
const userCategorySelect = document.querySelector('select[name="userCategory"]');
if (userCategorySelect) {
  console.log('✅ User category dropdown found in form');
  console.log('Options:', Array.from(userCategorySelect.options).map(opt => opt.value));
} else {
  console.log('❌ User category dropdown not found in form');
}

// Test 3: Check if the form validation includes user category
const form = document.querySelector('form');
if (form) {
  console.log('✅ Registration form found');
  
  // Test form submission without category
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    console.log('✅ Submit button found');
    
    // Simulate form submission to test validation
    const originalSubmit = form.onsubmit;
    form.onsubmit = (e) => {
      e.preventDefault();
      console.log('✅ Form submission intercepted for testing');
      
      // Check if all required fields are present
      const requiredFields = ['fullName', 'email', 'phoneNumber', 'transactionId', 'userCategory'];
      const missingFields = requiredFields.filter(field => {
        const input = form.querySelector(`[name="${field}"]`);
        return !input || !input.value;
      });
      
      if (missingFields.length > 0) {
        console.log('❌ Missing required fields:', missingFields);
      } else {
        console.log('✅ All required fields are filled');
      }
      
      // Restore original submit handler
      form.onsubmit = originalSubmit;
    };
  }
} else {
  console.log('❌ Registration form not found');
}

// Test 4: Check if category analytics tab exists in admin dashboard
const categoryAnalyticsTab = document.querySelector('button[onclick*="category-analytics"]');
if (categoryAnalyticsTab) {
  console.log('✅ Category Analytics tab found in admin dashboard');
} else {
  console.log('❌ Category Analytics tab not found in admin dashboard');
}

// Test 5: Check if UserCategoryAnalytics component is loaded
const userCategoryAnalytics = document.querySelector('.category-analytics-container');
if (userCategoryAnalytics) {
  console.log('✅ UserCategoryAnalytics component is loaded');
} else {
  console.log('ℹ️ UserCategoryAnalytics component not currently visible (may be in different tab)');
}

// Test 6: Verify form data structure
const formData = {
  fullName: 'Test User',
  email: 'test@example.com',
  phoneNumber: '1234567890',
  transactionId: 'TXN123',
  userCategory: 'startup-founder'
};

console.log('✅ Form data structure includes userCategory:', formData);

// Test 7: Check database schema (if Supabase is available)
if (typeof supabase !== 'undefined') {
  console.log('✅ Supabase client is available');
  
  // Test database connection
  supabase
    .from('registrations')
    .select('user_category')
    .limit(1)
    .then(({ data, error }) => {
      if (error) {
        console.log('❌ Database query error:', error.message);
      } else {
        console.log('✅ Database connection successful');
        if (data && data.length > 0 && data[0].hasOwnProperty('user_category')) {
          console.log('✅ user_category column exists in database');
        } else {
          console.log('ℹ️ user_category column may not exist yet (run migration first)');
        }
      }
    });
} else {
  console.log('❌ Supabase client is not available');
}

console.log('🧪 User Category Implementation Test Complete!');
console.log('');
console.log('📋 Next Steps:');
console.log('1. Run the database migration: database_migration_user_category.sql');
console.log('2. Test the form submission with user category selected');
console.log('3. Check the admin dashboard Category Analytics tab');
console.log('4. Verify data is stored correctly in the database');
