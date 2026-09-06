import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ContactActions } from '@/components/contact-actions';

export const metadata: Metadata = { title: 'Contact' };
export const dynamic = 'force-static';

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Questions are welcome"
        title="Contact ABC Tutoring"
        description="Reach out before booking if you would like help deciding what kind of support is right for your student."
      />
      <section className="foundation-panel" aria-labelledby="contact-details">
        <h2 id="contact-details">Contact details</h2>
        <p>These demo contact details do not reach Dana. Actual contact information will be added before launch.</p>
        <ContactActions />
      </section>
    </>
  );
}
