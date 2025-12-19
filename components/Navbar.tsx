import CardNav from './ui/CardNav';

export default function HomePage() {
  const navItems = [
    {
      label: 'Product',
      bgColor: '#f0f9ff',
      textColor: '#0369a1',
      links: [
        { label: 'Features', href: '/features', ariaLabel: 'View features' },
        { label: 'Pricing', href: '/pricing', ariaLabel: 'View pricing' },
      ],
    },
    // ... more items
  ];

  return (
    <div>
      <CardNav 
        logo="/logo.svg"
        logoAlt="Company Logo"
        items={navItems}
        logoWidth={120}
        logoHeight={28}
      />
      {/* Your page content */}
    </div>
  );
}