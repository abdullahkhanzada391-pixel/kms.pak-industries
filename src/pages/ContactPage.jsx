import React from 'react';
import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';

export default function ContactPage({ preselectedService }) {
  return (
    <div className="space-y-0">
      <PageHeader
        badge="GET IN TOUCH"
        title="Contact Our Team &"
        highlight="Engineering Desk"
        subtitle="Request generator quotations, preventative maintenance agreements, electrical switchgear designs, or consult directly with our senior power engineering specialists."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <ContactSection preselectedService={preselectedService} />
    </div>
  );
}

