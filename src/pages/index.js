import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.gradientOrb1} />
          <div className={styles.gradientOrb2} />
          <div className={styles.gradientOrb3} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Netgiro Developer Documentation
          </h1>
          <p className={styles.heroSubtitle}>
            Accept payments online and at the point of sale. Choose a pre-built plugin or build a custom integration with our API.
          </p>
          <div className={styles.heroCta}>
            <Link className={styles.btnPrimary} to="/docs/overview">
              Get started
            </Link>
          </div>
        </div>
        <div className={styles.heroCode}>
          <div className={styles.codeWindow}>
            <div className={styles.codeHeader}>
              <span className={styles.dot} style={{ background: '#ff5f57' }} />
              <span className={styles.dot} style={{ background: '#febc2e' }} />
              <span className={styles.dot} style={{ background: '#28c840' }} />
              <span className={styles.codeTitle}>POST /v2/checkout/payment</span>
            </div>
            <pre className={styles.codeBody}>{`curl -X POST https://api.netgiro.is/v2/checkout/payment \\
  -H "X-Netgiro-Api-Key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "Amount": 5000,
    "Reference": "order-123",
    "CustomerIdentifier": "1234567890"
  }'`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegrationPaths() {
  return (
    <section className={styles.paths}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Choose your integration path</h2>
        <div className={styles.pathsGrid}>
          <div className={styles.pathCard}>
            <div className={styles.pathAccent} style={{ background: '#64C3A2' }} />
            <div className={styles.pathIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h3 className={styles.pathTitle}>Online Checkout</h3>
            <p className={styles.pathDesc}>For web shops and e-commerce</p>
            <div className={styles.pathOptions}>
              <Link to="/docs/web-shop-plugins" className={styles.pathLink}>
                <strong>Web Shop Plugin</strong>
                <span>Shopify, WooCommerce, Magento, and more</span>
              </Link>
              <Link to="/docs/api" className={styles.pathLink}>
                <strong>V2 API</strong>
                <span>Build a fully custom checkout</span>
              </Link>
            </div>
          </div>

          <div className={styles.pathCard}>
            <div className={styles.pathAccent} style={{ background: '#00AEEF' }} />
            <div className={styles.pathIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
                <line x1="6" y1="14" x2="10" y2="14" />
                <line x1="14" y1="14" x2="18" y2="14" />
                <line x1="6" y1="17" x2="10" y2="17" />
              </svg>
            </div>
            <h3 className={styles.pathTitle}>POS Checkout</h3>
            <p className={styles.pathDesc}>For physical stores and terminals</p>
            <div className={styles.pathOptions}>
              <Link to="/docs/resources/pos-modules" className={styles.pathLink}>
                <strong>POS Module / Netposi</strong>
                <span>Ready-made for major POS systems</span>
              </Link>
              <Link to="/docs/api" className={styles.pathLink}>
                <strong>V2 API</strong>
                <span>Build a custom POS integration</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const resources = [
  {
    title: 'Testing',
    desc: 'Sandbox environment with test credentials.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    link: '/docs/testing',
  },
  {
    title: 'Web Shop Plugins',
    desc: 'Pre-built plugins for Shopify, WooCommerce, Magento, and more.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    link: '/docs/web-shop-plugins',
  },
  {
    title: 'Logos & Branding',
    desc: 'Download logos, loader screens, and brand assets.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    link: '/docs/resources/logos',
  },
  {
    title: 'Payment Widgets',
    desc: 'Partial payments calculator for your product pages.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="22" height="18" rx="2" />
        <line x1="1" y1="9" x2="23" y2="9" />
      </svg>
    ),
    link: '/docs/resources/widgets',
  },
  {
    title: 'POS Modules',
    desc: '.NET module and packages for major Icelandic POS systems.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
    link: '/docs/resources/pos-modules',
  },
  {
    title: 'V1 API (Legacy)',
    desc: 'Cart-based checkout with HMAC signing. Still supported.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    link: '/docs/v1/api',
  },
];

function Resources() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Resources</h2>
        <div className={styles.featuresGrid}>
          {resources.map(({ title, desc, icon, link }) => (
            <Link key={title} to={link} className={styles.featureCard}>
              <div className={styles.featureIcon}>{icon}</div>
              <h3 className={styles.featureTitle}>{title}</h3>
              <p className={styles.featureDesc}>{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <Hero />
      <IntegrationPaths />
      <Resources />
    </Layout>
  );
}
