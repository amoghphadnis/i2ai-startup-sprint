#!/usr/bin/env node

/**
 * Simple test script to verify ContentPage system
 * Run with: node scripts/check-pages.js
 */

console.log('🔍 Checking ContentPage System...\n');

// Check if required files exist
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'src/styles/design-tokens.css',
  'src/components/layout/ContentPage.jsx',
  'src/features/Resources/components/ui/PageContainer.jsx',
  'src/features/Resources/components/ui/Hero.jsx',
  'src/features/Resources/components/ui/Section.jsx',
  'src/features/Resources/components/ui/PlanCard.jsx',
  'src/features/Resources/components/ui/PlansGrid.jsx',
  'src/features/Resources/components/ui/CTABand.jsx',
  'src/features/Resources/components/ui/FAQAccordion.jsx'
];

const refactoredPages = [
  'src/features/Resources/Mentors/Mentors.jsx',
  'src/features/Resources/Startups/Startups.jsx',
  'src/Resources/Investors/Investors.jsx',
  'src/features/Resources/Enablers/Enablers.jsx',
  'src/features/Resources/Influencers/Influencers.jsx',
  'src/features/Resources/Facilitators/Facilitators.jsx'
];

console.log('📁 Checking required component files...');
let allComponentsExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allComponentsExist = false;
  }
});

console.log('\n📄 Checking refactored page files...');
let allPagesRefactored = true;

refactoredPages.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('ContentPage')) {
        console.log(`✅ ${file} - Refactored`);
      } else {
        console.log(`⚠️  ${file} - Exists but not refactored`);
        allPagesRefactored = false;
      }
    } catch (error) {
      console.log(`❌ ${file} - Error reading file`);
      allPagesRefactored = false;
    }
  } else {
    console.log(`❌ ${file} - MISSING`);
    allPagesRefactored = false;
  }
});

console.log('\n🎯 Checking design tokens...');
if (fs.existsSync('src/styles/design-tokens.css')) {
  const tokensContent = fs.readFileSync('src/styles/design-tokens.css', 'utf8');
  if (tokensContent.includes('--bg') && tokensContent.includes('--space-md')) {
    console.log('✅ Design tokens file contains required variables');
  } else {
    console.log('⚠️  Design tokens file may be incomplete');
  }
} else {
  console.log('❌ Design tokens file missing');
}

console.log('\n📊 Summary:');
if (allComponentsExist && allPagesRefactored) {
  console.log('🎉 All checks passed! ContentPage system is ready.');
} else {
  console.log('⚠️  Some issues found. Please review the missing or incomplete files above.');
}

console.log('\n🚀 Next steps:');
console.log('1. Run the application: npm run dev');
console.log('2. Navigate to each resource page to verify they render correctly');
console.log('3. Check that all pages have consistent styling and layout');
console.log('4. Verify that plan selection scrolls to payment section');
console.log('5. Test responsive design on different screen sizes');

console.log('\n📝 Manual QA Checklist:');
console.log('- [ ] All pages render without errors');
console.log('- [ ] Hero sections display correctly with badges and CTAs');
console.log('- [ ] Content sections have consistent spacing and styling');
console.log('- [ ] Subscription plans display in 3-column grid on desktop');
console.log('- [ ] Payment sections are properly integrated');
console.log('- [ ] FAQ accordions work with keyboard navigation');
console.log('- [ ] Pages are responsive on mobile and tablet');
console.log('- [ ] Meta tags are properly set for SEO');
console.log('- [ ] Smooth scrolling works for plan selection');
console.log('- [ ] Design tokens are applied consistently across components');
