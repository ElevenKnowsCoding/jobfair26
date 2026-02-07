import { useState } from 'react';
import Head from 'next/head';

const COLLEGES = [
  'MIT College of Engineering',
  'Stanford University',
  'IIT Bombay',
  'Harvard University'
];

export default function Simple() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: ''
  });
  const [applicationId, setApplicationId] = useState(null);
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/student/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setApplicationId(data.applicationId);
        setStep(2);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    setLoading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('cv', file);
    formDataUpload.append('applicationId', applicationId);

    try {
      const res = await fetch('/api/student/upload-cv', {
        method: 'POST',
        body: formDataUpload
      });

      const data = await res.json();

      if (data.success) {
        setSkills(data.skills);
        setStep(3);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Failed to upload CV');
    } finally {
      setLoading(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleConfirm = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/student/confirm-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, skills })
      });

      const data = await res.json();

      if (data.success) {
        alert('Test link sent to your email! Please check your inbox.');
        window.location.href = '/thank-you';
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Failed to send test link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Zaina Solutions - Job Fair 2026</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Zaina Solutions</h1>
          <p style={styles.subtitle}>Job Fair 2026</p>
        </div>

        <div style={styles.content}>
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} style={styles.backButton}>
              ← Back
            </button>
          )}

          {step === 1 && (
            <div style={styles.form}>
              <h2 style={styles.formTitle}>Apply Now</h2>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={styles.input}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={styles.input}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  style={styles.input}
                />
                <select
                  value={formData.college}
                  onChange={(e) => setFormData({...formData, college: e.target.value})}
                  required
                  style={styles.input}
                >
                  <option value="">Select Your College</option>
                  {COLLEGES.map(college => (
                    <option key={college} value={college}>{college}</option>
                  ))}
                </select>
                <button type="submit" disabled={loading} style={styles.button}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div style={styles.form}>
              <h2 style={styles.formTitle}>Upload Your CV</h2>
              <p style={styles.note}>Upload your resume (PDF or DOCX)</p>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                style={styles.fileInput}
              />
              {file && <p style={styles.fileName}>{file.name}</p>}
              <button onClick={handleUpload} disabled={loading} style={styles.button}>
                {loading ? 'Processing...' : 'Upload & Analyze'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div style={styles.form}>
              <h2 style={styles.formTitle}>Your Skills</h2>
              <p style={styles.note}>Click on any skill to remove it</p>
              <div style={styles.skillsContainer}>
                {skills.length > 0 ? skills.map(skill => (
                  <div
                    key={skill}
                    onClick={() => removeSkill(skill)}
                    style={styles.skillTag}
                  >
                    {skill} ✕
                  </div>
                )) : <p style={{color: '#999'}}>No skills detected</p>}
              </div>
              <button onClick={handleConfirm} disabled={loading} style={styles.button}>
                {loading ? 'Sending...' : 'Confirm & Get Test Link'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#121212',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '20px',
    background: 'linear-gradient(135deg, #d20a0a, #b8090a)',
    borderRadius: '10px'
  },
  title: {
    fontSize: '2rem',
    margin: '0 0 10px 0',
    fontWeight: 600
  },
  subtitle: {
    fontSize: '1.2rem',
    margin: 0,
    opacity: 0.9
  },
  content: {
    maxWidth: '400px',
    margin: '0 auto',
    position: 'relative'
  },
  backButton: {
    background: 'transparent',
    color: '#d20a0a',
    border: '1px solid #d20a0a',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '14px'
  },
  form: {
    background: '#1e1e1e',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '1.5rem',
    fontWeight: 600
  },
  input: {
    width: '100%',
    padding: '15px',
    marginBottom: '15px',
    border: '1px solid #333',
    borderRadius: '5px',
    background: '#2e2e2e',
    color: '#fff',
    fontSize: '16px',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    background: 'linear-gradient(135deg, #d20a0a, #b8090a)',
    color: 'white',
    border: 'none',
    padding: '15px',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '10px'
  },
  fileInput: {
    width: '100%',
    padding: '15px',
    marginBottom: '15px',
    border: '2px dashed #d20a0a',
    borderRadius: '5px',
    background: '#2e2e2e',
    color: '#fff',
    boxSizing: 'border-box'
  },
  fileName: {
    color: '#d20a0a',
    marginBottom: '10px',
    fontSize: '14px'
  },
  note: {
    color: '#999',
    marginBottom: '20px',
    fontSize: '14px',
    textAlign: 'center'
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
    minHeight: '60px'
  },
  skillTag: {
    background: '#d20a0a',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};