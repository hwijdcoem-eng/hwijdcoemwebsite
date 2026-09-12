import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading as="h1" className="mb-4">
            Terms &amp; Conditions
          </SectionHeading>
          <p className="font-ui text-steel max-w-2xl mx-auto text-lg">
            Operational rules of engagement for the HWI platform.
          </p>
        </div>

        <Card padding="lg" className="prose prose-invert prose-crimson max-w-none text-steel font-ui" withGlow={true}>
          <h2 className="text-ink font-display tracking-widest uppercase mt-0">1. Acceptance of Terms</h2>
          <p>
            By accessing and utilizing the HackWithIndia (HWI) JDCOEM platform, you agree to be bound by these operational directives and terms of service. If you do not agree with any part of these terms, immediately disconnect from the network.
          </p>

          <h2 className="text-ink font-display tracking-widest uppercase">2. Code of Conduct</h2>
          <p>
            All participants, agents, and users are expected to maintain professional conduct during all HWI events, hackathons, and ideathons. Any attempts to sabotage, unlawfully access, or disrupt the infrastructure of other teams or the main command servers will result in immediate disqualification.
          </p>

          <h2 className="text-ink font-display tracking-widest uppercase">3. Intellectual Property</h2>
          <p>
            The code, assets, and projects built during HWI events remain the intellectual property of their respective creators unless otherwise explicitly stated in specific event contracts. HWI JDCOEM reserves the right to showcase these projects for promotional and archival purposes.
          </p>

          <h2 className="text-ink font-display tracking-widest uppercase">4. Certificate Verification</h2>
          <p>
            Certificates generated via this portal are for official HWI participants only. Forging, altering, or misrepresenting these certificates is strictly prohibited. HWI reserves the right to revoke verification status for any USN found in violation.
          </p>

          <h2 className="text-ink font-display tracking-widest uppercase">5. Modifications to Service</h2>
          <p>
            Command reserves the right to modify or discontinue any part of the platform or events with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
          </p>
          
          <p className="text-xs text-ink-dim mt-12">
            Last updated: September 2026
          </p>
        </Card>
      </div>
    </div>
  );
}
