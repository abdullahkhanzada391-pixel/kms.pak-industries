import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
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

      <div className="min-h-screen bg-[#111315] text-[#E8ECE9] flex flex-col justify-between selection:bg-[#174D38] selection:text-white">
        {/* Top Global Dark Luxury Navigation Bar */}
        <Navbar />

        {/* Page Content Routes */}
        <main className="flex-1">
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

        {/* Global Dark Luxury Industrial Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
