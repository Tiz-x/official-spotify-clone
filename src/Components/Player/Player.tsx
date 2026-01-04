import { useState, useMemo, useCallback, memo } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaStepBackward, 
  FaStepForward,
  FaHeart,
  FaRegHeart
} from 'react-icons/fa';
import { 
  MdShuffle, 
  MdRepeat,
  MdQueueMusic,
  MdDevices,
  MdVolumeUp,
  MdVolumeOff,
  MdVolumeDown
} from 'react-icons/md';
import { 
  BsPip,
  BsFullscreen
} from 'react-icons/bs';
import { FiMusic } from 'react-icons/fi';
import { IoChevronDown } from 'react-icons/io5';
import { HiOutlineQueueList } from 'react-icons/hi2';
import { SlOptions } from 'react-icons/sl';
import { usePlayer } from '../../hooks/usePlayer';
import Tooltip from '../Tooltip/Tooltip';
import './Player.css';
import '../Player/Playerfullpage.css';

// Memoized progress bar component
const ProgressBar = memo(({ 
  currentTime, 
  duration, 
  onSeek,
  formatTime
}: { 
  currentTime: number; 
  duration: number; 
  onSeek: (time: number) => void;
  formatTime: (seconds: number) => string;
}) => {
  const progressPercentage = useMemo(() => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  }, [currentTime, duration]);

  return (
    <div className="spotify-progress-container">
      <div className="spotify-progress-bar-wrapper">
        <div 
          className="spotify-progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
        <input 
          type="range"
          className="spotify-progress-slider"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          aria-label="Seek"
        />
      </div>
      <div className="spotify-progress-time">
        <span className="spotify-time-start">{formatTime(currentTime)}</span>
        <span className="spotify-time-end">{formatTime(duration)}</span>
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

// EXTRACTED OUTSIDE - This prevents re-creation on every render!
const SpotifyFullPagePlayer = memo(({ 
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  isLiked,
  isShuffle,
  repeatMode,
  onClose,
  onSeek,
  togglePlayPause,
  playNext,
  playPrevious,
  toggleLike,
  toggleShuffle,
  toggleRepeat,
  handleConnectDevice,
  handleQueueClick,
  formatTime,
  handleArtistClick
}: any) => {
  if (!currentTrack) return null;

  return (
    <div className="spotify-full-screen">
      <div className="spotify-bg-gradient"></div>
      
      <div className="spotify-full-content">
        <div className="spotify-top-bar">
          <Tooltip content="Close">
            <button 
              className="spotify-btn-circle spotify-btn-back"
              onClick={onClose}
              aria-label="Close"
            >
              <IoChevronDown size={28} />
            </button>
          </Tooltip>
          <div className="spotify-context-info">
            <span className="spotify-context-label">PLAYING FROM PLAYLIST</span>
          </div>
          <Tooltip content="More options">
            <button className="spotify-btn-circle spotify-btn-options" aria-label="More options">
              <SlOptions size={20} />
            </button>
          </Tooltip>
        </div>

        <div className="spotify-player-container">
          <div className="spotify-artwork-container">
            <div className="spotify-artwork">
              {currentTrack.image ? (
                <img src={currentTrack.image} alt={currentTrack.title} />
              ) : (
                <div className="spotify-artwork-placeholder">
                  <FiMusic size={80} />
                </div>
              )}
            </div>
          </div>

          <div className="spotify-track-details">
            <div className="spotify-track-main">
              <div className="spotify-track-text">
                <h1 className="spotify-track-name">{currentTrack.title}</h1>
                <p className="spotify-artist-name" onClick={handleArtistClick}>
                  {currentTrack.artist}
                </p>
              </div>
              <Tooltip content={isLiked ? "Remove from Liked Songs" : "Save to Liked Songs"}>
                <button 
                  className={`spotify-btn-icon spotify-btn-like ${isLiked ? 'liked' : ''}`}
                  onClick={toggleLike}
                  aria-label={isLiked ? "Remove from Liked Songs" : "Save to Liked Songs"}
                >
                  {isLiked ? <FaHeart size={28} /> : <FaRegHeart size={28} />}
                </button>
              </Tooltip>
            </div>
          </div>

          <ProgressBar 
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
            formatTime={formatTime}
          />

          <div className="spotify-controls">
            <div className="spotify-controls-buttons">
              <Tooltip content={isShuffle ? "Disable shuffle" : "Enable shuffle"}>
                <button 
                  className={`spotify-btn-control ${isShuffle ? 'active' : ''}`}
                  onClick={toggleShuffle}
                  aria-label={isShuffle ? "Disable shuffle" : "Enable shuffle"}
                >
                  <MdShuffle size={20} />
                  {isShuffle && <span className="spotify-control-dot"></span>}
                </button>
              </Tooltip>

              <Tooltip content="Previous">
                <button 
                  className="spotify-btn-control"
                  onClick={playPrevious}
                  aria-label="Previous"
                >
                  <FaStepBackward size={16} />
                </button>
              </Tooltip>

              <Tooltip content={isPlaying ? "Pause" : "Play"}>
                <button 
                  className="spotify-btn-play"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} style={{ marginLeft: '2px' }} />}
                </button>
              </Tooltip>

              <Tooltip content="Next">
                <button 
                  className="spotify-btn-control"
                  onClick={playNext}
                  aria-label="Next"
                >
                  <FaStepForward size={16} />
                </button>
              </Tooltip>

              <Tooltip content={repeatMode === 0 ? "Enable repeat" : repeatMode === 1 ? "Enable repeat one" : "Disable repeat"}>
                <button 
                  className={`spotify-btn-control ${repeatMode > 0 ? 'active' : ''}`}
                  onClick={toggleRepeat}
                  aria-label={repeatMode === 0 ? "Enable repeat" : repeatMode === 1 ? "Enable repeat one" : "Disable repeat"}
                >
                  <MdRepeat size={20} />
                  {repeatMode === 2 && <span className="spotify-repeat-one-badge">1</span>}
                  {repeatMode > 0 && <span className="spotify-control-dot"></span>}
                </button>
              </Tooltip>
            </div>
          </div>

          <div className="spotify-actions-bar">
            <Tooltip content="Connect to a device">
              <button 
                className="spotify-btn-action"
                onClick={handleConnectDevice}
                aria-label="Connect to a device"
              >
                <MdDevices size={22} />
              </button>
            </Tooltip>
            <Tooltip content="Queue">
              <button 
                className="spotify-btn-action"
                onClick={handleQueueClick}
                aria-label="Queue"
              >
                <HiOutlineQueueList size={26} />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
});

SpotifyFullPagePlayer.displayName = 'SpotifyFullPagePlayer';

const Player = () => {
  const [isFullPage, setIsFullPage] = useState(false);
  
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    isLiked,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    changeVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    formatTime
  } = usePlayer();

  // Memoize handlers
  const handleSeek = useCallback((time: number) => {
    seekTo(time);
  }, [seekTo]);

  const handleArtistClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentTrack) {
      console.log(`Navigate to artist: ${currentTrack.artist}`);
    }
  }, [currentTrack]);

  const volumeIcon = useMemo(() => {
    if (isMuted || volume === 0) return <MdVolumeOff size={16} />;
    if (volume < 50) return <MdVolumeDown size={16} />;
    return <MdVolumeUp size={16} />;
  }, [isMuted, volume]);

  const progressPercentage = useMemo(() => {
    return duration ? (currentTime / duration) * 100 : 0;
  }, [currentTime, duration]);

  const handlePictureInPicture = useCallback(() => {
    console.log("Toggle Picture-in-Picture mode");
  }, []);

  const handleNowPlayingView = useCallback(() => {
    setIsFullPage(true);
  }, []);

  const handleQueueClick = useCallback(() => {
    console.log("Open Queue");
  }, []);

  const handleConnectDevice = useCallback(() => {
    console.log("Open device picker");
  }, []);

  const handleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleTrackClick = useCallback(() => {
    if (currentTrack) {
      setIsFullPage(true);
    }
  }, [currentTrack]);
  
  const closeFullPage = useCallback(() => {
    setIsFullPage(false);
  }, []);

  if (!currentTrack) {
    return (
      <footer className="player">
        <div className="player-left">
          <div className="track-image-small">
            <FiMusic size={20} />
          </div>
          <div className="track-info-small">
            <div className="track-title-small">No track playing</div>
            <div className="track-artist-small">Select a song to play</div>
          </div>
        </div>
        <div className="player-center">
          <div className="player-controls">
            <Tooltip content="Shuffle is off">
              <button className="control-btn shuffle-btn" disabled>
                <MdShuffle size={16} />
              </button>
            </Tooltip>
            <Tooltip content="Previous">
              <button className="control-btn prev-btn" disabled>
                <FaStepBackward size={16} />
              </button>
            </Tooltip>
            <Tooltip content="Play">
              <button className="control-btn play-btn" disabled>
                <FaPlay size={18} />
              </button>
            </Tooltip>
            <Tooltip content="Next">
              <button className="control-btn next-btn" disabled>
                <FaStepForward size={16} />
              </button>
            </Tooltip>
            <Tooltip content="Repeat is off">
              <button className="control-btn repeat-btn" disabled>
                <MdRepeat size={16} />
              </button>
            </Tooltip>
          </div>
          <div className="player-progress">
            <span className="time-current">0:00</span>
            <div className="progress-bar-wrapper">
              <input 
                type="range" 
                className="progress-bar"
                min="0"
                max="0"
                value="0"
                disabled
              />
              <div className="progress-bar-fill" style={{ width: '0%' }} />
            </div>
            <span className="time-duration">0:00</span>
          </div>
        </div>
        <div className="player-right"></div>
      </footer>
    );
  }

  return (
    <>
      {!isFullPage && (
        <footer className="player">
          <div className="player-left">
            <Tooltip content="Expand">
              <div 
                className="track-image-small"
                onClick={handleTrackClick}
                style={{ cursor: 'pointer' }}
              >
                {currentTrack.image ? (
                  <img src={currentTrack.image} alt={currentTrack.title} />
                ) : (
                  <FiMusic size={20} />
                )}
              </div>
            </Tooltip>
            <div className="track-info-small">
              <Tooltip content={currentTrack.title}>
                <div 
                  className="track-title-small"
                  onClick={handleTrackClick}
                  style={{ cursor: 'pointer' }}
                >
                  {currentTrack.title}
                </div>
              </Tooltip>
              <Tooltip content={`Go to ${currentTrack.artist}`}>
                <div 
                  className="track-artist-small"
                  onClick={handleArtistClick}
                  style={{ cursor: 'pointer' }}
                >
                  {currentTrack.artist}
                </div>
              </Tooltip>
            </div>
            <Tooltip content={isLiked ? "Remove from Your Liked Songs" : "Save to Your Liked Songs"}>
              <button 
                className={`like-btn ${isLiked ? 'liked' : ''}`}
                onClick={toggleLike}
                aria-label={isLiked ? "Remove from Liked Songs" : "Add to Liked Songs"}
              >
                {isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
              </button>
            </Tooltip>
            <Tooltip content="Picture in Picture">
              <button 
                className="pip-btn"
                onClick={handlePictureInPicture}
                aria-label="Picture in Picture"
              >
                <BsPip size={16} />
              </button>
            </Tooltip>
          </div>

          <div className="player-center">
            <div className="player-controls">
              <Tooltip content={isShuffle ? "Disable shuffle" : "Enable shuffle"}>
                <button 
                  className={`control-btn shuffle-btn ${isShuffle ? 'active' : ''}`}
                  onClick={toggleShuffle}
                  aria-label="Shuffle"
                >
                  <MdShuffle size={16} />
                </button>
              </Tooltip>

              <Tooltip content="Previous">
                <button 
                  className="control-btn prev-btn"
                  onClick={playPrevious}
                  aria-label="Previous"
                >
                  <FaStepBackward size={16} />
                </button>
              </Tooltip>

              <Tooltip content={isPlaying ? "Pause" : "Play"}>
                <button 
                  className="control-btn play-btn"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <FaPause size={16} /> : <FaPlay size={18} />}
                </button>
              </Tooltip>

              <Tooltip content="Next">
                <button 
                  className="control-btn next-btn"
                  onClick={playNext}
                  aria-label="Next"
                >
                  <FaStepForward size={16} />
                </button>
              </Tooltip>

              <Tooltip content={
                repeatMode === 0 ? "Enable repeat" : 
                repeatMode === 1 ? "Enable repeat one" : 
                "Disable repeat"
              }>
                <button 
                  className={`control-btn repeat-btn ${repeatMode > 0 ? 'active' : ''}`}
                  onClick={toggleRepeat}
                  aria-label="Repeat"
                >
                  <MdRepeat size={16} />
                  {repeatMode === 2 && <span className="repeat-one-dot">•</span>}
                </button>
              </Tooltip>
            </div>

            <div className="player-progress">
              <span className="time-current">{formatTime(currentTime)}</span>
              <div className="progress-bar-wrapper">
                <input 
                  type="range" 
                  className="progress-bar"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={(e) => seekTo(Number(e.target.value))}
                  aria-label="Seek"
                />
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="time-duration">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="player-right">
            <Tooltip content="Now Playing View">
              <button 
                className="player-option-btn"
                onClick={handleNowPlayingView}
                aria-label="Now Playing View"
              >
                <BsPip size={16} />
              </button>
            </Tooltip>

            <Tooltip content="Queue">
              <button 
                className="player-option-btn"
                onClick={handleQueueClick}
                aria-label="Queue"
              >
                <MdQueueMusic size={20} />
              </button>
            </Tooltip>

            <Tooltip content="Connect to a device">
              <button 
                className="player-option-btn"
                onClick={handleConnectDevice}
                aria-label="Connect to a device"
              >
                <MdDevices size={20} />
              </button>
            </Tooltip>

            <div className="volume-control">
              <Tooltip content={isMuted ? "Unmute" : "Mute"}>
                <button 
                  className="volume-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {volumeIcon}
                </button>
              </Tooltip>
              <div className="volume-slider-wrapper">
                <input 
                  type="range"
                  className="volume-slider"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => changeVolume(Number(e.target.value))}
                  aria-label="Volume"
                />
                <div 
                  className="volume-slider-fill"
                  style={{ width: `${isMuted ? 0 : volume}%` }}
                />
              </div>
            </div>

            <Tooltip content="Full screen">
              <button 
                className="player-option-btn"
                onClick={handleFullScreen}
                aria-label="Full screen"
              >
                <BsFullscreen size={16} />
              </button>
            </Tooltip>
          </div>
        </footer>
      )}

      {isFullPage && (
        <SpotifyFullPagePlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          isLiked={isLiked}
          isShuffle={isShuffle}
          repeatMode={repeatMode}
          onClose={closeFullPage}
          onSeek={handleSeek}
          togglePlayPause={togglePlayPause}
          playNext={playNext}
          playPrevious={playPrevious}
          toggleLike={toggleLike}
          toggleShuffle={toggleShuffle}
          toggleRepeat={toggleRepeat}
          handleConnectDevice={handleConnectDevice}
          handleQueueClick={handleQueueClick}
          formatTime={formatTime}
          handleArtistClick={handleArtistClick}
        />
      )}
    </>
  );
};

export default Player;