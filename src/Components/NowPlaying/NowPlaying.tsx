import { useState, useEffect, useMemo } from "react";
import { IoChevronForward } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { FiMusic } from "react-icons/fi";
import { usePlayer } from "../../hooks/usePlayer";
import Tooltip from "../Tooltip/Tooltip";
// Import artist images
import LilDreeay from "../../Assets/images/Spotify-sidebar-image/lil dreeay.jpeg";
import SeyiVibez from "../../Assets/images/Spotify-sidebar-image/seyi.jpeg";
import Jolie from "../../Assets/images/Spotify-sidebar-image/khaid.jpeg";
import DjKhaled from "../../Assets/images/Spotify-sidebar-image/dj khaleed.jpeg";
import Wizkid from "../../Assets/images/Spotify-sidebar-image/wizkid.jpeg";
import BurnaBoy from "../../Assets/images/Spotify-sidebar-image/burna.jpeg";
import "./NowPlaying.css";

interface NowPlayingProps {
  isOpen: boolean;
  onClose: () => void;
}

// Artist database with actual imported images
const artistDatabase: Record<
  string,
  {
    banner: string;
    description: string;
    monthlyListeners: string;
    credits: Array<{ id: string; name: string; role: string }>;
  }
> = {
  "Lil Dreeay": {
    banner: LilDreeay,
    description:
      "Princewill Nnamaka Sunday is a multi-genre Nigerian artist professionally known as Lil Dreeay waves as a rapper, singer and songwriter. Best known for his unique sound blending Afrobeats with modern hip-hop.",
    monthlyListeners: "9 monthly listeners",
    credits: [
      { id: "lil-dreeay", name: "Lil Dreeay", role: "Main Artist" },
      { id: "pearl-debbie", name: "Pearl Debbie", role: "Featured Artist" },
      { id: "princewill", name: "Princewill Nnamaka Sunday", role: "Composer" },
    ],
  },
  "Seyi Vibez": {
    banner: SeyiVibez,
    description:
      "Balogun Afolabi Oluwaloseyi, known professionally as Seyi Vibez, is a Nigerian singer and songwriter. He is best known for his unique blend of Afrobeats and street-hop, creating a signature sound that resonates with fans across Nigeria.",
    monthlyListeners: "2.5M monthly listeners",
    credits: [
      { id: "seyi-vibez", name: "Seyi Vibez", role: "Main Artist" },
      { id: "rexxie", name: "Rexxie", role: "Producer" },
      { id: "balogun", name: "Balogun Afolabi", role: "Composer" },
    ],
  },
  "DJ Khaled": {
    banner: DjKhaled,
    description:
      "Khaled Mohammed Khaled, known professionally as DJ Khaled, is an American DJ, record executive, and record producer. He is known for his hit singles featuring various artists and his catchphrases 'Another one' and 'We the Best'.",
    monthlyListeners: "28.5M monthly listeners",
    credits: [
      { id: "dj-khaled", name: "DJ Khaled", role: "Main Artist" },
      {
        id: "khaled-mohammed",
        name: "Khaled Mohammed Khaled",
        role: "Producer",
      },
    ],
  },
  Wizkid: {
    banner: Wizkid,
    description:
      "Ayodeji Ibrahim Balogun, known professionally as Wizkid, is a Nigerian singer and songwriter. He is one of Africa's biggest music stars and is credited with bringing Afrobeats to the global stage.",
    monthlyListeners: "37.2M monthly listeners",
    credits: [
      { id: "wizkid", name: "Wizkid", role: "Main Artist" },
      {
        id: "ayodeji-balogun",
        name: "Ayodeji Ibrahim Balogun",
        role: "Composer",
      },
      { id: "p2j", name: "P2J", role: "Producer" },
    ],
  },
  "Burna Boy": {
    banner: BurnaBoy,
    description:
      "Damini Ebunoluwa Ogulu, known professionally as Burna Boy, is a Nigerian singer, songwriter and record producer. He rose to prominence in 2012 with 'Like to Party' and has won multiple awards including a Grammy Award for Best Global Music Album.",
    monthlyListeners: "41.8M monthly listeners",
    credits: [
      { id: "burna-boy", name: "Burna Boy", role: "Main Artist" },
      { id: "damini-ogulu", name: "Damini Ebunoluwa Ogulu", role: "Composer" },
      { id: "leriq", name: "LeriQ", role: "Producer" },
    ],
  },
  Khaid: {
    banner: Jolie,
    description:
      "Sulaimon Shekoni Solomon, known professionally as Khaid, is a Nigerian singer and songwriter. He gained widespread recognition with his hit single 'Jolie' and is known for his melodious Afrobeats sound.",
    monthlyListeners: "1.2M monthly listeners",
    credits: [
      { id: "khaid", name: "Khaid", role: "Main Artist" },
      { id: "sulaimon", name: "Sulaimon Shekoni Solomon", role: "Composer" },
    ],
  },
  Jolie: {
    banner: Jolie,
    description:
      "A melodious Afrobeats track by Khaid that gained widespread recognition across Nigeria and beyond.",
    monthlyListeners: "1.2M monthly listeners",
    credits: [
      { id: "khaid", name: "Khaid", role: "Main Artist" },
      { id: "sulaimon", name: "Sulaimon Shekoni Solomon", role: "Composer" },
    ],
  },
};

const NowPlaying = ({ isOpen, onClose }: NowPlayingProps) => {
  const [isFollowingArtist, setIsFollowingArtist] = useState(false);
  const [followedCredits, setFollowedCredits] = useState<Set<string>>(
    new Set()
  );

  const { currentTrack, queue, playNext } = usePlayer();

  // Get artist info from database, fallback to current track image
  const artistInfo = useMemo(() => {
    if (!currentTrack?.artist) return null;

    const dbInfo = artistDatabase[currentTrack.artist];

    // If not in database, create generic info using current track data
    if (!dbInfo) {
      return {
        banner: currentTrack.image || "",
        description: `${currentTrack.artist} is a talented artist. Explore their music and discover their unique sound.`,
        monthlyListeners: "Listeners data unavailable",
        credits: [
          {
            id: currentTrack.artist.toLowerCase().replace(/\s+/g, "-"),
            name: currentTrack.artist,
            role: "Main Artist",
          },
        ],
      };
    }

    return {
      ...dbInfo,
      banner: dbInfo.banner || currentTrack.image || "", // Use track image as fallback
    };
  }, [currentTrack]);

  // Reset following state when track changes
  useEffect(() => {
    setIsFollowingArtist(false);
    setFollowedCredits(new Set());
  }, [currentTrack?.id]);

  // Don't render if no track is playing
  if (!currentTrack) {
    return (
      <aside className={`now-playing ${isOpen ? "mobile-open" : ""}`}>
        <div className="now-playing-header">
          <div className="header-left">
            <Tooltip content="Collapse Now Playing">
              <button
                className="collapse-btn"
                onClick={onClose}
                aria-label="Collapse Now Playing"
              >
                <IoChevronForward size={20} />
              </button>
            </Tooltip>
            <h3 className="now-playing-title">Now Playing</h3>
          </div>
        </div>
        <div className="now-playing-content">
          <div className="now-playing-empty">
            <FiMusic size={64} />
            <p>No track playing</p>
            <span>Play a song to see details here</span>
          </div>
        </div>
      </aside>
    );
  }

  // Get next track from queue
  const nextInQueue = queue.length > 0 ? queue[0] : null;

  // Handle follow artist
  const handleFollowArtist = () => {
    setIsFollowingArtist(!isFollowingArtist);
    console.log(
      `${isFollowingArtist ? "Unfollowed" : "Followed"} ${currentTrack.artist}`
    );
  };

  // Handle follow credit
  const handleFollowCredit = (creditId: string, creditName: string) => {
    const newFollowed = new Set(followedCredits);
    if (newFollowed.has(creditId)) {
      newFollowed.delete(creditId);
      console.log(`Unfollowed ${creditName}`);
    } else {
      newFollowed.add(creditId);
      console.log(`Followed ${creditName}`);
    }
    setFollowedCredits(newFollowed);
  };

  return (
    <aside className={`now-playing ${isOpen ? "mobile-open" : ""}`}>
      {/* Header */}
      <div className="now-playing-header">
        <div className="header-left">
          <Tooltip content="Collapse">
            <button
              className="collapse-btn"
              onClick={onClose}
              aria-label="Collapse Now Playing"
            >
              <IoChevronForward size={20} />
            </button>
          </Tooltip>
          <Tooltip content={`Go to ${currentTrack.artist}`}>
            <h3
              className="now-playing-title"
              onClick={() => console.log(`Navigate to ${currentTrack.artist}`)}
            >
              {currentTrack.artist}
            </h3>
          </Tooltip>
        </div>
        <Tooltip content={`More options for ${currentTrack.artist}`}>
          <button
            className="more-options-header-btn"
            onClick={() => console.log(`More options for ${currentTrack.artist}`)}
            aria-label="More options"
          >
            <BsThreeDots size={20} />
          </button>
        </Tooltip>
      </div>

      {/* Scrollable Content */}
      <div className="now-playing-content">
        {/* Album Art / Track Image */}
        <Tooltip content="Go to song link">
          <div
            className="track-image-wrapper"
            onClick={() => console.log(`Navigate to ${currentTrack.title}`)}
          >
            {currentTrack.image ? (
              <img
                src={currentTrack.image}
                alt={currentTrack.title}
                className="track-image"
              />
            ) : (
              <div className="track-image-placeholder">
                <FiMusic size={64} />
              </div>
            )}
          </div>
        </Tooltip>

        {/* Track Info */}
        <div className="track-info">
          <Tooltip content="Go to song link">
            <h2
              className="track-title"
              onClick={() => console.log(`Navigate to ${currentTrack.title}`)}
            >
              {currentTrack.title}
            </h2>
          </Tooltip>
          <Tooltip content={`Go to ${currentTrack.artist}`}>
            <p
              className="track-artist"
              onClick={() => console.log(`Navigate to ${currentTrack.artist}`)}
            >
              {currentTrack.artist}
            </p>
          </Tooltip>
        </div>

        {/* About the Artist Section */}
        {artistInfo && (
          <section className="artist-section">
            <h3 className="section-heading">About the artist</h3>

            {/* Artist Banner */}
            {artistInfo.banner && (
              <Tooltip content={`Go to ${currentTrack.artist}`}>
                <div
                  className="artist-banner"
                  onClick={() =>
                    console.log(`Navigate to ${currentTrack.artist}`)
                  }
                >
                  <img src={artistInfo.banner} alt={currentTrack.artist} />
                  <div className="artist-banner-overlay">
                    <h4 className="artist-name">{currentTrack.artist}</h4>
                    <p className="artist-listeners">
                      {artistInfo.monthlyListeners}
                    </p>
                  </div>
                </div>
              </Tooltip>
            )}

            {/* Artist Description */}
            <p className="artist-description">{artistInfo.description}</p>

            {/* Follow Button */}
            <Tooltip content={isFollowingArtist ? `Unfollow ${currentTrack.artist}` : `Follow ${currentTrack.artist}`}>
              <button
                className={`follow-btn ${isFollowingArtist ? "following" : ""}`}
                onClick={handleFollowArtist}
              >
                {isFollowingArtist ? "Following" : "Follow"}
              </button>
            </Tooltip>
          </section>
        )}

        {/* Credits Section */}
        {artistInfo && artistInfo.credits && artistInfo.credits.length > 0 && (
          <section className="credits-section">
            <div className="section-header">
              <h3 className="section-heading">Credits</h3>
              <Tooltip content="Show all credits">
                <button
                  className="show-all-btn"
                  onClick={() => console.log("Show all credits")}
                >
                  Show all
                </button>
              </Tooltip>
            </div>

            <div className="credits-list">
              {artistInfo.credits.map((credit) => (
                <div className="credit-item" key={credit.id}>
                  <div className="credit-info">
                    <Tooltip content={`Go to ${credit.name}`}>
                      <p
                        className="credit-name"
                        onClick={() => console.log(`Navigate to ${credit.name}`)}
                      >
                        {credit.name}
                      </p>
                    </Tooltip>
                    <p className="credit-role">{credit.role}</p>
                  </div>
                  <Tooltip content={followedCredits.has(credit.id) ? `Unfollow ${credit.name}` : `Follow ${credit.name}`}>
                    <button
                      className={`follow-btn-small ${
                        followedCredits.has(credit.id) ? "following" : ""
                      }`}
                      onClick={() => handleFollowCredit(credit.id, credit.name)}
                    >
                      {followedCredits.has(credit.id) ? "Following" : "Follow"}
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next in Queue Section */}
        <section className="queue-section">
          <div className="section-header">
            <h3 className="section-heading">Next in queue</h3>
            <Tooltip content="Open queue">
              <button
                className="open-queue-btn"
                onClick={() => console.log("Open queue")}
              >
                Open queue
              </button>
            </Tooltip>
          </div>

          {nextInQueue ? (
            <div
              className="queue-item"
              onClick={() => {
                console.log(`Play next: ${nextInQueue.title}`);
                playNext();
              }}
            >
              {nextInQueue.image ? (
                <img
                  src={nextInQueue.image}
                  alt={nextInQueue.title}
                  className="queue-item-image"
                />
              ) : (
                <div className="queue-item-placeholder">
                  <FiMusic size={20} />
                </div>
              )}
              <div className="queue-item-info">
                <p className="queue-item-title">{nextInQueue.title}</p>
                <p className="queue-item-artist">{nextInQueue.artist}</p>
              </div>
              <Tooltip content={`More options for ${nextInQueue.title}`}>
                <button
                  className="more-options-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`More options for ${nextInQueue.title}`);
                  }}
                  aria-label="More options"
                >
                  <BsThreeDots size={20} />
                </button>
              </Tooltip>
            </div>
          ) : (
            <div className="queue-empty">
              <FiMusic size={32} />
              <p>Queue is empty</p>
              <span>Add songs to your queue</span>
            </div>
          )}
        </section>
      </div>
    </aside>
  );
};

export default NowPlaying;