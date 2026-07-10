import React from 'react'
import SectionLabel from '../components/SectionLabel'
import CertCard from '../components/CertCard'
import { certifications } from '../data/certifications'

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative h-screen overflow-hidden snap-start px-6 flex flex-col items-center justify-center w-full"
    >
      <SectionLabel label="CREDENTIALS" title="Certifications" center />

      <div className="w-full max-w-[320px] mx-auto">
        <CertCard cert={certifications[0]} />
      </div>
    </section>
  )
}
