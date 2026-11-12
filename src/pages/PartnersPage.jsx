import React from 'react';
import PageHeader from '../components/PageHeader';
import PartnersClients from '../components/PartnersClients';

export default function PartnersPage() {
  return (
    <div className="space-y-0">
      <PageHeader
        badge="VERIFIED CORPORATE TRACK RECORD"
        title="Our Partners &"
        highlight="Client Portfolio"
        subtitle="Trusted by over 100 industrial manufacturers, textile conglomerates, financial institutions, and hospitals across Pakistan, with certified global OEM technology alliances."
        breadcrumbs={[{ label: 'Partners & Clients' }]}
      />

      <PartnersClients />
    </div>
  );
}

