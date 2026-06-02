import './globals.css';

export const metadata = {
  title: 'Aditya Dahake — Product Designer',
  description: 'Product Designer specializing in operational complexity and enterprise systems. Designing financial products at EBIXCash. Field force, fintech, gov-tech, and workflow-heavy platforms.',
  keywords: ['Product Designer','Systems Thinking','Enterprise UX','Operational Design','Fintech','Aditya Dahake','EBIXCash'],
  authors: [{ name: 'Aditya Dahake' }],
  openGraph: {
    type: 'website', locale: 'en_IN',
    title: 'Aditya Dahake — Product Designer',
    description: 'Designing products that work when organizations don\'t. Operational complexity, enterprise systems, financial products.',
    siteName: 'Aditya Dahake',
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: '#FAF8F4', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&family=Inter:wght@400;500;600&family=DM+Mono:wght@400;500&family=Dancing+Script:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
