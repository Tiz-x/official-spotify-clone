import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import MainContent from './Components/MainContent/MainContent';
import SearchPage from './pages/SearchPage/SearchPage';
import NowPlaying from './Components/NowPlaying/NowPlaying';
import NowPlayingToggle from './Components/NowPlayingToggle/NowPlayingToggle';
import Player from './Components/Player/Player';
import LikedSongs from './pages/LikeSongs/LikedSongs';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import SpotifyTooltip from './Components/Header/SpotifyTooltip'; // ← ADD THIS!
// import './App.css';

function App() {
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Enable keyboard controls (spacebar for play/pause)
  useKeyboardControls();

  // Close sidebars when resizing above mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
        // Keep NowPlaying open on desktop if user opened it
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebars on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
        setIsNowPlayingOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <SpotifyTooltip />

        {/* Sidebar Backdrop (Mobile Only) */}
        {isSidebarOpen && (
          <div 
            className="sidebar-backdrop"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Now Playing Backdrop (Mobile Only) */}
        {isNowPlayingOpen && (
          <div 
            className="now-playing-backdrop"
            onClick={() => setIsNowPlayingOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Header */}
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* Main Content Wrapper */}
        <div className="main-content-wrapper">
          {/* Sidebar */}
          <Sidebar 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          
          {/* Content Area (Routes) */}
          <div className="content-area">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/liked" element={<LikedSongs />} />
            </Routes>
          </div>

          {/* Now Playing Panel */}
          {isNowPlayingOpen && (
            <NowPlaying 
              isOpen={isNowPlayingOpen}
              onClose={() => setIsNowPlayingOpen(false)} 
            />
          )}
        </div>

        {/* Player (Footer) */}
        <Player />

        {/* Now Playing Toggle Button (Floating) */}
        <NowPlayingToggle 
          isOpen={isNowPlayingOpen}
          onClick={() => setIsNowPlayingOpen(!isNowPlayingOpen)} 
        />
      </div>
    </BrowserRouter>
  );
}

export default App;