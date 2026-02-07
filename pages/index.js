import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: 'MES College of Engineering, Kuttippuram'
  });
  const [applicationId, setApplicationId] = useState(null);
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCVSuccess, setShowCVSuccess] = useState(false);

  useEffect(() => {
    // Generate particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
      }
    }
  }, []);

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
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setStep(2);
        }, 2000);
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
        setShowCVSuccess(true);
        setTimeout(() => {
          setShowCVSuccess(false);
          setStep(3);
        }, 3000);
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
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <div className="bg-animation" id="particles"></div>
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>

      <div className="container">
        <div className="form-card">
          <div className="logo-section">
            <div className="logo">
              <img src="/logo.png" alt="Zaina Solutions" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
            </div>
            <h1 className="event-name">Zaina Solutions</h1>
            <p className="event-subtitle">Job Fair 2026</p>
          </div>

          {step === 1 && (
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter your full name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="+91 98765 43210" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email ID</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="you@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">College Name</label>
                <div className="input-wrapper select-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                  <select
                    className="form-input form-select"
                    value={formData.college}
                    onChange={(e) => setFormData({...formData, college: e.target.value})}
                    required
                  >
                    <option value="MES College of Engineering, Kuttippuram">MES College of Engineering, Kuttippuram</option>
                    <option value="MES Institute of Technology & Management, Chathannoor, Kollam">MES Institute of Technology &amp; Management, Chathannoor, Kollam</option>
                    <option value="MES College of Engineering & Technology, Kunnukara, Ernakulam">MES College of Engineering &amp; Technology, Kunnukara, Ernakulam</option>
                    <option value="MES College of Architecture, Kakkodi, Kozhikode">MES College of Architecture, Kakkodi, Kozhikode</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Processing...' : 'Register Now'}
              </button>
              
              <div className={`success-message ${showSuccess ? 'show' : ''}`}>
                ✓ Registration Successful!
              </div>
            </form>
          )}

          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} className="back-btn">← Back</button>
              <h2 className="step-title">Upload Your CV</h2>
              <p className="step-subtitle">Upload your resume (PDF or DOCX)</p>
              <div className="file-upload">
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  id="file-upload"
                  style={{display: 'none'}}
                />
                <label htmlFor="file-upload" className="file-label">
                  {file ? file.name : 'Choose File'}
                </label>
              </div>
              <button onClick={handleUpload} className="submit-btn" disabled={loading}>
                {loading ? 'Processing...' : 'Upload & Analyze'}
              </button>

              {showCVSuccess && (
                <div className="success-popup">
                  <div className="success-popup-content">
                    <div className="success-icon">✓</div>
                    <h3>CV Uploaded Successfully!</h3>
                    <p>Analyzing your skills...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <button onClick={() => setStep(2)} className="back-btn">← Back</button>
              <h2 className="step-title">Your Skills</h2>
              <p className="step-subtitle">Click on any skill to remove it</p>
              <div className="skills-container">
                {skills.length > 0 ? skills.map(skill => (
                  <div
                    key={skill}
                    onClick={() => removeSkill(skill)}
                    className="skill-tag"
                  >
                    {skill} ✕
                  </div>
                )) : <p style={{color: '#999'}}>No skills detected</p>}
              </div>
              <button onClick={handleConfirm} className="submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Confirm & Get Test Link'}
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          overflow-x: hidden;
          width: 100%;
          position: relative;
        }

        body {
          font-family: 'Space Grotesk', sans-serif;
          background: #0a0a0a;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
        }

        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(220, 38, 38, 0.3);
          border-radius: 50%;
          animation: float 20s infinite linear;
        }

        @keyframes float {
          from {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

        .container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          animation: slideUp 0.8s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-card {
          background: rgba(20, 20, 20, 0.95);
          border: 1px solid rgba(220, 38, 38, 0.2);
          border-radius: 24px;
          width: 100%;
          max-width: 100%;
          padding: 40px;
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.8),
            0 0 100px rgba(220, 38, 38, 0.1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #dc2626, transparent);
          animation: scanline 3s linear infinite;
        }

        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .logo-section {
          text-align: center;
          margin-bottom: 30px;
        }

        .logo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .logo svg {
          width: 40px;
          height: 40px;
          fill: white;
        }

        .event-name {
          color: #ffffff;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }

        .event-subtitle {
          color: #dc2626;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .form-group {
          margin-bottom: 24px;
          position: relative;
        }

        .form-label {
          display: block;
          color: #a1a1aa;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: color 0.3s ease;
        }

        .form-group:focus-within .form-label {
          color: #dc2626;
        }

        .input-wrapper {
          position: relative;
        }

        .form-select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          padding-right: 44px;
          cursor: pointer;
          max-width: 100%;
        }

        .form-select option {
          background: #1a1a1a;
          color: #ffffff;
          padding: 12px;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }

        .select-wrapper::after {
          content: '▾';
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #52525b;
          pointer-events: none;
          font-size: 18px;
        }

        .form-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px 16px 16px 48px;
          color: #ffffff;
          font-size: 16px;
          font-family: inherit;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input::placeholder {
          color: #52525b;
        }

        .form-input:focus {
          border-color: #dc2626;
          background: rgba(220, 38, 38, 0.05);
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #52525b;
          transition: color 0.3s ease;
        }

        .form-group:focus-within .input-icon {
          color: #dc2626;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 18px;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 10px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .submit-btn:hover::after {
          left: 100%;
        }

        .glow-orb {
          position: fixed;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .glow-orb-1 {
          top: -150px;
          left: -150px;
        }

        .glow-orb-2 {
          bottom: -150px;
          right: -150px;
        }

        .success-message {
          display: none;
          text-align: center;
          color: #22c55e;
          margin-top: 20px;
          font-weight: 500;
          animation: successPop 0.5s ease;
        }

        .success-message.show {
          display: block;
        }

        @keyframes successPop {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        .back-btn {
          background: transparent;
          color: #dc2626;
          border: 1px solid #dc2626;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .step-title {
          color: #fff;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 10px;
          text-align: center;
        }

        .step-subtitle {
          color: #999;
          margin-bottom: 20px;
          text-align: center;
        }

        .file-upload {
          margin-bottom: 20px;
        }

        .file-label {
          display: block;
          width: 100%;
          padding: 20px;
          border: 2px dashed #dc2626;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          color: #fff;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
          min-height: 60px;
        }

        .skill-tag {
          background: #dc2626;
          color: white;
          padding: 8px 15px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.3s;
        }

        .success-popup {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .success-popup-content {
          background: #1a1a1a;
          border: 2px solid #dc2626;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          animation: slideUp 0.5s ease;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: #dc2626;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: white;
          margin: 0 auto 20px;
          animation: scaleIn 0.5s ease;
        }

        .success-popup-content h3 {
          color: white;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .success-popup-content p {
          color: #999;
          font-size: 16px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        @media (max-width: 480px) {
          .form-card {
            padding: 30px 24px;
            border-radius: 20px;
            width: 100%;
          }

          .event-name {
            font-size: 24px;
          }

          .logo {
            width: 70px;
            height: 70px;
          }

          .form-input {
            padding: 14px 14px 14px 44px;
            font-size: 16px;
          }

          .form-select {
            font-size: 13px;
            padding-right: 40px;
            padding-left: 44px;
          }

          .form-select option {
            font-size: 13px;
          }

          .submit-btn {
            padding: 16px;
          }
          .glow-orb {
            width: 180px;
            height: 180px;
          }

          .glow-orb-1 {
            top: -90px;
            left: -90px;
          }

          .glow-orb-2 {
            bottom: -90px;
            right: -90px;
          }
        }
      `}</style>
    </>
  );
}