import { HiOutlineQueueList } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import "./NowPlayingToggle.css";

interface NowPlayingToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const NowPlayingToggle = ({ isOpen, onClick }: NowPlayingToggleProps) => {
  return (
    <button
      className={`now-playing-toggle ${isOpen ? "open" : ""}`}
      onClick={onClick}
      aria-label={isOpen ? "Close Now Playing" : "Open Now Playing"}
      title={isOpen ? "Close Now Playing" : "Open Now Playing"}
    >
      {isOpen ? (
        <IoClose size={24} />
      ) : (
        <HiOutlineQueueList size={24} />
      )}
    </button>
  );
};

export default NowPlayingToggle;