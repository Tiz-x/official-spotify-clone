import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiLibrary } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { FaArrowRight, FaHeart, FaPlay, FaPause } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { BsSortDown, BsPinFill } from "react-icons/bs";
import { usePlayer } from "../../hooks/usePlayer";
import type { Track } from "../../context/PlayerContext";
import lildreeay from "../../Assets/images/thumbnail/lil.jpg";
import seyi from "../../Assets/images/thumbnail/1001424072.png";
import Jolie from "../../Assets/images/thumbnail/1001424040.png";
import dj from "../../Assets/images/thumbnail/1001424100.png";
import wiz from "../../Assets/images/thumbnail/1001424024.png";
import BurnaBoy from "../../Assets/images/thumbnail/burna.jpg";
import "./Sidebar.css";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "playlists" | "artists" | "albums"
  >("playlists");
  const [sortBy, setSortBy] = useState<"recents" | "name" | "creator">(
    "recents"
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const { 
    playTrackList, 
    togglePlayPause, 
    currentTrack, 
    isPlaying,
    likedSongs,
    queue
  } = usePlayer();

  // Helper functions
  const isCurrentTrack = (trackId: string) => currentTrack?.id === trackId;
  const showPauseButton = (trackId: string) =>
    isCurrentTrack(trackId) && isPlaying;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Library items data - ALL tracks in the sidebar
  const allTracks: Track[] = [
    {
      id: "lil-dreeay-1",
      title: "BAND4BAND",
      artist: "Lil Baby",
      audioUrl: "/audio/nigerian/lilbaby/lilbaby_BAND4BAND(128k).mp3",
      image: lildreeay,
      album: "Top Songs",
    },
    {
      id: "seyi-vibez-1",
      title: "Migos",
      artist: "Seyi Vibez",
      audioUrl: "/audio/nigerian/seyivibez/SeyiVibez_Migos__Official_Audio_(128k).mp3",
      image: seyi,
      album: "Top Songs",
    },
    {
      id: "jolie",
      title: "Jolie",
      artist: "Khaid",
      audioUrl: "/audio/nigerian/khaid/khaid_jolie.mp3",
      image: Jolie,
      album: "Jolie - Single",
    },
    {
      id: "dj-khaled-1",
      title: "God Did",
      artist: "DJ Khaled",
      audioUrl: "/audio/nigerian/DjKhaleed/DjKhaleed_GOD_DID(128k).mp3",
      image: dj,
      album: "Top Songs",
    },
    {
      id: "wizkid-1",
      title: "Kese",
      artist: "Wizkid",
      audioUrl: "/audio/nigerian/wizkid/Wizkid_Kese__Dance_(128k).mp3",
      image: wiz,
      album: "Top Songs",
    },
    {
      id: "burna-boy-1",
      title: "Time Flies",
      artist: "Burna Boy",
      audioUrl: "/audio/nigerian/BurnaBoy/Burna_Boy_Time_Flies.mp3",
      image: BurnaBoy,
      album: "Top Songs",
    },
  ];

  // Handle play button click
  const handlePlayClick = (track: Track, trackIndex: number, event: React.MouseEvent) => {
    event.stopPropagation();

    if (isCurrentTrack(track.id)) {
      togglePlayPause();
    } else {
      console.log('Playing track from sidebar, setting up queue with all tracks');
      playTrackList(allTracks, trackIndex);
    }
  };

  // Handle library item click (entire card)
  const handleLibraryItemClick = (track: Track, trackIndex: number) => {
    if (isCurrentTrack(track.id)) {
      togglePlayPause();
    } else {
      console.log('Playing track from sidebar card, setting up queue with all tracks');
      playTrackList(allTracks, trackIndex);
    }
  };

  // Handle create playlist/folder
  const handleCreatePlaylist = () => {
    console.log("Create playlist or folder");
  };

  // Handle search
  const handleSearch = () => {
    console.log("Open search in library");
  };

  // Cycle through sort options
  const handleSort = () => {
    const sortOptions: Array<"recents" | "name" | "creator"> = [
      "recents",
      "name",
      "creator",
    ];
    const currentIndex = sortOptions.indexOf(sortBy);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    setSortBy(sortOptions[nextIndex]);
    console.log(`Sorting by: ${sortOptions[nextIndex]}`);
  };

  // Library items for display
  const libraryItems = [
    {
      id: "liked-songs",
      name: "Liked Songs",
      subtitle: `Playlist • ${likedSongs.length} song${likedSongs.length > 1 ? 's' : ''}`,
      image: null,
      type: "playlist",
      isPinned: true,
    },
    {
      id: "lil-dreeay",
      name: "Lil Baby",
      subtitle: "Artist",
      image: lildreeay,
      type: "artist",
      trackIndex: 0,
    },
    {
      id: "seyi-vibez",
      name: "Seyi Vibez",
      subtitle: "Artist",
      image: seyi,
      type: "artist",
      trackIndex: 1,
    },
    {
      id: "jolie",
      name: "Jolie",
      subtitle: "Single • Khaid",
      image: Jolie,
      type: "single",
      trackIndex: 2,
    },
    {
      id: "dj-khaled",
      name: "DJ Khaled",
      subtitle: "Artist",
      image: dj,
      type: "artist",
      trackIndex: 3,
    },
    {
      id: "wizkid",
      name: "Wizkid",
      subtitle: "Artist",
      image: wiz,
      type: "artist",
      trackIndex: 4,
    },
    {
      id: "burna-boy",
      name: "Burna Boy",
      subtitle: "Artist",
      image: BurnaBoy,
      type: "artist",
      trackIndex: 5,
    },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-header">
        <div
          className="library-title"
          title={isCollapsed ? "Expand Your Library" : "Collapse Your Library"}
          onClick={toggleSidebar}
        >
          <BiLibrary size={24} />
          {!isCollapsed && <span>Your Library</span>}
        </div>

        {!isCollapsed && (
          <div className="header-actions">
            <button
              className="action-btn"
              title="Create playlist or folder"
              onClick={handleCreatePlaylist}
              aria-label="Create playlist or folder"
            >
              <FiPlus size={16} />
            </button>

            <button
              className="action-btn collapse-btn"
              title="Collapse Your Library"
              onClick={toggleSidebar}
              aria-label="Collapse Your Library"
            >
              <FaArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <>
          <div className="sidebar-tabs">
            <button
              className={`tab-btn ${activeTab === "playlists" ? "active" : ""}`}
              onClick={() => setActiveTab("playlists")}
            >
              Playlists
            </button>
            <button
              className={`tab-btn ${activeTab === "artists" ? "active" : ""}`}
              onClick={() => setActiveTab("artists")}
            >
              Artists
            </button>
            <button
              className={`tab-btn ${activeTab === "albums" ? "active" : ""}`}
              onClick={() => setActiveTab("albums")}
            >
              Albums
            </button>
          </div>

          <div className="sidebar-controls">
            <button
              className="control-btn search-btn"
              title="Search in Your Library"
              onClick={handleSearch}
              aria-label="Search in Your Library"
            >
              <CiSearch size={16} />
            </button>

            <button
              className="control-btn sort-btn"
              title={`Sort by: ${sortBy}`}
              onClick={handleSort}
              aria-label={`Sort by ${sortBy}`}
            >
              <span className="sort-label">
                {sortBy === "recents" && "Recents"}
                {sortBy === "name" && "Name"}
                {sortBy === "creator" && "Creator"}
              </span>
              <BsSortDown size={16} />
            </button>
          </div>
        </>
      )}

      <div className="library-items">
        {libraryItems.map((item) => {
          // Special handling for Liked Songs
          if (item.id === "liked-songs") {
            return (
              <div
                key={item.id}
                className="library-item"
                title="Liked Songs"
                onClick={() => {
                  navigate('/liked');
                  onClose?.(); // Close sidebar on mobile after navigation
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="item-image-container">
                  <div className="item-image">
                    <div className="liked-songs-icon">
                      <FaHeart size={24} />
                    </div>
                  </div>
                </div>

                {!isCollapsed && (
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-subtitle">
                      {item.isPinned && (
                        <BsPinFill size={12} className="pin-icon" />
                      )}
                      <span>{item.subtitle}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          // Regular track items
          const trackIndex = item.trackIndex ?? 0;
          const track = allTracks[trackIndex];
          const isHovered = hoveredItem === item.id;
          const isCurrentlyPlaying = isCurrentTrack(track.id);

          return (
            <div
              key={item.id}
              className={`library-item ${isCurrentlyPlaying ? "playing" : ""}`}
              title={item.name}
              onClick={() => handleLibraryItemClick(track, trackIndex)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="item-image-container">
                <div
                  className={`item-image ${
                    item.type === "artist" ? "artist-image" : ""
                  }`}
                >
                  {item.image && <img src={item.image} alt={item.name} />}
                  
                  {/* Play/Pause Button Overlay */}
                  {(isHovered || isCurrentlyPlaying) && (
                    <div className="play-button-overlay">
                      <button
                        className="play-button"
                        title={showPauseButton(track.id) ? "Pause" : "Play"}
                        onClick={(e) => handlePlayClick(track, trackIndex, e)}
                        aria-label={
                          showPauseButton(track.id)
                            ? `Pause ${item.name}`
                            : `Play ${item.name}`
                        }
                      >
                        {showPauseButton(track.id) ? (
                          <FaPause size={12} />
                        ) : (
                          <FaPlay size={12} style={{ marginLeft: '1px' }} />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Playing Indicator */}
                  {isCurrentlyPlaying && isPlaying && (
                    <div className="playing-indicator">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  )}
                </div>
              </div>

              {!isCollapsed && (
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-subtitle">
                    {item.isPinned && (
                      <BsPinFill size={12} className="pin-icon" />
                    )}
                    <span>{item.subtitle}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;