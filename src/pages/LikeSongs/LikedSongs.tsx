import { useState } from "react";
import { FaPlay, FaPause, FaHeart } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { usePlayer } from "../../hooks/usePlayer";
import "./LikedSongs.css";

const LikedSongs = () => {
  const {
    likedSongs,
    playTrackList,
    currentTrack,
    isPlaying,
    togglePlayPause,
    removeFromLikedSongs,
    formatTime,
  } = usePlayer();

  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  const handlePlayAll = () => {
    if (likedSongs.length > 0) {
      playTrackList(likedSongs, 0);
    }
  };

  const handlePlayTrack = (index: number) => {
    const track = likedSongs[index];
    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      playTrackList(likedSongs, index);
    }
  };

  const handleUnlike = (trackId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    removeFromLikedSongs(trackId);
  };

  const isCurrentTrack = (trackId: string) => currentTrack?.id === trackId;
  const showPauseButton = (trackId: string) =>
    isCurrentTrack(trackId) && isPlaying;

  return (
    <div className="liked-songs-page">
      {/* Header with Gradient Background */}
      <div className="liked-songs-header">
        <div className="liked-songs-cover">
          <FaHeart size={80} />
        </div>
        <div className="liked-songs-info">
          <span className="playlist-badge">PLAYLIST</span>
          <h1 className="liked-songs-title">Liked Songs</h1>
          <div className="liked-songs-meta">
            <span className="meta-item">
              {likedSongs.length} song{likedSongs.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="liked-songs-actions">
        <button
          className="play-all-button"
          onClick={handlePlayAll}
          disabled={likedSongs.length === 0}
          aria-label="Play all liked songs"
        >
          {isPlaying &&
          likedSongs.some((song) => song.id === currentTrack?.id) ? (
            <FaPause size={28} />
          ) : (
            <FaPlay size={28} style={{ marginLeft: "3px" }} />
          )}
        </button>
        <button className="more-options-button" aria-label="More options">
          <BsThreeDots size={32} />
        </button>
      </div>

      {/* Track List */}
      <div className="liked-songs-content">
        {likedSongs.length === 0 ? (
          <div className="empty-state">
            <FaHeart size={64} className="empty-icon" />
            <h2 className="empty-title">Songs you like will appear here</h2>
            <p className="empty-description">
              Save songs by tapping the heart icon.
            </p>
          </div>
        ) : (
          <div className="tracks-container">
            {/* Table Header */}
            <div className="tracks-header">
              <div className="header-number">#</div>
              <div className="header-title">TITLE</div>
              <div className="header-album">ALBUM</div>
              <div className="header-duration">
                <MdAccessTime size={18} />
              </div>
            </div>

            {/* Track List */}
            <div className="tracks-body">
              {likedSongs.map((track, index) => {
                const isHovered = hoveredTrack === track.id;
                const isCurrent = isCurrentTrack(track.id);
                const shouldShowPause = showPauseButton(track.id);

                return (
                  <div
                    key={track.id}
                    className={`track-item ${isCurrent ? "is-playing" : ""} ${
                      isHovered ? "is-hovered" : ""
                    }`}
                    onClick={() => handlePlayTrack(index)}
                    onMouseEnter={() => setHoveredTrack(track.id)}
                    onMouseLeave={() => setHoveredTrack(null)}
                  >
                    {/* Track Number / Play Button */}
                    <div className="track-number">
                      {isHovered || isCurrent ? (
                        <button
                          className="track-play-button"
                          aria-label={shouldShowPause ? "Pause" : "Play"}
                        >
                          {shouldShowPause ? (
                            <FaPause size={16} />
                          ) : (
                            <FaPlay size={16} style={{ marginLeft: "2px" }} />
                          )}
                        </button>
                      ) : (
                        <span className="number-text">{index + 1}</span>
                      )}
                    </div>

                    {/* Track Title & Artist */}
                    <div className="track-title">
                      <div className="track-info-wrapper">
                        {track.image && (
                          <img
                            src={track.image}
                            alt={track.title}
                            className="track-thumbnail"
                          />
                        )}
                        <div className="track-details">
                          <div
                            className={`track-title-text ${
                              isCurrent ? "is-active" : ""
                            }`}
                          >
                            {track.title}
                          </div>
                          <div className="track-artist-text">
                            {track.artist}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Track Album */}
                    <div className="track-album">
                      <span className="album-text">
                        {track.album || "Single"}
                      </span>
                    </div>

                    {/* Track Actions & Duration */}
                    <div className="track-actions">
                      <button
                        className="track-heart-button"
                        onClick={(e) => handleUnlike(track.id, e)}
                        aria-label="Remove from Liked Songs"
                        title="Remove from Liked Songs"
                      >
                        <FaHeart size={16} />
                      </button>
                      <span className="track-duration-text">
                        {track.duration ? formatTime(track.duration) : "3:45"}
                      </span>
                      <button
                        className="track-more-button"
                        aria-label="More options"
                      >
                        <BsThreeDots size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
