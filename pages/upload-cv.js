import { useState } from 'react';
import { useRouter } from 'next/router';

export default function UploadCV() {
  const router = useRouter();
  const { id } = router.query;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [extractedName, setExtractedName] = useState('');
  const [showSkills, setShowSkills] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('cv', file);
    formData.append('applicationId', id);

    try {
      const res = await fetch('/api/student/upload-cv', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setExtractedName(data.extractedName);
        setSkills(data.skills);
        setShowSkills(true);
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
        body: JSON.stringify({ applicationId: id, skills })
      });

      const data = await res.json();

      if (data.success) {
        alert('Test link sent to your email! Please check your inbox.');
        router.push('/thank-you');
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
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Upload Your CV</h1>
        
        {!showSkills ? (
          <>
            <p style={styles.subtitle}>Upload your resume (PDF or DOCX)</p>
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
          </>
        ) : (
          <>
            <p style={styles.subtitle}>Extracted Name: <strong>{extractedName}</strong></p>
            <h3 style={styles.skillsTitle}>Your Skills</h3>
            <p style={styles.hint}>Click on any skill to remove it</p>
            <div style={styles.skillsContainer}>
              {skills.length > 0 ? skills.map(skill => (
                <div
                  key={skill}
                  onClick={() => removeSkill(skill)}
                  style={styles.skillTag}
                >
                  {skill} ✕
                </div>
              )) : <p>No skills detected</p>}
            </div>
            <button onClick={handleConfirm} disabled={loading} style={styles.button}>
              {loading ? 'Sending...' : 'Confirm & Get Test Link'}
            </button>
          </>
        )}
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
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333'
  },
  subtitle: {
    color: '#666',
    marginBottom: '20px'
  },
  fileInput: {
    marginBottom: '20px',
    padding: '10px',
    border: '2px dashed #667eea',
    borderRadius: '5px',
    width: '100%'
  },
  fileName: {
    color: '#667eea',
    marginBottom: '10px'
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%'
  },
  skillsTitle: {
    fontSize: '20px',
    marginTop: '20px',
    marginBottom: '10px'
  },
  hint: {
    fontSize: '14px',
    color: '#999',
    marginBottom: '15px'
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px'
  },
  skillTag: {
    background: '#667eea',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.3s'
  }
};
