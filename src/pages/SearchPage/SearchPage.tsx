// src/pages/SearchPage/SearchPage.tsx
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import { usePlayer } from "../../hooks/usePlayer";
import type { Track } from "../../context/PlayerContext";
import { NIGERIAN_TRACKS } from "../../Data/nigerianTracks";
import "./SearchPage.css";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState<
    "all" | "tracks" | "artists" | "albums" | "playlists"
  >("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { playTrack, togglePlayPause, currentTrack, isPlaying } = usePlayer();

  // Search through tracks
  const searchTracks = (searchQuery: string): Track[] => {
    if (!searchQuery.trim()) return [];

    const lowerQuery = searchQuery.toLowerCase();
    return NIGERIAN_TRACKS.filter(
      (track) =>
        track.title.toLowerCase().includes(lowerQuery) ||
        track.artist.toLowerCase().includes(lowerQuery) ||
        track.album?.toLowerCase().includes(lowerQuery)
    );
  };

  // Get unique artists from search results
  const getUniqueArtists = (tracks: Track[]) => {
    const artistMap = new Map();
    tracks.forEach((track) => {
      if (!artistMap.has(track.artist)) {
        artistMap.set(track.artist, {
          name: track.artist,
          image: track.image,
          tracks: tracks.filter((t) => t.artist === track.artist),
        });
      }
    });
    return Array.from(artistMap.values());
  };

  // Get search results
  const searchResults = searchTracks(query);
  const artistResults = getUniqueArtists(searchResults);

  // Helper functions
  const isCurrentTrack = (trackId: string) => currentTrack?.id === trackId;
  const showPauseButton = (trackId: string) =>
    isCurrentTrack(trackId) && isPlaying;

  const handlePlayClick = (track: Track, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    if (isCurrentTrack(track.id)) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  };

  // Navigation handlers
  const handleArtistClick = (artistName: string) => {
    console.log(`Navigate to artist: ${artistName}`);
    // In a real app, you would navigate to: navigate(`/artist/${artistId}`);
  };

  const handleAlbumClick = (albumName: string, artistName: string) => {
    console.log(`Navigate to album: ${albumName} by ${artistName}`);
    // In a real app, you would navigate to: navigate(`/album/${albumId}`);
  };

  const handleTrackClick = (track: Track) => {
    console.log(`Navigate to track: ${track.title}`);
    // You can either play it or navigate to track page
    handlePlayClick(track);
  };

  const handleCategoryClick = (categoryTitle: string) => {
    console.log(`Navigate to category: ${categoryTitle}`);
    // In a real app: navigate(`/genre/${categoryId}`);
  };

  // No query - show browse categories
  if (!query) {
    return (
      <div className="search-page">
        <h1 className="search-heading">Search</h1>
        <h2 className="browse-heading">Browse all</h2>

        <div className="browse-grid">
          {[
            { title: "Afrobeats", color: "#1e3a8a", image: "🎵" },
            { title: "Afropop", color: "#7c3aed", image: "🎤" },
            { title: "Hip-Hop", color: "#dc2626", image: "🎧" },
            { title: "R&B", color: "#ea580c", image: "💫" },
            { title: "Nigerian Artists", color: "#16a34a", image: "🇳🇬" },
            { title: "Amapiano", color: "#ca8a04", image: "🔥" },
            { title: "Dancehall", color: "#0891b2", image: "💃" },
            { title: "Gospel", color: "#4f46e5", image: "🙏" },
            { title: "Reggae", color: "#059669", image: "🌴" },
            { title: "Highlife", color: "#d97706", image: "🎺" },
            { title: "Fuji", color: "#be123c", image: "🥁" },
            { title: "Juju", color: "#7c2d12", image: "🎸" },
          ].map((category, index) => (
            <div
              key={index}
              className="browse-card"
              style={{ backgroundColor: category.color }}
              onClick={() => handleCategoryClick(category.title)}
            >
              <h3 className="browse-card-title">{category.title}</h3>
              <div className="browse-card-icon">{category.image}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // No results
  if (searchResults.length === 0) {
    return (
      <div className="search-page">
        <div className="search-header">
          <h1 className="search-query">"{query}"</h1>
        </div>

        <div className="no-results">
          <p className="no-results-text">No results found for "{query}"</p>
          <p className="no-results-subtext">
            Please make sure your words are spelled correctly, or use fewer or
            different keywords.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-page">
      {/* Search Query Header */}
      <div className="search-header">
        <h1 className="search-query">"{query}"</h1>
      </div>

      {/* Tabs */}
      <div className="search-tabs">
        <button
          className={`search-tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button
          className={`search-tab ${activeTab === "tracks" ? "active" : ""}`}
          onClick={() => setActiveTab("tracks")}
        >
          Tracks
        </button>
        <button
          className={`search-tab ${activeTab === "artists" ? "active" : ""}`}
          onClick={() => setActiveTab("artists")}
        >
          Artists
        </button>
        <button
          className={`search-tab ${activeTab === "albums" ? "active" : ""}`}
          onClick={() => setActiveTab("albums")}
        >
          Albums
        </button>
        <button
          className={`search-tab ${activeTab === "playlists" ? "active" : ""}`}
          onClick={() => setActiveTab("playlists")}
        >
          Playlists
        </button>
      </div>

      {/* Results */}
      <div className="search-results">
        {/* Top Result */}
        {(activeTab === "all" || activeTab === "tracks") &&
          searchResults.length > 0 && (
            <section className="top-result-section">
              <h2 className="section-title">Top result</h2>
              <div
                className={`top-result-card ${
                  isCurrentTrack(searchResults[0].id) ? "playing" : ""
                }`}
                onClick={() => handleTrackClick(searchResults[0])}
                onMouseEnter={() => setHoveredCard("top-result")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <img
                  src={searchResults[0].image}
                  alt={searchResults[0].title}
                  className="top-result-image"
                />
                <h3 className="top-result-title">{searchResults[0].title}</h3>
                <p 
                  className="top-result-artist"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArtistClick(searchResults[0].artist);
                  }}
                >
                  {searchResults[0].artist}
                </p>
                <button
                  className="top-result-play-btn"
                  onClick={(e) => handlePlayClick(searchResults[0], e)}
                  aria-label={showPauseButton(searchResults[0].id) ? "Pause" : "Play"}
                >
                  {showPauseButton(searchResults[0].id) ? (
                    <FaPause />
                  ) : (
                    <FaPlay />
                  )}
                </button>
              </div>
            </section>
          )}

        {/* Tracks */}
        {(activeTab === "all" || activeTab === "tracks") && (
          <section className="tracks-section">
            <h2 className="section-title">Tracks</h2>
            <div className="tracks-list">
              {searchResults
                .slice(0, activeTab === "all" ? 4 : undefined)
                .map((track, index) => (
                  <div
                    key={track.id}
                    className={`track-row ${
                      isCurrentTrack(track.id) ? "playing" : ""
                    }`}
                    onClick={() => handleTrackClick(track)}
                    onMouseEnter={() => setHoveredCard(`track-${track.id}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="track-number">
                      {hoveredCard === `track-${track.id}` ||
                      isCurrentTrack(track.id) ? (
                        <button
                          className="track-play-icon"
                          onClick={(e) => handlePlayClick(track, e)}
                          aria-label={showPauseButton(track.id) ? "Pause" : "Play"}
                        >
                          {showPauseButton(track.id) ? (
                            <FaPause size={14} />
                          ) : (
                            <FaPlay size={14} />
                          )}
                        </button>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <img
                      src={track.image}
                      alt={track.title}
                      className="track-image"
                    />
                    <div className="track-info">
                      <div className="track-title">{track.title}</div>
                      <div 
                        className="track-artist"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArtistClick(track.artist);
                        }}
                      >
                        {track.artist}
                      </div>
                    </div>
                    <div 
                      className="track-album"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (track.album) {
                          handleAlbumClick(track.album, track.artist);
                        }
                      }}
                    >
                      {track.album || "Single"}
                    </div>
                    <div className="track-duration">
                      {Math.floor(track.duration / 60)}:
                      {String(Math.floor(track.duration % 60)).padStart(2, "0")}
                    </div>
                  </div>
                ))}
            </div>
            {activeTab === "all" && searchResults.length > 4 && (
              <button 
                className="see-all-btn"
                onClick={() => setActiveTab("tracks")}
              >
                See all tracks
              </button>
            )}
          </section>
        )}

        {/* Artists */}
        {(activeTab === "all" || activeTab === "artists") &&
          artistResults.length > 0 && (
            <section className="artists-section">
              <h2 className="section-title">Artists</h2>
              <div className="artists-grid">
                {artistResults
                  .slice(0, activeTab === "all" ? 6 : undefined)
                  .map((artist) => (
                    <div 
                      key={artist.name}
                      className="artist-card"
                      onClick={() => handleArtistClick(artist.name)}
                      onMouseEnter={() => setHoveredCard(`artist-${artist.name}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="artist-image-wrapper">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="artist-image"
                        />
                        {(hoveredCard === `artist-${artist.name}` ||
                          isCurrentTrack(artist.tracks[0]?.id)) && (
                          <button
                            className="artist-play-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayClick(artist.tracks[0]);
                            }}
                            aria-label={`Play ${artist.name}`}
                          >
                            {showPauseButton(artist.tracks[0]?.id) ? (
                              <FaPause />
                            ) : (
                              <FaPlay />
                            )}
                          </button>
                        )}
                      </div>
                      <h3 className="artist-name">{artist.name}</h3>
                      <p className="artist-type">Artist</p>
                    </div>
                  ))}
              </div>
              {activeTab === "all" && artistResults.length > 6 && (
                <button 
                  className="see-all-btn"
                  onClick={() => setActiveTab("artists")}
                >
                  See all artists
                </button>
              )}
            </section>
          )}

        {/* Albums */}
        {(activeTab === "all" || activeTab === "albums") && (
          <section className="albums-section">
            <h2 className="section-title">Albums</h2>
            <div className="albums-grid">
              {searchResults
                .filter(
                  (track, index, self) =>
                    track.album &&
                    self.findIndex((t) => t.album === track.album) === index
                )
                .slice(0, activeTab === "all" ? 6 : undefined)
                .map((track) => (
                  <div 
                    key={track.album}
                    className="album-card"
                    onClick={() => handleAlbumClick(track.album!, track.artist)}
                    onMouseEnter={() => setHoveredCard(`album-${track.album}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="album-image-wrapper">
                      <img
                        src={track.image}
                        alt={track.album}
                        className="album-image"
                      />
                      {(hoveredCard === `album-${track.album}` ||
                        isCurrentTrack(track.id)) && (
                        <button
                          className="album-play-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayClick(track);
                          }}
                          aria-label={`Play ${track.album}`}
                        >
                          {showPauseButton(track.id) ? (
                            <FaPause />
                          ) : (
                            <FaPlay />
                          )}
                        </button>
                      )}
                    </div>
                    <h3 className="album-name">{track.album}</h3>
                    <p 
                      className="album-artist"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArtistClick(track.artist);
                      }}
                    >
                      {track.artist}
                    </p>
                  </div>
                ))}
            </div>
            {activeTab === "all" &&
              searchResults.filter(
                (track, index, self) =>
                  track.album &&
                  self.findIndex((t) => t.album === track.album) === index
              ).length > 6 && (
                <button 
                  className="see-all-btn"
                  onClick={() => setActiveTab("albums")}
                >
                  See all albums
                </button>
              )}
          </section>
        )}
      </div>
    </div>
  );
};

export default SearchPage;