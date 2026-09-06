import Link from '@/components/static-link';
import { ArrowRight, Check, HeartHandshake } from 'lucide-react';

export const dynamic = 'force-static';

const highlights = [
  'Support for K–12 students',
  'Math, science, and reading',
  'Online or in-person sessions',
];

export default function Home() {
  return (
    <div className="home-grid">
      <section className="hero-copy" aria-labelledby="home-heading">
        <p className="eyebrow">K–12 tutoring · Middle school focus</p>
        <h1 id="home-heading">The right support can make learning feel lighter.</h1>
        <p className="hero-summary">
          ABC Tutoring helps families find personal support in math, science,
          and reading—with a simple path from choosing a tutor to requesting a
          session.
        </p>

        <div className="hero-actions">
          <Link className="button button-primary" href="/tutors">
            Browse tutors <ArrowRight aria-hidden="true" size={18} />
          </Link>
          <Link className="button button-secondary" href="/contact">
            Ask a question
          </Link>
        </div>

        <ul className="highlight-list" aria-label="Tutoring highlights">
          {highlights.map((highlight) => (
            <li key={highlight}>
              <span className="check-mark" aria-hidden="true">
                <Check size={15} strokeWidth={2.5} />
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <aside className="journey-card" aria-label="How ABC Tutoring helps">
        <figure className="home-photo"><img src="https://images.pexels.com/photos/6503157/pexels-photo-6503157.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Two people working through a book together in a welcoming learning setting" width={800} height={530}/><figcaption>Placeholder learning photo · Thirdman / Pexels</figcaption></figure>
        <div className="journey-icon" aria-hidden="true">
          <HeartHandshake size={30} strokeWidth={1.8} />
        </div>
        <p className="eyebrow">A thoughtful first step</p>
        <h2>Find support that fits your student.</h2>
        <ol>
          <li>
            <span>1</span>
            <div>
              <strong>Explore</strong>
              <p>Browse tutors by subject and grade.</p>
            </div>
          </li>
          <li>
            <span>2</span>
            <div>
              <strong>Choose</strong>
              <p>Select a tutor and a convenient time.</p>
            </div>
          </li>
          <li>
            <span>3</span>
            <div>
              <strong>Request</strong>
              <p>Send the details for Dana to review.</p>
            </div>
          </li>
        </ol>
        <p className="journey-note">Standard sessions are one hour.</p>
      </aside>
    </div>
  );
}
