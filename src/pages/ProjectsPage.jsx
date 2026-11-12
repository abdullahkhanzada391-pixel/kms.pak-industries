import React from 'react';
import PageHeader from '../components/PageHeader';
import TurnkeyProjects from '../components/TurnkeyProjects';

export default function ProjectsPage() {
  return (
    <div className="space-y-0">
      <PageHeader
        badge="END-TO-END EPC ACCOUNTABILITY"
        title="Turnkey Engineering"
        highlight="Project Solutions"
        subtitle="From single-line diagram electrical designs and switchgear manufacturing to site foundation, soundproof canopy installation, and load-bank commissioning countrywide."
        breadcrumbs={[{ label: 'Turnkey Projects' }]}
      />

      <TurnkeyProjects />
    </div>
  );
}

