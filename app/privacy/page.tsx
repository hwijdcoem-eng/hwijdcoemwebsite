import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading as="h1" className="mb-4">
            Privacy Policy
          </SectionHeading>
          <p className="font-ui text-steel max-w-2xl mx-auto text-lg">
            How we handle and protect your encrypted data.
          </p>
        </div>

        <Card padding="lg" className="prose prose-invert prose-crimson max-w-none text-steel font-ui" withGlow={true}>
          <h2 className="text-ink font-display tracking-widest uppercase mt-0">1. Data Collection</h2>
          <p>
            When you interact with the HWI JDCOEM platform (e.g., registering for events, generating certificates, or sending secure transmissions), we collect only the necessary telemetry data required to authenticate and process your request. This may include your USN, Name, and Email Address.
          </p>

          <h2 className="text-ink font-display tracking-widest uppercase">2. Use of Information</h2>
          <p>
            Your data is strictly utilized for the administration of HackWithIndia events and operational communications. We do not sell, distribute, or leak your data to third-party entities outside of our operational command structure.
          </p>

          <h2 className="text-ink font-display tracking-widest uppercase">3. Certificate Generation</h2>
          <p>
            Our certificate portal uses edge-based processing to render certificates. Your USN is validated against an internal roster. Generated certificate images are temporarily created in your browser and are not persistently stored on our primary servers unless explicitly downloaded by the user.
          </p>

          <h2 className="text-ink font-display tracking-widest uppercase">4. Security Measures</h2>
          <p>
            We implement robust security protocols to protect your data against unauthorized access, alteration, or destruction. However, no transmission over the internet can be guaranteed to be 100% secure. Proceed with standard operational awareness.
          </p>

          <h2 className="text-ink font-display tracking-widest uppercase">5. Contact Command</h2>
          <p>
            If you require clarification on these protocols, initiate a transmission via our <a href="/contact" className="text-crimson hover:text-signal transition-colors">Secure Comms</a> page.
          </p>
          
          <p className="text-xs text-ink-dim mt-12">
            Last updated: September 2026
          </p>
        </Card>
      </div>
    </div>
  );
}
