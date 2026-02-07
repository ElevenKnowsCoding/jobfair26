import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function QRCode() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  return (
    <>
      <Head>
        <title>QR Code - Zaina Solutions Job Fair</title>
      </Head>
      <div style={styles.container}>
        <div style={styles.printArea}>
          <h1 style={styles.title}>Zaina Solutions</h1>
          <h2 style={styles.subtitle}>Job Fair 2026</h2>
          
          <div style={styles.qrContainer}>
            {url && (
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}`}
                alt="QR Code"
                style={styles.qr}
              />
            )}
          </div>
          
          <p style={styles.instruction}>Scan to Register</p>
          <p style={styles.url}>{url}</p>
        </div>
        
        <button onClick={() => window.print()} style={styles.printBtn}>
          Print QR Code
        </button>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0a',
    padding: '20px',
  },
  printArea: {
    background: '#fff',
    padding: '60px',
    borderRadius: '20px',
    textAlign: 'center',
    maxWidth: '600px',
    className: 'print-area',
  },
  title: {
    color: '#dc2626',
    fontSize: '48px',
    margin: '0 0 10px 0',
  },
  subtitle: {
    color: '#333',
    fontSize: '24px',
    margin: '0 0 40px 0',
  },
  qrContainer: {
    margin: '40px 0',
  },
  qr: {
    width: '400px',
    height: '400px',
  },
  instruction: {
    fontSize: '32px',
    color: '#333',
    fontWeight: 'bold',
    margin: '30px 0 10px 0',
  },
  url: {
    fontSize: '18px',
    color: '#666',
    wordBreak: 'break-all',
  },
  printBtn: {
    marginTop: '30px',
    padding: '15px 40px',
    background: '#dc2626',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '18px',
    cursor: 'pointer',
  },
};
