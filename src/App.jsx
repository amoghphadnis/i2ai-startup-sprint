import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/header/Navbar";
import Home from "./components/HomePage/Home";
import UnicornClub from "./pages/Unicornclub/UnicornClub";
import HowItWorks from './pages/How-It-Works/HowItWorks';
import StartupInAction from './pages/Startup-In-Action/StartupInAction';
import Pricing from './pages/Pricing/Pricing';
import Resources from './pages/Resources/Resources';
import FAQ from './pages/FAQ/Faq';
import Register from './pages/Register/Register';
import ValueCalculator from "./pages/ValueCalculator/ValueCalculator";
import Terms from "./pages/Terms/Terms";
import TermsAndPrivacy from "./components/WebContentFetcher/TermsAndPrivacy";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Unicorns" element={<UnicornClub />} />
        <Route path="/How-It-Works" element={<HowItWorks />} />
        <Route path="/Startup-In-Action" element={<StartupInAction />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/Faq" element={<FAQ />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ValueCalculator" element={<ValueCalculator />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/terms-and-privacy" element={<TermsAndPrivacy />} />
      </Routes>
    </>
  );
}

export default App;
