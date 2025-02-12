import '../styles/globals.css';

import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';
import ClientProvider from '../utils/context/ClientProvider';

const inter = Inter({ subsets: ['latin'] });

// Metadata configuration for the app
export async function generateMetadata({ params }) {
  const { slug } = params || {}; // Make params optional

  return {
    title: slug ? `${slug} - Itinerary Planner` : 'Itinerary Planner',
    description: 'Plan your trips with ease',
    icons: {
      icon: [
        {
          url: '/logo.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/logo.png',
          sizes: '16x16',
          type: 'image/png',
        },
      ],
      apple: {
        url: '/logo.png',
        sizes: '180x180',
        type: 'image/png',
      },
    },
    keywords: ['itinerary', 'travel', 'planning', 'trips'],
    openGraph: {
      title: slug ? `${slug} - Itinerary Planner` : 'Itinerary Planner',
      description: 'Plan your trips with ease',
      url: `https://itineraryplanner.com/${slug || ''}`,
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/logo.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="180x180" type="image/png" />
      </head>
      <body className={inter.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
