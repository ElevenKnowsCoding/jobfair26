import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('applications');
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin');
      return;
    }
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [appsRes, logsRes] = await Promise.all([
        fetch('/api/admin/applications'),
        fetch('/api/admin/logs')
      ]);
      const appsData = await appsRes.json();
      const logsData = await logsRes.json();
      
      if (appsData.success) setApplications(appsData.applications);
      if (logsData.success) setLogs(logsData.logs);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const downloadExcel = () => {
    window.location.href = '/api/admin/download-excel';
  };

  const deleteApplication = async (id) => {
    if (!confirm('Delete this application?')) return;
    try {
      const res = await fetch('/api/admin/delete-application', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const clearLogs = async () => {
    if (!confirm('Clear all logs?')) return;
    try {
      const res = await fetch('/api/admin/clear-logs', { method: 'POST' });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - Zaina Solutions</title>
      </Head>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <div>
            <button onClick={downloadExcel} style={styles.downloadBtn}>
              Download Excel
            </button>
            {activeTab === 'logs' && (
              <button onClick={clearLogs} style={styles.clearBtn}>
                Clear Logs
              </button>
            )}
            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>

        <div style={styles.tabs}>
          <button
            onClick={() => setActiveTab('applications')}
            style={activeTab === 'applications' ? styles.tabActive : styles.tab}
          >
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            style={activeTab === 'logs' ? styles.tabActive : styles.tab}
          >
            Activity Logs
          </button>
        </div>

        {activeTab === 'applications' && (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>CV Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>College</th>
                  <th style={styles.th}>Skills</th>
                  <th style={styles.th}>Applied At</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} style={styles.tr}>
                    <td style={styles.td}>{app.name}</td>
                    <td style={styles.td}>{app.extractedName || '-'}</td>
                    <td style={styles.td}>{app.email}</td>
                    <td style={styles.td}>{app.phone}</td>
                    <td style={styles.td}>{app.college}</td>
                    <td style={styles.td}>{app.skills?.join(', ') || 'N/A'}</td>
                    <td style={styles.td}>{new Date(app.createdAt).toLocaleString()}</td>
                    <td style={styles.td}>
                      <button onClick={() => deleteApplication(app.id)} style={styles.deleteBtn}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'logs' && (
          <div style={styles.logContainer}>
            {logs.map((log, i) => (
              <div key={i} style={styles.logEntry}>
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: '20px',
    background: '#0a0a0a',
    minHeight: '100vh',
    color: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  title: {
    color: '#dc2626',
    margin: 0,
  },
  downloadBtn: {
    padding: '10px 20px',
    background: '#22c55e',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
  },
  clearBtn: {
    padding: '10px 20px',
    background: '#f59e0b',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
  },
  logoutBtn: {
    padding: '10px 20px',
    background: '#dc2626',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    color: '#999',
    cursor: 'pointer',
  },
  tabActive: {
    padding: '10px 20px',
    background: '#dc2626',
    border: '1px solid #dc2626',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
  },
  tableContainer: {
    overflowX: 'auto',
    background: '#1a1a1a',
    borderRadius: '8px',
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '2px solid #dc2626',
    color: '#dc2626',
  },
  tr: {
    borderBottom: '1px solid #333',
  },
  td: {
    padding: '12px',
    fontSize: '14px',
  },
  logContainer: {
    background: '#1a1a1a',
    padding: '20px',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '14px',
    maxHeight: '70vh',
    overflowY: 'auto',
  },
  logEntry: {
    padding: '8px 0',
    borderBottom: '1px solid #333',
  },
  deleteBtn: {
    padding: '6px 12px',
    background: '#dc2626',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '12px',
  },
};
