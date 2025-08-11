import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './next.css';
import './common.css';
import kr from '../assets/kr.png';
import jeju from '../assets/jeju.png';
import jp from '../assets/jp.png';
import us from '../assets/us.png';
import plane from '../assets/plane.png';
import cloud from '../assets/cloud.png';

const countries = [
  { code: 'KR', name: '한국', flag: kr },
  { code: 'JEJU', name: '제주도', flag: jeju },
  { code: 'JP', name: '일본', flag: jp },
  { code: 'US', name: '미국', flag: us }
];
const defaultUsers = [ { name: '지니썜' } ];

export default function NextPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [flight, setFlight] = useState('');
  const [passenger, setPassenger] = useState('');
  const [seat, setSeat] = useState('');
  const [anim, setAnim] = useState(false);
  const [planeAnim, setPlaneAnim] = useState(false);

  // 1단계: 나라 선택
  const renderStep1 = () => (
    <>
      <h2>1단계: 나라 선택</h2>
      <div className="flight-list">
        {countries.map(c => (
          <div
            key={c.code}
            className={`flight-item${flight === c.code ? ' selected' : ''}`}
            data-code={c.code}
            onClick={() => setFlight(c.code)}
            style={{cursor:'pointer',margin:'8px',padding:'8px 16px',border:'1px solid #bbb',borderRadius:8,background:flight===c.code?'#e3f2fd':'#fff',display:'inline-block'}}
          >
            <span style={{display:'flex',alignItems:'center',gap:12}}>
              <img src={c.flag} alt={`${c.name} 국기`} style={{width:32,height:22,borderRadius:4,border:'1px solid #bbb',boxShadow:'0 1px 2px #eee'}} /> {c.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );

  // 2단계: 탑승객 선택
  const renderStep2 = () => {
    let userList = [];
    const savedList = JSON.parse(localStorage.getItem('passengerList') || '[]');
    if (Array.isArray(savedList) && savedList.length > 0) {
      userList = savedList.map(n => ({ name: n }));
    } else {
      userList = [...defaultUsers];
    }
    return (
      <>
        <h2>2단계: 탑승객 선택</h2>
        <div className="user-list">
          {userList.map(u => (
            <div
              key={u.name}
              className={`user-item${passenger === u.name ? ' selected' : ''}`}
              data-name={u.name}
              onClick={() => setPassenger(u.name)}
              style={{cursor:'pointer',margin:'8px',padding:'8px 16px',border:'1px solid #bbb',borderRadius:8,background:passenger===u.name?'#e3f2fd':'#fff',display:'inline-block'}}
            >
              <span>{u.name}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  // 3단계: 좌석 선택
  const renderStep3 = () => {
    const rainbowSeats = [
      { id: 'RED', label: 'R', name: '빨강', color: '#ff0000' },
      { id: 'ORANGE', label: 'O', name: '주황', color: '#ff7f00' },
      { id: 'YELLOW', label: 'Y', name: '노랑', color: '#ffff00' },
      { id: 'GREEN', label: 'G', name: '초록', color: '#00c853' },
      { id: 'BLUE', label: 'B', name: '파랑', color: '#2962ff' },
      { id: 'INDIGO', label: 'I', name: '남색', color: '#4b0082' },
      { id: 'VIOLET', label: 'V', name: '보라', color: '#9400d3' }
    ];

    return (
      <>
        <h2 style={{marginBottom: 16}}>3단계: 좌석 선택</h2>
        <div style={{display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap'}}>
          {rainbowSeats.map(s => {
            const selected = seat === s.id;
            return (
              <div key={s.id} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:8}}>
                <div
                  role="button"
                  aria-label={`좌석 ${s.name}`}
                  onClick={() => setSeat(s.id)}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: s.color,
                    boxShadow: selected ? '0 0 0 3px #1976d2' : '0 1px 3px rgba(0,0,0,0.15)',
                    border: selected ? '2px solid #0d47a1' : '1px solid rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: s.id === 'YELLOW' ? '#333' : '#fff',
                    fontWeight: 'bold',
                    userSelect: 'none',
                    transition: 'transform 0.15s ease, box-shadow 0.2s ease'
                  }}
                >
                  {s.label}
                </div>
                <div style={{fontSize: 12, color: '#555'}}>{s.name}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  // 4단계: 탑승권 발권
  const renderStep4 = () => (
    <>
      <h2>4단계: 탑승권 발권</h2>
      <div className="ticket" style={{margin:'2em auto',padding:'2em',border:'1px solid #1976d2',borderRadius:12,maxWidth:320}}>
        <div>항공편: <b>{flight || 'N/A'}</b></div>
        <div>탑승객: <b>{passenger || 'N/A'}</b></div>
        <div>좌석번호: <b>{seat || 'N/A'}</b></div>
        <div style={{marginTop:12, color:'#1976d2', fontWeight:'bold'}}>탑승권이 발급되었습니다!</div>
      </div>
      {anim && (
        <div style={{display:'flex',position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:999,background:'rgba(227,242,253,0.95)',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <div style={{width:220,height:120,position:'relative',overflow:'visible'}}>
            <img
              src={plane}
              alt="비행기"
              style={{
                position:'absolute',
                left:0,
                top:30,
                width:120,
                height:60,
                transition:'transform 2s cubic-bezier(0.4,1,0.7,1)',
                transform: planeAnim
                  ? 'translateX(120px) translateY(-60px) scale(1.2) rotate(-10deg) scaleX(-1)'
                  : 'translateX(0) scaleX(-1)'
              }}
            />
          </div>
          <div style={{marginTop:60,fontSize:'1.2em',color:'#1976d2',fontWeight:'bold'}}>비행기가 출발합니다!</div>
        </div>
      )}
    </>
  );

  // 버튼 핸들러
  const onExitOrPrev = () => {
    if (step === 1) navigate('/');
    else setStep(step - 1);
  };
  const onNext = () => {
    // if (step === 1 && !flight) return alert('항공편을 선택하세요.');
    // if (step === 2 && !passenger) return alert('탑승객을 선택하세요.');
    // if (step === 3 && !seat) return alert('좌석을 선택하세요.');
    if (step === 1 && !flight) return;
    if (step === 2 && !passenger) return;
    if (step === 3 && !seat) return;
    if (step < 4) setStep(step + 1);
    else {
      setAnim(true);
      setPlaneAnim(false);
      setTimeout(() => {
        setPlaneAnim(true);
      }, 50);
      setTimeout(() => {
        setAnim(false);
        setPlaneAnim(false);
        navigate('/');
      }, 2050);
    }
  };

  let content;
  if (step === 1) content = renderStep1();
  else if (step === 2) content = renderStep2();
  else if (step === 3) content = renderStep3();
  else content = renderStep4();

  return (
    <>
       <div className="clouds">
        {/* style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> */}
        <div className="cloud" style={{backgroundImage: `url(${cloud})`}}></div>
        <div className="cloud" style={{backgroundImage: `url(${cloud})`}}></div>
        <div className="cloud" style={{backgroundImage: `url(${cloud})`}}></div>
      </div>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100vw' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2em' }}>
          <div className="step-indicator" style={{display:'flex',justifyContent:'center',gap:8,marginBottom:24}}>
            {[1,2,3,4].map(i => (
              <div key={i} 
                className={`step${step===i?' active':''}`} 
                style={{
                  width:32,
                  height:32,
                  borderRadius:'50%',
                  background:step===i?'#1976d2':'#eee',
                  color:step===i?'#fff':'#888',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  fontWeight:'bold',
                  fontSize:'1.1em'
                }}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="step-content">
            {content}
          </div>
        </div>
        <div className="button-bar">
          {/* <button className="btn btn-exit" onClick={onExitOrPrev}>{step===1?'나가기':'이전단계'}</button> */}
          <button className="btn btn-next" onClick={onNext}>{step<4?'다음단계':'완료'}</button>
        </div>
      </div>
    </>
  );
} 