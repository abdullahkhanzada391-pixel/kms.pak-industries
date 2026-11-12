import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Services from '../components/Services';

export default function ServicesPage({ onSelectServiceForContact }) {
  const navigate = useNavigate();

  const handleSelectService = (serviceName) => {
    if (onSelectServiceForContact) {
      onSelectServiceForContact(serviceName);
    }
    navigate('/contact');
  };

  return (
    <div className="space-y-0">
      <PageHeader
        title="Engineering Capabilities:"
        highlight="Powering Every Possibility"
        subtitle="Explore KPS's 8 specialized engineering divisions, spanning heavy power generation (15–2500 kVA), electrical switchgear, acoustic fabrication, solar projects, and turnkey execution."
      />

      <Services onSelectServiceForContact={handleSelectService} />
    </div>
  );
}
