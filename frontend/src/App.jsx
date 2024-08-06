
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './charge/MainPage.jsx';
import Login from './user/Login.jsx';
import Join from './user/Join.jsx';
import MyPage from './user/MyPage.jsx';
import Admin from './user/Admin.jsx'
import Owner from './owner/Owner.jsx'

function App() {
  return (

      <Router>
        <Routes>

        <Route path="/" element={<Main />} />

        <Route path="/login" element={<Login />} />
        
        <Route path="/join" element={<Join />} />

        <Route path="/mypage" element={<MyPage />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/owner" element={<Owner />} />
        
        </Routes>
      </Router>

  );
}

export default App;
