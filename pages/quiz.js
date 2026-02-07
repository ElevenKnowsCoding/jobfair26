import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Quiz() {
  const router = useRouter();
  const { id } = router.query;
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!id) return;
    
    // Fetch questions
    fetch(`/api/quiz/start?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setQuestions(data.questions);
          setLoading(false);
        } else {
          alert(data.error);
          router.push('/');
        }
      });
  }, [id]);

  useEffect(() => {
    if (loading || submitted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [loading, submitted]);

  const handleAnswerChange = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (submitted) return;
    setSubmitted(true);
    
    const res = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId: id, answers, timeSpent: 600 - timeLeft })
    });
    
    const data = await res.json();
    if (data.success) {
      router.push(`/quiz-result?id=${id}`);
    }
  };

  const preventCopy = (e) => {
    e.preventDefault();
    setShowCopyAlert(true);
    setTimeout(() => setShowCopyAlert(false), 3000);
    return false;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a', color: '#fff' }}>
        Loading quiz...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Quiz - Zaina Solutions</title>
      </Head>
      
      <div className="quiz-container" onCopy={preventCopy} onCut={preventCopy} onPaste={preventCopy}>
        <div className="quiz-header">
          <h1>Technical Quiz</h1>
          <div className="timer" style={{ color: timeLeft < 60 ? '#dc2626' : '#22c55e' }}>
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>

        <div className="quiz-card">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
          </div>
          
          <div className="question-number">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          
          <div className="question-field">{questions[currentQuestion]?.field}</div>
          
          <div className="question-text">
            {questions[currentQuestion]?.question}
          </div>
          
          <textarea
            ref={inputRef}
            className="answer-input"
            placeholder="Type your answer here (one sentence only)..."
            value={answers[currentQuestion] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            onCopy={preventCopy}
            onCut={preventCopy}
            onPaste={preventCopy}
            rows={3}
            maxLength={200}
          />
          
          <div className="quiz-navigation">
            <button 
              onClick={handlePrevious} 
              disabled={currentQuestion === 0}
              className="nav-btn"
            >
              ← Previous
            </button>
            
            {currentQuestion === questions.length - 1 ? (
              <button onClick={handleSubmit} className="submit-btn">
                Submit Quiz
              </button>
            ) : (
              <button onClick={handleNext} className="nav-btn">
                Next →
              </button>
            )}
          </div>
          
          <div className="answered-count">
            Answered: {Object.keys(answers).filter(k => answers[k]?.trim()).length} / {questions.length}
          </div>
          
          {showCopyAlert && (
            <div className="copy-alert">
              ⚠️ No copy pasting allowed!
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          user-select: none;
        }

        body {
          font-family: 'Space Grotesk', sans-serif;
          background: #0a0a0a;
          color: #fff;
        }

        .quiz-container {
          min-height: 100vh;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .quiz-header {
          width: 100%;
          max-width: 800px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .quiz-header h1 {
          font-size: 28px;
          color: #dc2626;
        }

        .timer {
          font-size: 24px;
          font-weight: 700;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 2px solid currentColor;
        }

        .quiz-card {
          width: 100%;
          max-width: 800px;
          background: rgba(20, 20, 20, 0.95);
          border: 1px solid rgba(220, 38, 38, 0.2);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 30px;
        }

        .progress {
          height: 100%;
          background: linear-gradient(90deg, #dc2626, #991b1b);
          transition: width 0.3s ease;
        }

        .question-number {
          color: #999;
          font-size: 14px;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .question-field {
          color: #dc2626;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 20px;
          padding: 8px 16px;
          background: rgba(220, 38, 38, 0.1);
          border-radius: 8px;
          display: inline-block;
        }

        .question-text {
          font-size: 22px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .answer-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          color: #fff;
          font-size: 16px;
          font-family: inherit;
          resize: vertical;
          margin-bottom: 30px;
          transition: all 0.3s ease;
        }

        .answer-input:focus {
          outline: none;
          border-color: #dc2626;
          background: rgba(220, 38, 38, 0.05);
        }

        .answer-input::placeholder {
          color: #52525b;
        }

        .quiz-navigation {
          display: flex;
          gap: 15px;
          justify-content: space-between;
        }

        .nav-btn, .submit-btn {
          flex: 1;
          padding: 16px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .nav-btn {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .nav-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          border-color: #dc2626;
        }

        .nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .submit-btn {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);
        }

        .answered-count {
          text-align: center;
          margin-top: 20px;
          color: #999;
          font-size: 14px;
        }

        .copy-alert {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #dc2626;
          color: white;
          padding: 15px 30px;
          border-radius: 12px;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.5);
          animation: slideDown 0.3s ease;
          z-index: 2000;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @media (max-width: 768px) {
          .quiz-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .quiz-card {
            padding: 30px 20px;
          }

          .question-text {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
}
