import Link from '@/components/static-link';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/tutors', label: 'Browse tutors' },
  { href: '/booking', label: 'Booking' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="ABC Tutoring home">
          <span className="brand-mark" aria-hidden="true">
            ABC
          </span>
          <span className="brand-copy">
            <strong>ABC Tutoring</strong>
            <small>Personal support for growing learners</small>
          </span>
        </Link>

        <nav className="primary-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
