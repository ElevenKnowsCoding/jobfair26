import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/admin/logs');
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Activity Log - Zaina Solutions</title>
      </Head>
      <div style={styles.container}>
        <h1 style={styles.title}>Activity Log</h1>
        <div style={styles.logContainer}>
          {logs.map((log, i) => (
            <div key={i} style={styles.logEntry}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#0a0a0a',
    minHeight: '100vh',
    color: '#fff'
  },
  title: {
    color: '#dc2626',
    marginBottom: '20px'
  },
  logContainer: {
    backgroundColor: '#1a1a1a',
    padding: '20px',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '14px',
    maxHeight: '80vh',
    overflowY: 'auto'
  },
  logEntry: {
    padding: '8px 0',
    borderBottom: '1px solid #333'
  }
};
