import React, { useState, useCallback } from 'react';

const APPLICATION_KEY = '881e674f-7891-4c20-afd8-56fe2624c4b5';
const SECRET_KEY = 'YCFd6hiA8lUjZejVcIf/LhRXO4wTDxY0JhOXvQZwnMSiNynSxmNIMjMf1HHwdV6cMN48NX3ZipA9q9hLPb9C1ZIzMH5dvELPAHceiu7LbZzmIAGeOf/OUaDrk2Zq2dbGacIAzU6yyk4KmOXRaSLi8KW8t3krdQSX7Ecm8Qunc/A=';
const API_URL = 'https://api.test.netgiro.is/v1/';

async function sha256Hex(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function TokenGenerator() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const generateToken = useCallback(async () => {
    setLoading(true);
    setToken('Loading...');

    try {
      const customer = '1111111119';
      const url = `${API_URL}Account/RequestConfirmation?Customer=${customer}`;
      const nonce = Date.now().toString();
      const signature = await sha256Hex(SECRET_KEY + nonce + url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Netgiro_AppKey': APPLICATION_KEY,
          'Netgiro_Nonce': nonce,
          'Netgiro_Signature': signature,
        },
      });

      const data = await response.json();
      setToken(data.Message || 'No token returned');
    } catch (err) {
      setToken('Error loading code!');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <button
        onClick={generateToken}
        disabled={loading}
        style={{
          background: 'var(--ifm-color-primary)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '0.6rem 1.25rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: loading ? 'wait' : 'pointer',
          transition: 'opacity 0.15s ease',
          opacity: loading ? 0.7 : 1,
        }}
      >
        Generate token
      </button>
      <div style={{ marginTop: '1rem' }}>
        Token: <span style={{ fontSize: '28px', fontWeight: 'bold' }}>{token}</span>
      </div>
    </div>
  );
}
