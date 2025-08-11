import React, { useState } from 'react';
import './warning.css';
import './common.css';
import { useNavigate } from 'react-router-dom';
import ready from '../assets/ready.png';
import cloud from '../assets/cloud.png';

export default function WarningPage() {
  const [flash, setFlash] = useState(false);
  const navigate = useNavigate();

  const handleImageClick = () => {
    // 플래시 효과 트리거
    setFlash(true);

    // 애니메이션 끝나고 상태 초기화
    setTimeout(() => setFlash(false), 300); // 플래시 효과가 끝나는 시간(300ms)
  };

  return (
    <>
      <div className="clouds">
        {/* style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> */}
        <div className="cloud" style={{backgroundImage: `url(${cloud})`}}></div>
        <div className="cloud" style={{backgroundImage: `url(${cloud})`}}></div>
        <div className="cloud" style={{backgroundImage: `url(${cloud})`}}></div>
      </div>
    <div
      className="warning-page"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', width: '100vw' }}
    >
      {/* 이미지 영역 */}
      <div
        className={`image-container ${flash ? 'flash' : ''}`} // flash 클래스가 있을 때만 이미지 영역에 애니메이션 적용
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative', // 플래시 효과가 이미지 위에 오도록 설정
          flexDirection: 'column'
        }}
        onClick={handleImageClick} // 이미지 클릭 시 플래시 효과 발생
      >
        <img
          src={ready}
          alt="ready"
          style={{
            maxWidth: '315px',
            maxHeight: 'calc(100vh - 120px)',
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            cursor: 'pointer',
          }}
        />
        <h2 
          style={{
           alignItems: 'center',
           textAlign: 'center',
          //  marginTop:'10px'
          }}>
          <span>여권과 비행기 표를</span><br />
          <span>준비해 주세요!</span>
        </h2>
      </div>

      {/* 버튼 영역 */}
      <div
        className="button-bar"
      >
        {/* <button className="btn btn-exit" onClick={() => navigate('/')}>
          나가기
        </button> */}
        <button className="btn btn-next" onClick={() => navigate('/next')}>
          다음단계
        </button>
      </div>
    </div>
    </>
  );
}
