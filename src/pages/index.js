import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const features = [
  {
    title: 'Simple Auth',
    desc: 'One API key header. No HMAC signatures, no nonces, no complexity.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    link: '/docs/api/authentication',
  },
  {
    title: 'Unified API',
    desc: 'Same endpoints for POS and online. Only the customer identifier changes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    link: '/docs/overview',
  },
  {
    title: 'Instant + Async',
    desc: 'Barcode scans confirm instantly. Phone payments confirm via push notification.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    link: '/docs/api/checkout/flows',
  },
  {
    title: 'Hold & Capture',
    desc: 'Authorize first, capture later. Partial captures supported.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    link: '/docs/api/transaction/capture',
  },
  {
    title: 'Refunds',
    desc: 'Partial or full refunds with idempotency keys to prevent duplicates.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
    link: '/docs/api/transaction/refund',
  },
  {
    title: 'Settlements',
    desc: 'Query settlement reports and line items via API.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <line x1="2" y1="9" x2="22" y2="9" />
        <line x1="10" y1="3" x2="10" y2="21" />
      </svg>
    ),
    link: '/docs/api/settlement',
  },
];

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
          <span className={styles.badge}>V2 API</span>
          <h1 className={styles.heroTitle}>
            Payment integration<br />made simple
          </h1>
          <p className={styles.heroSubtitle}>
            One API key. One endpoint. Instant or async checkout flows for POS and online.
          </p>
          <div className={styles.heroCta}>
            <Link className={styles.btnPrimary} to="/docs/overview">
              Get started
            </Link>
            <Link className={styles.btnSecondary} to="/docs/v1/api">
              V1 docs
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

function Features() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresGrid}>
          {features.map(({ title, desc, icon, link }) => (
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

function QuickStart() {
  return (
    <section className={styles.quickstart}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Three steps to your first payment</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <h3>Get your API key</h3>
            <p>Sign up at the <a href="https://partner.netgiro.is">Partner Portal</a> and grab your ApplicationId.</p>
          </div>
          <div className={styles.stepDivider} />
          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <h3>Create a payment</h3>
            <p>POST to <code>/v2/checkout/payment</code> with the amount and customer identifier.</p>
          </div>
          <div className={styles.stepDivider} />
          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <h3>Handle the response</h3>
            <p>Instant confirmation for barcodes, or poll for phone-based payments.</p>
          </div>
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
      <Features />
      <QuickStart />
    </Layout>
  );
}
