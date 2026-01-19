import CardNav from './ui/CardNav';

export default function HomePage() {
  const navItems = [
    {
      label: 'Company',
      bgColor: '#f0f9ff',
      textColor: '#0369a1',
      links: [
        { label: 'About', href: '/about', ariaLabel: 'About Scalez' },
        // { label: 'Why Us', href: '/why-us', ariaLabel: 'Why choose Scalez' },
        { label: 'Contact', href: '/contact', ariaLabel: 'Contact Scalez' },
      ],
    },
    {
      label: 'AI Agents',
      bgColor: '#fdf4ff',
      textColor: '#86198f',
      links: [
        { label: 'Web Scraper Agent', href: '/web-scraper', ariaLabel: 'Web scraper AI agent' },
        { label: 'Resume Matcher Agent', href: '/resume-matcher', ariaLabel: 'Resume matcher AI agent' },
        { label: 'Email Outreach Agent', href: '/email-outreach', ariaLabel: 'Email outreach AI agent' },
        { label: 'Whatsapp Outreach Agent', href: '/whatsapp', ariaLabel: 'Whatsapp outreach AI agent' },
        { label: 'Fitness Report Agent', href: '/fitness', ariaLabel: 'Fitness report AI agent' },
        { label: 'Pharma Report Agent', href: '/pharma', ariaLabel: 'Pharma report AI agent' },
      ],
    },
  ];

  return (
    <div>
      <CardNav
        logo="/logo.png"
        logoAlt="Scalez Logo"
        items={navItems}
        logoWidth={180}
        logoHeight={40}
      />

      {/* Page content */}
    </div>
  );
}
