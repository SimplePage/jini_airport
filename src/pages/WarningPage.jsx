import React from 'react';
import './warning.css';
import './common.css';
import { useNavigate } from 'react-router-dom';

export default function WarningPage() {
  const navigate = useNavigate();
  return (
    <div className="warning-page" style={{padding: '2rem', textAlign: 'center'}}>
      <div className="warning-img" style={{marginBottom: '2em'}}>
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#fff3cd" stroke="#ff9800" strokeWidth="2"/><path d="M12 7v5" stroke="#ff9800" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1.2" fill="#ff9800"/></svg>
      </div>
      <div className="button-group" style={{display:'flex',justifyContent:'center',gap:16}}>
        <button className="btn btn-exit" onClick={() => navigate('/')}>나가기</button>
        <button className="btn btn-next" onClick={() => navigate('/next')}>다음단계</button>
      </div>
    </div>
  );
} 