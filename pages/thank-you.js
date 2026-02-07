export default function ThankYou() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Thank You! 🎉</h1>
        <p style={styles.text}>
          Your application has been submitted successfully.
        </p>
        <p style={styles.text}>
          We will review your application and get back to you soon.
        </p>
        <p style={styles.footer}>
          - Zaina Solutions Team
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  card: {
    background: 'white',
    borderRadius: '10px',
    padding: '60px 40px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333'
  },
  text: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '15px',
    lineHeight: '1.6'
  },
  footer: {
    marginTop: '30px',
    fontSize: '16px',
    color: '#667eea',
    fontWeight: 'bold'
  }
};
