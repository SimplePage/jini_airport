import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import './common.css';
import cloud from '../assets/cloud.png';
import red from '../assets/red.png';
import orange from '../assets/orange.png';
import yellow from '../assets/yellow.png';
import green from '../assets/green.png';
import blue from '../assets/blue.png';
import puple from '../assets/puple.png';

export default function AirportCheckInPage() {
  const navigate = useNavigate();
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

  const handleImageClick = (color) => {
    navigate('/warning', { state: { backgroundColor: color } });
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
        {/* style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> */}
        <div className="cloud" style={{backgroundImage: `url(${cloud})`}}></div>
        <div className="cloud" style={{backgroundImage: `url(${cloud})`}}></div>
        <div className="cloud" style={{backgroundImage: `url(${cloud})`}}></div>
      </div>
      
      {/* 7개의 이미지를 가로로 나열 */}
      <div className="main-image-container">
        {/* 첫 번째 줄 */}
          <div className="image-row">
            <img
              src={red}
              alt="red"
              className="image-item"
              onClick={() => handleImageClick('#ff0000')}
            />
            <img
              src={orange}
              alt="orange"
              className="image-item"
              onClick={() => handleImageClick('#ff7f00')}
            />
          </div>

          {/* 두 번째 줄 */}
          <div className="image-row">
            <img
              src={yellow}
              alt="yellow"
              className="image-item"
              onClick={() => handleImageClick('#ffff00')}
            />
            <img
              src={green}
              alt="green"
              className="image-item"
              onClick={() => handleImageClick('#00ff00')}
            />
          </div>

          {/* 세 번째 줄 */}
          <div className="image-row">
            <img
              src={blue}
              alt="blue"
              className="image-item"
              onClick={() => handleImageClick('#0000ff')}
            />
            <img
              src={puple}
              alt="puple"
              className="image-item"
              onClick={() => handleImageClick('#4b0082')}
            />
          </div>
        </div>
    </>
  );
} 