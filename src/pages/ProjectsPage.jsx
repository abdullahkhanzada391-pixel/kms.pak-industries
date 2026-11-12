import React from 'react';
import PageHeader from '../components/PageHeader';
import TurnkeyProjects from '../components/TurnkeyProjects';

export default function ProjectsPage() {
  return (
    <div className="space-y-0">
      <PageHeader
        title="Turnkey Projects:"
        highlight="Concept to Completion"
        subtitle="From single-line electrical engineering and in-house switchgear fabrication to generator synchronization and lifecycle O&M contracts countrywide across Pakistan."
      />

      <TurnkeyProjects />
    </div>
  );
}
