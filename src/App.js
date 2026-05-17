import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppDataProvider } from './context/AppDataContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import AddPost from './pages/AddPost';
import Notifications from './pages/Notifications';
import Following from './pages/Following';
import './App.css';

function App() {
  return (
    <AppDataProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/profile/:username/following" element={<Following />} />
            <Route path="/following" element={<Following />} />
            <Route path="/search" element={<Search />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppDataProvider>
  );
}

export default App;
