import React from 'react';
import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';

export default function ContactPage({ preselectedService }) {
  return (
    <div className="space-y-0">
      <PageHeader
        title="Let's Power Your"
        highlight="Next Project"
        subtitle="Contact our Lahore headquarters for generator sales, technical maintenance, turnkey electrical switchgear, or nationwide project quotes."
      />

      <ContactSection preselectedService={preselectedService} />
    </div>
  );
}
