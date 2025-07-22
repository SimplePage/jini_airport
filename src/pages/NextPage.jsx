import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './next.css';
import './common.css';
import kr from '../assets/kr.png';
import cn from '../assets/cn.png';
import jp from '../assets/jp.png';
import us from '../assets/us.png';
import plane from '../assets/plane.png';

const countries = [
  { code: 'KR', name: '한국', flag: kr },
  { code: 'CN', name: '중국', flag: cn },
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
    const seatMap = [
      ['1A','1B','1C',null,'1D','1E','1F','1G'],
      ['2A','2B','2C',null,'2D','2E','2F','2G'],
      ['3A','3B','3C',null,'3D','3E','3F','3G']
    ];
    return (
      <>
        <h2>3단계: 좌석 선택</h2>
        <div className="airplane-seats">
          {seatMap.map((row, i) => (
            <div className="seat-row" key={i} style={{display:'flex',justifyContent:'center',marginBottom:8}}>
              {row.map((s, j) => s === null ? (
                <span className="aisle" key={j} style={{width:24}}></span>
              ) : (
                <div
                  className={`seat${seat === s ? ' selected' : ''}`}
                  data-seat={s}
                  key={s}
                  onClick={() => setSeat(s)}
                  style={{cursor:'pointer',margin:'2px',padding:'10px 14px',border:'1px solid #bbb',borderRadius:6,background:seat===s?'#e3f2fd':'#fff'}}
                >{s}</div>
              ))}
            </div>
          ))}
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
            <img src={plane} alt="비행기" style={{position:'absolute',left:0,top:30,width:120,height:60,transition:'transform 2s cubic-bezier(0.4,1,0.7,1)',transform:anim?'translateX(120px) translateY(-60px) scale(1.2) rotate(-10deg)':'translateX(0)'}} />
          </div>
          <div style={{marginTop:60,fontSize:'1.2em',color:'#1976d2',fontWeight:'bold'}}>비행기가 출발합니다!</div>
        </div>
      )}
    </>
  );

  // 단계별 렌더링
  let content;
  if (step === 1) content = renderStep1();
  else if (step === 2) content = renderStep2();
  else if (step === 3) content = renderStep3();
  else content = renderStep4();

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
      setTimeout(() => {
        setAnim(false);
        navigate('/');
      }, 2050);
    }
  };

  return (
    <div style={{maxWidth:600,margin:'0 auto',padding:'2em'}}>
      <div className="step-indicator" style={{display:'flex',justifyContent:'center',gap:8,marginBottom:24}}>
        {[1,2,3,4].map(i => (
          <div key={i} className={`step${step===i?' active':''}`} style={{width:32,height:32,borderRadius:'50%',background:step===i?'#1976d2':'#eee',color:step===i?'#fff':'#888',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'1.1em'}}>{i}</div>
        ))}
      </div>
      <div className="step-content" style={{marginBottom:32}}>
        {content}
      </div>
      <div className="button-group" style={{display:'flex',justifyContent:'center',gap:16}}>
        <button className="btn btn-exit" onClick={onExitOrPrev}>{step===1?'나가기':'이전단계'}</button>
        <button className="btn btn-next" onClick={onNext}>{step<4?'다음단계':'완료'}</button>
      </div>
    </div>
  );
} 