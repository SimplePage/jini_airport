import React from 'react';
import './warning.css';
import './common.css';
import { useNavigate } from 'react-router-dom';
import ready from '../assets/ready.png';

export default function WarningPage() {
  const navigate = useNavigate();
  return (
    <div className="warning-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={ready}
          alt="ready"
          style={{
            maxWidth: '90vw',
            maxHeight: 'calc(100vh - 120px)',
            width: '100%',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>
      <div className="button-bar" style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', width: '100%' }}>
        <button className="btn btn-exit" onClick={() => navigate('/')}>나가기</button>
        <button className="btn btn-next" onClick={() => navigate('/next')}>다음단계</button>
      </div>
    </div>
  );
} 