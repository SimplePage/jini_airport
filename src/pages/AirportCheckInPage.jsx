import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import './common.css';
import hexagonImg1 from '../assets/hexagonImg1.png';
import hexagonImg2 from '../assets/hexagonImg2.png';
import hexagonImg3 from '../assets/hexagonImg3.png';
import cloud1 from '../assets/cloud1.png';
import cloud2 from '../assets/cloud2.png';
import cloud3 from '../assets/cloud3.png';

export default function AirportCheckInPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [passengerList, setPassengerList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('passengerList')) || [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');

  const openSettings = () => setModalOpen(true);
  const closeSettings = () => setModalOpen(false);

  const addPassenger = (e) => {
    e.preventDefault();
    const name = input.trim();
    if (!name || passengerList.includes(name)) return;
    setPassengerList([...passengerList, name]);
    setInput('');
  };

  const removePassenger = (idx) => {
    setPassengerList(passengerList.filter((_, i) => i !== idx));
  };

  const saveAllPassengers = () => {
    const filtered = passengerList.filter(n => n.trim() !== '');
    setPassengerList(filtered);
    localStorage.setItem('passengerList', JSON.stringify(filtered));
    closeSettings();
  };

  const resetPassengers = () => {
    setPassengerList([]);
    localStorage.removeItem('passengerList');
  };

  return (
    <>
      <button className="settings-btn" onClick={openSettings} aria-label="설정">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{verticalAlign: 'middle'}}><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.43-2.9c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.03 7.03 0 0 0-1.7-.98l-.38-2.65A.5.5 0 0 0 13 2h-4a.5.5 0 0 0-.5.42l-.38 2.65c-.63.24-1.22.56-1.78.98l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46c.14.24.44.32.68.22l2.49-1c.54.42 1.13.74 1.78.98l.38 2.65A.5.5 0 0 0 9 22h4a.5.5 0 0 0 .5-.42l.38-2.65c.63-.24 1.22-.56 1.78-.98l2.49 1c.24.1.54.02.68-.22l2-3.46a.5.5 0 0 0-.12-.64l-2.11-1.65zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="#fff"/></svg>
      </button>
      {modalOpen && (
        <div className="modal-bg active" id="settingsModal">
          <div className="modal">
            <h2>탑승객 정보 입력</h2>
            <div id="passengerChips" style={{width:'100%',marginBottom:10,display:'flex',flexWrap:'wrap',gap:6}}>
              {passengerList.map((name, idx) => (
                <span key={name} style={{background:'#e3f2fd',color:'#1976d2',padding:'3px 12px',borderRadius:12,fontSize:'0.98em',cursor:'pointer',position:'relative',userSelect:'none',marginBottom:4}} onClick={()=>setInput(name)}>
                  {name}
                  <span style={{marginLeft:6,color:'#888',cursor:'pointer',fontSize:'1.1em',position:'relative',top:-1}} onClick={e => {e.stopPropagation(); removePassenger(idx);}}>&times;</span>
                </span>
              ))}
            </div>
            <form id="passengerForm" onSubmit={addPassenger} style={{display:'flex',gap:8,alignItems:'center'}}>
              <label style={{marginBottom:0}}>이름</label>
              <input type="text" id="passengerName" required value={input} onChange={e=>setInput(e.target.value)} style={{width:120}} />
              <button type="submit" className="btn btn-save" style={{padding:'6px 14px',fontSize:'0.95rem'}}>추가</button>
            </form>
            <div className="btns" style={{marginTop:18}}>
              <button type="button" className="btn btn-save" onClick={saveAllPassengers}>저장</button>
              <button type="button" className="btn btn-cancel" onClick={closeSettings}>취소</button>
              <button type="button" className="btn btn-cancel" style={{background:'#fff',color:'#d32f2f',border:'1px solid #d32f2f'}} onClick={resetPassengers}>리셋</button>
            </div>
          </div>
        </div>
      )}
      <div className="clouds">
        <div className="cloud" style={{backgroundImage: `url(${cloud1})`}}></div>
        <div className="cloud" style={{backgroundImage: `url(${cloud2})`}}></div>
        <div className="cloud" style={{backgroundImage: `url(${cloud3})`}}></div>
      </div>
      <div className="hexagon-container">
        <div className="hex-row hex-row-1">
          <Link to="/warning" className="hexagon">
            <img src={hexagonImg1} alt="hexagon1" />
          </Link>
          <Link to="/warning" className="hexagon">
            <img className="bkRed" src={hexagonImg2} alt="hexagon2" />
          </Link>
        </div>
        <div className="hex-row hex-row-2">
          <Link to="/warning" className="hexagon">
            <img src={hexagonImg3} alt="hexagon3" />
          </Link>
        </div>
      </div>
    </>
  );
} 