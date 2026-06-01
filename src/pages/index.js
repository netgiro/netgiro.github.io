import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/overview">
            V2 API Documentation
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/v1/api"
            style={{ marginLeft: '1rem' }}>
            V1 API Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({ title, description, link }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="padding-horiz--md padding-vert--lg">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link}>Learn more &rarr;</Link>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Netgiro payment integration documentation">
      <HomepageHeader />
      <main>
        <section className="padding-vert--xl">
          <div className="container">
            <div className="row">
              <Feature
                title="V2 API"
                description="Modern REST API with simple API key authentication. No signatures, no nonces — just set a header and go."
                link="/docs/overview"
              />
              <Feature
                title="Checkout Flows"
                description="Support barcode, access code, and phone-based payments. Instant confirmation or async with polling."
                link="/docs/checkout/flows"
              />
              <Feature
                title="Testing"
                description="Full sandbox environment with test credentials. Try the API before going to production."
                link="/docs/v1/testing"
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
