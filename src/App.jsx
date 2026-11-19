import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import CookieConsent from './components/CookieConsent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import MaintenancePage from './pages/MaintenancePage';
import ProjectsPage from './pages/ProjectsPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [selectedServiceForContact, setSelectedServiceForContact] = useState('');

  return (
    <BrowserRouter>
      {/* Scroll window to top on every route change */}
      <ScrollToTop />

      {/* Precision Interactive Desktop Cursor */}
      <CustomCursor />

      {/* Cookie and Privacy Preferences Banner */}
      <CookieConsent />

      <div className="min-h-screen bg-white text-[#0B192C] flex flex-col justify-between selection:bg-[#0B192C] selection:text-[#F59E0B] w-full max-w-full overflow-x-hidden">
        {/* Top Global Editorial Navigation Bar */}
        <Navbar />

        {/* Page Content Routes */}
        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route 
              path="/services" 
              element={<ServicesPage onSelectServiceForContact={setSelectedServiceForContact} />} 
            />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route 
              path="/contact" 
              element={<ContactPage preselectedService={selectedServiceForContact} />} 
            />
            {/* Fallback to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Global Dark Mocha Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
