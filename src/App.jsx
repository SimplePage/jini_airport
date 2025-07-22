import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AirportHomePage from './pages/AirportHomePage';
import AirportCheckInPage from './pages/AirportCheckInPage';
import WarningPage from './pages/WarningPage';
import NextPage from './pages/NextPage';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/jini_airport">
      <Routes>
        {/* 필요하다면 HomePage 등 다른 페이지도 추가하세요 */}
        <Route path="/" element={<AirportHomePage />} />
        <Route path="/checkin" element={<AirportCheckInPage />} />
        <Route path="/warning" element={<WarningPage />} />
        <Route path="/next" element={<NextPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
