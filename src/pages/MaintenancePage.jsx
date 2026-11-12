import React from 'react';
import PageHeader from '../components/PageHeader';
import GeneratorMaintenance from '../components/GeneratorMaintenance';

export default function MaintenancePage() {
  return (
    <div className="space-y-0">
      <PageHeader
        title="Reliability Doesn't"
        highlight="Happen by Accident"
        subtitle="Explore our standard 9-point preventative generator maintenance protocol executed on every industrial service contract across Pakistan."
      />

      <GeneratorMaintenance />
    </div>
  );
}
