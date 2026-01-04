import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { usePlayer } from "../../hooks/usePlayer";
import type { Track } from "../../context/PlayerContext";
import { NIGERIAN_TRACKS } from "../../Data/nigerianTracks";
import "./MainContent.css";

const MainContent = () => {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "music" | "podcasts"
  >("all");
  const { playTrack, playTrackList, togglePlayPause, currentTrack, isPlaying } = usePlayer();

  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    "made-for-you": false,
    "recommended-stations": false,
    "popular-artists": false,
    "best-of-artists": false,
    "popular-radio": false,
  });

  // Use the Nigerian tracks we defined
  const tracks = NIGERIAN_TRACKS;

  // Define which sections belong to which filter
  const sectionFilters = {
    "made-for-you": "music",
    "recommended-stations": "music",
    "popular-artists": "music",
    "best-of-artists": "music",
    "popular-radio": "podcasts",
  };

  // Helper function to check if section should be visible based on active filter
  const isSectionVisible = (sectionKey: string): boolean => {
    if (activeFilter === "all") return true;
    return (
      sectionFilters[sectionKey as keyof typeof sectionFilters] === activeFilter
    );
  };

  // Helper functions
  const isCurrentTrack = (trackId: string) => currentTrack?.id === trackId;
  const showPauseButton = (trackId: string) =>
    isCurrentTrack(trackId) && isPlaying;

  const handlePlayClick = (track: Track, event: React.MouseEvent) => {
    event.stopPropagation();
    if (isCurrentTrack(track.id)) {
      togglePlayPause();
    } else {
      // Find the track's index in the full tracks array and set up the queue
      const trackIndex = tracks.findIndex(t => t.id === track.id);
      if (trackIndex !== -1) {
        playTrackList(tracks, trackIndex);
      } else {
        playTrack(track);
      }
    }
  };

  const handleCardClick = (track: Track) => {
    if (isCurrentTrack(track.id)) {
      togglePlayPause();
    } else {
      // Find the track's index in the full tracks array and set up the queue
      const trackIndex = tracks.findIndex(t => t.id === track.id);
      if (trackIndex !== -1) {
        playTrackList(tracks, trackIndex);
      } else {
        playTrack(track);
      }
    }
  };

  const handleShowAll = (section: string, event: React.MouseEvent) => {
    event.preventDefault();
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Get tracks for different sections with limit
  const getTracksForSection = (
    startIndex: number,
    count: number,
    sectionKey: string,
    initialDisplay: number = 4
  ) => {
    const allTracks = tracks.slice(startIndex, startIndex + count);
    const isExpanded = expandedSections[sectionKey];

    // Show only 4 cards initially, show all when expanded
    return isExpanded ? allTracks : allTracks.slice(0, initialDisplay);
  };

  // Check if section has more items to show
  const hasMoreItems = (totalCount: number, initialDisplay: number = 4) => {
    return totalCount > initialDisplay;
  };

  return (
    <main className="main-content">
      {/* Top Pills Navigation */}
      <div className="content-pills">
        <button
          className={`pill-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All
        </button>
        <button
          className={`pill-btn ${activeFilter === "music" ? "active" : ""}`}
          onClick={() => setActiveFilter("music")}
        >
          Music
        </button>
        <button
          className={`pill-btn ${activeFilter === "podcasts" ? "active" : ""}`}
          onClick={() => setActiveFilter("podcasts")}
        >
          Podcasts
        </button>
      </div>

      {/* Made For Section */}
      {isSectionVisible("made-for-you") && (
        <section className="content-section">
          <div className="section-header">
            <div>
              <p className="section-subtitle">Made For</p>
              <h2 className="section-title">Tizkid</h2>
            </div>
            {hasMoreItems(6) && (
              <a
                href="#"
                className="show-all-link"
                onClick={(e) => handleShowAll("made-for-you", e)}
              >
                {expandedSections["made-for-you"] ? "Show less" : "Show all"}
              </a>
            )}
          </div>

          <div className="content-grid">
            {getTracksForSection(0, 6, "made-for-you").map((track, index) => (
              <div
                key={track.id}
                className={`content-card ${
                  isCurrentTrack(track.id) ? "playing" : ""
                }`}
                onClick={() => handleCardClick(track)}
              >
                <div className="card-image-wrapper">
                  <img src={track.image} alt={track.title} />
                  {index > 0 && index < 3 && (
                    <div className="daily-mix-badge">
                      <span className={`daily-mix-text${index}`}>
                        Daily Mix
                      </span>
                      <span className={`daily-mix-number${index}`}>
                        0{index}
                      </span>
                    </div>
                  )}
                  {/* Playing indicator */}
                  {isCurrentTrack(track.id) && isPlaying && (
                    <div className="playing-indicator">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  )}
                  <button
                    className="card-play-btn"
                    onClick={(e) => handlePlayClick(track, e)}
                    aria-label={
                      showPauseButton(track.id)
                        ? "Pause"
                        : `Play ${track.title}`
                    }
                  >
                    {showPauseButton(track.id) ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
                <div className="card-info">
                  <h3 className="card-title">{track.title}</h3>
                  <p className="card-subtitle">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended Stations */}
      {isSectionVisible("recommended-stations") && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Recommended Stations</h2>
            {hasMoreItems(6) && (
              <a
                href="#"
                className="show-all-link"
                onClick={(e) => handleShowAll("recommended-stations", e)}
              >
                {expandedSections["recommended-stations"]
                  ? "Show less"
                  : "Show all"}
              </a>
            )}
          </div>
          <p className="section-description">
            Non-stop music based on your favourite songs and artists.
          </p>

          <div className="content-grid">
            {getTracksForSection(6, 6, "recommended-stations").map((track) => (
              <div
                key={track.id}
                className={`content-card ${
                  isCurrentTrack(track.id) ? "playing" : ""
                }`}
                onClick={() => handleCardClick(track)}
              >
                <div className="card-image-wrapper">
                  <img src={track.image} alt={track.title} />
                  {/* Playing indicator */}
                  {isCurrentTrack(track.id) && isPlaying && (
                    <div className="playing-indicator">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  )}
                  <button
                    className="card-play-btn"
                    onClick={(e) => handlePlayClick(track, e)}
                    aria-label={
                      showPauseButton(track.id)
                        ? "Pause"
                        : `Play ${track.title}`
                    }
                  >
                    {showPauseButton(track.id) ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
                <div className="card-info">
                  <h3 className="card-title">{track.title}</h3>
                  <p className="card-subtitle">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Artists */}
      {isSectionVisible("popular-artists") && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Popular artists</h2>
            {hasMoreItems(6) && (
              <a
                href="#"
                className="show-all-link"
                onClick={(e) => handleShowAll("popular-artists", e)}
              >
                {expandedSections["popular-artists"] ? "Show less" : "Show all"}
              </a>
            )}
          </div>

          <div className="content-grid">
            {getTracksForSection(12, 6, "popular-artists").map((track) => (
              <div
                key={track.id}
                className={`content-card artist-card ${
                  isCurrentTrack(track.id) ? "playing" : ""
                }`}
                onClick={() => handleCardClick(track)}
              >
                <div className="card-image-wrapper artist-image-wrapper">
                  <img
                    src={track.image}
                    alt={track.artist}
                    className="artist-image"
                  />
                  {/* Playing indicator */}
                  {isCurrentTrack(track.id) && isPlaying && (
                    <div className="playing-indicator">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  )}
                  <button
                    className="card-play-btn"
                    onClick={(e) => handlePlayClick(track, e)}
                    aria-label={
                      showPauseButton(track.id)
                        ? "Pause"
                        : `Play ${track.artist}`
                    }
                  >
                    {showPauseButton(track.id) ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
                <div className="card-info">
                  <h3 className="card-title">{track.artist}</h3>
                  <p className="card-subtitle">Artist</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Best of Artists */}
      {isSectionVisible("best-of-artists") && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Best of artists</h2>
            {hasMoreItems(6) && (
              <a
                href="#"
                className="show-all-link"
                onClick={(e) => handleShowAll("best-of-artists", e)}
              >
                {expandedSections["best-of-artists"] ? "Show less" : "Show all"}
              </a>
            )}
          </div>
          <p className="section-description">
            Bringing together the top songs from an artist.
          </p>

          <div className="content-grid">
            {getTracksForSection(18, 6, "best-of-artists").map((track) => (
              <div
                key={track.id}
                className={`content-card ${
                  isCurrentTrack(track.id) ? "playing" : ""
                }`}
                onClick={() => handleCardClick(track)}
              >
                <div className="card-image-wrapper">
                  <img src={track.image} alt={`This Is ${track.artist}`} />
                  {/* Playing indicator */}
                  {isCurrentTrack(track.id) && isPlaying && (
                    <div className="playing-indicator">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  )}
                  <button
                    className="card-play-btn"
                    onClick={(e) => handlePlayClick(track, e)}
                    aria-label={
                      showPauseButton(track.id)
                        ? "Pause"
                        : `Play ${track.title}`
                    }
                  >
                    {showPauseButton(track.id) ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
                <div className="card-info">
                  <h3 className="card-title">This Is {track.artist}</h3>
                  <p className="card-subtitle">
                    The essential tracks from {track.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Radio */}
      {isSectionVisible("popular-radio") && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Popular radio</h2>
            {hasMoreItems(6) && (
              <a
                href="#"
                className="show-all-link"
                onClick={(e) => handleShowAll("popular-radio", e)}
              >
                {expandedSections["popular-radio"] ? "Show less" : "Show all"}
              </a>
            )}
          </div>

          <div className="content-grid">
            {getTracksForSection(24, 6, "popular-radio").map((track) => (
              <div
                key={track.id}
                className={`content-card ${
                  isCurrentTrack(track.id) ? "playing" : ""
                }`}
                onClick={() => handleCardClick(track)}
              >
                <div className="card-image-wrapper">
                  <img src={track.image} alt={track.title} />
                  {/* Playing indicator */}
                  {isCurrentTrack(track.id) && isPlaying && (
                    <div className="playing-indicator">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  )}
                  <button
                    className="card-play-btn"
                    onClick={(e) => handlePlayClick(track, e)}
                    aria-label={
                      showPauseButton(track.id)
                        ? "Pause"
                        : `Play ${track.title}`
                    }
                  >
                    {showPauseButton(track.id) ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
                <div className="card-info">
                  <h3 className="card-title">{track.title}</h3>
                  <p className="card-subtitle">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default MainContent;