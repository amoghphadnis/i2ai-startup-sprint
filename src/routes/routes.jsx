import React from 'react';
import Home from '@features/home/Home';
import UnicornClub from '@features/unicorn-club/UnicornClub';
import About from '@features/about/About';
import HowItWorks from '@features/how-it-works/HowItWorks';
import StartupInAction from '@features/startup-in-action/StartupInAction';
import Startups from '@features/Resources/Startups/Startups';
import Investors from '@features/Resources/Investors/Investors';
import Influencers from '@features/Resources/Influencers/Influencers';
import Enablers from '@features/Resources/Enablers/Enablers';
import Facilitators from '@features/Resources/Facilitators/Facilitators';
import Mentors from '@features/Resources/Mentors/Mentors';
import FAQ from '@features/FAQ/Faq';
import Register from '@features/auth/register/Register';
import ValueCalculator from '@pages/ValueCalculator/ValueCalculator';
import TermsAndPrivacy from '@components/WebContentFetcher/TermsAndPrivacy';
import InvestorCommunication from '@features/about/Investor-Communication/Investor-Communication.jsx';
import Leaderboard from '@features/unicorn-club/Leaderboard/Leaderboard';
import VCLeaderboard from '@features/vc-leaderboard/VCLeaderboard';
import Pricing from '@pages/Pricing/Pricing';
import ProfessionalZone from '@pages/EmployeeBenefits/ProfessionalZone';
import HonoraryPioneers from '@features/honorary-pioneers';
import AdminDashboard from '@components/AdminDashboard';
import { ReferralTracker } from '@components/ReferralSystem';
// ... other imports

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/Unicorns',
    element: <UnicornClub />,
  },
  {
    path: '/About',
    element: <About />,
  },
  {
    path: '/How-It-Works',
    element: <HowItWorks />,
  },
  {
    path: '/Startup-In-Action',
    element: <StartupInAction />,
  },
  {
    path: '/Pricing',
    element: <Pricing />,
  },
  {
    path: '/Startups',
    element: <Startups />,
  },
  {
    path: '/Enablers',
    element: <Enablers />,
  },
  {
    path: '/Facilitators',
    element: <Facilitators />,
  },
  {
    path: '/Mentors',
    element: <Mentors />,
  },
  {
    path: '/Influencers',
    element: <Influencers />,
  },
  {
    path: '/Investors',
    element: <Investors />,
  },
  {
    path: '/Faq',
    element: <FAQ />,
  },
  {
    path: '/Register',
    element: <Register />,
  },
  {
    path: '/ValueCalculator',
    element: <ValueCalculator />,
  },
  {
    path: '/terms-and-privacy',
    element: <TermsAndPrivacy />,
  },
  {
    path: '/Investor-Communication',
    element: <InvestorCommunication />,
  },
  {
    path: '/Leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/VC-Leaderboard',
    element: <VCLeaderboard />,
  },
  {
    path: '/Professional-Zone',
    element: <ProfessionalZone />,
  },
  {
    path: '/Honorary-Pioneers',
    element: <HonoraryPioneers />,
  },
  {
    path: '/Admin-Dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/Referral-Dashboard',
    element: <ReferralTracker />,
  }
];