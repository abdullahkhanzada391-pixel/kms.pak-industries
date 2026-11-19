import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServicesHero from '../components/services/ServicesHero';
import ServicesCatalog from '../components/services/ServicesCatalog';
import FeaturedServices from '../components/services/FeaturedServices';
import EngineeringApproach from '../components/services/EngineeringApproach';
import ServicesCTA from '../components/services/ServicesCTA';
import ServiceDetailModal from '../components/services/ServiceDetailModal';

export default function ServicesPage({ onSelectServiceForContact }) {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Services & Engineering Solutions | HK Power Industries";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleSelectService = (serviceName) => {
    if (onSelectServiceForContact) {
      onSelectServiceForContact(serviceName);
    }
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section - Asymmetric layout, Engineering Solutions Built for Performance */}
      <ServicesHero />

      {/* 2. Services Overview - All 8 Service Categories Grid */}
      <ServicesCatalog onOpenModal={handleOpenModal} />

      {/* 3. Featured Distinctive Sections (Power Generation, Electrical & Solar, Fabrication & Ducting) */}
      <FeaturedServices onOpenServiceModal={handleOpenModal} />

      {/* 4. Our Engineering Approach (From Planning to Performance - 4 Step Process) */}
      <EngineeringApproach />

      {/* 5. Final Call to Action (Let's Power Your Next Project) */}
      <ServicesCTA />

      {/* Interactive Detail Modal Dialog */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectService={handleSelectService}
      />
    </div>
  );
}
