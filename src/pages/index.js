import React from 'react';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout
      title="Connected Car Docs"
      description="Connected Car Documentation">
      
      <main style={{ padding: '2rem' }}>
        <h1>Connected Car Documentation</h1>

        <p>
          Welcome to the Connected Car developer portal.
        </p>

        <ul>
          <li>
            <a href="/dita-markdown-pipeline/docs/Topics/Overview">
              Overview
            </a>
          </li>

          <li>
            <a href="/dita-markdown-pipeline/docs/Topics/Architecture">
              Architecture
            </a>
          </li>

          <li>
            <a href="/dita-markdown-pipeline/docs/API/fleet/ref-fleet-list-vehicles">
              Fleet APIs
            </a>
          </li>

          <li>
            <a href="/dita-markdown-pipeline/docs/Tasks/Perform%20Connectivity%20Testing">
              Connectivity Testing
            </a>
          </li>
        </ul>
      </main>
    </Layout>
  );
}