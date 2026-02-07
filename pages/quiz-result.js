import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function QuizResult() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Quiz Completed - Zaina Solutions</title>
      </Head>
      
      <div className="result-container">
        <div className="result-card">
          <div className="success-icon">✓</div>
          <h1>Quiz Completed!</h1>
          <p className="thank-you">Thank you for completing the technical assessment</p>
          
          <div className="message-box">
            <h3>What's Next?</h3>
            <p>Your interview has been completed successfully. Our team will review your responses and contact you via email within 2-3 business days.</p>
          </div>
          
          <button onClick={() => router.push('/')} className="home-btn">
            Back to Home
          </button>
        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Space Grotesk', sans-serif;
          background: #0a0a0a;
          color: #fff;
        }

        .result-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .result-card {
          max-width: 500px;
          width: 100%;
          background: rgba(20, 20, 20, 0.95);
          border: 1px solid rgba(220, 38, 38, 0.2);
          border-radius: 24px;
          padding: 50px 40px;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: #22c55e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: white;
          margin: 0 auto 30px;
          animation: scaleIn 0.5s ease;
        }

        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        .result-card h1 {
          font-size: 32px;
          margin-bottom: 10px;
          color: #fff;
        }

        .thank-you {
          color: #999;
          margin-bottom: 40px;
          font-size: 16px;
        }

        .message-box {
          background: rgba(220, 38, 38, 0.1);
          border: 2px solid #dc2626;
          border-radius: 16px;
          padding: 30px;
          margin-bottom: 30px;
          text-align: left;
        }

        .message-box h3 {
          color: #dc2626;
          font-size: 20px;
          margin-bottom: 15px;
          text-align: center;
        }

        .message-box p {
          color: #ccc;
          line-height: 1.8;
          font-size: 15px;
        }

        .home-btn {
          width: 100%;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .home-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);
        }

        @media (max-width: 768px) {
          .result-card {
            padding: 40px 30px;
          }

          .result-card h1 {
            font-size: 24px;
          }

          .message-box {
            padding: 25px 20px;
          }
        }
      `}</style>
    </>
  );
}
