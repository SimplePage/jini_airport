import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AirportCheckInPage from './pages/AirportCheckInPage';
import NextPage from './pages/NextPage';
import WarningPage from './pages/WarningPage';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/jini_airport">
      <Routes>
        <Route path="/" element={<AirportCheckInPage />} />
        <Route path="/next" element={<NextPage />} />
        <Route path="/warning" element={<WarningPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
