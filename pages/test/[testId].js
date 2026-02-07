import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Test() {
  const router = useRouter();
  const { testId } = router.query;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (testId) {
      fetchTest();
    }
  }, [testId]);

  const fetchTest = async () => {
    try {
      const res = await fetch(`/api/student/get-test?testId=${testId}`);
      const data = await res.json();

      if (data.success) {
        setQuestions(data.questions);
        setStartTime(Date.now());
      } else {
        alert(data.error);
        router.push('/');
      }
    } catch (error) {
      alert('Failed to load test');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = async () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const answerArray = questions.map((_, idx) => answers[idx] || '');

    setSubmitting(true);

    try {
      const res = await fetch('/api/student/submit-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId,
          answers: answerArray,
          timeTaken
        })
      });

      const data = await res.json();

      if (data.success) {
        alert(`Test submitted! Time: ${timeTaken}s`);
        router.push('/thank-you');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Failed to submit test');
    } finally {
      setSubmitting(false);
    }
  };

  const preventCopyPaste = (e) => {
    e.preventDefault();
    return false;
  };

  if (loading) {
    return <div style={styles.loading}>Loading test...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Aptitude Test</h1>
        <p style={styles.subtitle}>Answer all 10 questions. Copy-paste is disabled.</p>
        
        <div style={styles.questionsContainer}>
          {questions.map((q, idx) => (
            <div key={idx} style={styles.question}>
              <p style={styles.questionText}>{idx + 1}. {q.q}</p>
              <textarea
                value={answers[idx] || ''}
                onChange={(e) => handleAnswerChange(idx, e.target.value)}
                onCopy={preventCopyPaste}
                onPaste={preventCopyPaste}
                onCut={preventCopyPaste}
                style={styles.textarea}
                placeholder="Type your answer here..."
                rows={3}
              />
            </div>
          ))}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={styles.button}
        >
          {submitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  card: {
    background: 'white',
    borderRadius: '10px',
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
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
    marginBottom: '30px'
  },
  questionsContainer: {
    marginBottom: '30px'
  },
  question: {
    marginBottom: '25px',
    padding: '15px',
    background: '#f9f9f9',
    borderRadius: '5px'
  },
  questionText: {
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '2px solid #e0e0e0',
    borderRadius: '5px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit'
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
  loading: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
  }
};
