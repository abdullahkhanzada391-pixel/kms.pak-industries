import React from 'react';
import PageHeader from '../components/PageHeader';
import GeneratorMaintenance from '../components/GeneratorMaintenance';

export default function MaintenancePage() {
  return (
    <div className="space-y-0">
      <PageHeader
        badge="PREVENTATIVE ASSET PROTECTION"
        title="Generator Maintenance &"
        highlight="Technical Inspections"
        subtitle="Unplanned power outages cause catastrophic business loss. Our certified field engineers enforce a rigorous 9-point preventative maintenance protocol on all prime and standby generator contracts."
        breadcrumbs={[{ label: 'Generator Maintenance' }]}
      />

      <GeneratorMaintenance />
    </div>
  );
}

