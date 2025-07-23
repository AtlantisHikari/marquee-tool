import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PlayPage } from './pages/PlayPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 主頁 - 跑馬燈清單 */}
        <Route path="/" element={<HomePage />} />
        
        {/* 播放頁 - 全屏跑馬燈 */}
        <Route path="/play/:id" element={<PlayPage />} />
        
        {/* 設定頁 - 跑馬燈設定 */}
        <Route path="/settings/:id" element={<SettingsPage />} />
        
        {/* 404 重定向到主頁 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;