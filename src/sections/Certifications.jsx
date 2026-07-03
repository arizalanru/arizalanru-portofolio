import React from 'react'
import SectionLabel from '../components/SectionLabel'
import CertCard from '../components/CertCard'
import { certifications } from '../data/certifications'

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative h-screen overflow-hidden snap-start px-6"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}
    >
      <div className="w-full">
        <div className="mb-5">
          <SectionLabel label="CREDENTIALS" title="Certifications" center />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
          <div style={{ width: '320px' }}>
            <CertCard cert={certifications[0]} />
          </div>
        </div>
      </div>
    </section>
  )
}
