import React from 'react';
import './warning.css';
import './common.css';
import { useNavigate } from 'react-router-dom';

export default function WarningPage() {
  const navigate = useNavigate();
  return (
    <div className="warning-page">
      <div
        style={{
          margin: '0 auto 2em auto',
          maxWidth: 320,
          background: '#fff3cd',
          border: '2px solid #ff9800',
          borderRadius: 12,
          padding: '2em 1em',
          color: '#7a4f01',
          fontWeight: 'bold',
          fontSize: '1.2em',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(255,152,0,0.08)'
        }}
      >
        ⚠️ 경고: 안전을 위해 안내를 꼭 확인하세요!
      </div>
      <div className="button-group" style={{display:'flex',justifyContent:'center',gap:16}}>
        <button className="btn btn-exit" onClick={() => navigate('/')}>나가기</button>
        <button className="btn btn-next" onClick={() => navigate('/next')}>다음단계</button>
      </div>
    </div>
  );
} 