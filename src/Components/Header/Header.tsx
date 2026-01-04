import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoNotificationsOutline, IoMenu } from "react-icons/io5";
import { BsSpotify } from "react-icons/bs";
import ThemeToggle from "./ThemeToggle";
import Tooltip from "../Tooltip/Tooltip";
import "./Header.css";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handle back navigation
  const handleGoBack = () => {
    window.history.back();
  };

  // Handle forward navigation
  const handleGoForward = () => {
    window.history.forward();
  };

  // Handle home click
  const handleHomeClick = () => {
    navigate("/");
  };

  // Handle Spotify logo click
  const handleLogoClick = () => {
    navigate("/");
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search input focus - navigate to search page
  const handleSearchFocus = () => {
    navigate("/search");
  };

  // Handle browse click
  const handleBrowseClick = () => {
    console.log("Open browse/library view");
    navigate("/search");
  };

  // Handle explore premium click
  const handleExplorePremium = () => {
    window.open("https://www.spotify.com/premium/", "_blank");
  };

  // Handle notifications click
  const handleNotificationsClick = () => {
    console.log("Open notifications panel");
  };

  // Handle profile click
  const handleProfileClick = () => {
    console.log("Open profile menu");
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* Mobile Menu Button */}
        {onMenuClick && (
          <Tooltip content="Menu">
            <button
              className="mobile-menu-btn"
              onClick={onMenuClick}
              aria-label="Open menu"
            >
              <IoMenu size={24} />
            </button>
          </Tooltip>
        )}

        <Tooltip content="Spotify">
          <div
            className="header-left-logo"
            onClick={handleLogoClick}
          >
            <BsSpotify size={32} />
          </div>
        </Tooltip>

        {/* Navigation Buttons - Hidden on mobile */}
        <div className="header-nav-buttons">
          <Tooltip content="Go back">
            <div
              className="header-back-icon"
              onClick={handleGoBack}
            >
              <IoIosArrowBack size={29} />
            </div>
          </Tooltip>

          <Tooltip content="Go forward">
            <div
              className="header-forward-icon"
              onClick={handleGoForward}
            >
              <IoIosArrowForward size={29} />
            </div>
          </Tooltip>
        </div>

        {/* Home Button - Hidden on small mobile */}
        <Tooltip content="Home">
          <div
            className="header-home-icon"
            onClick={handleHomeClick}
          >
            <AiFillHome size={24} />
          </div>
        </Tooltip>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="header-search-form">
          <span className="header-search-icon">
            <Tooltip content="Search">
              <CiSearch size={26} />
            </Tooltip>
          </span>

          <input
            type="text"
            placeholder="What do you want to play?"
            className="header-input"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          />

          <span className="header-divider"></span>

          <Tooltip content="Browse">
            <span
              className="header-browse-icon"
              onClick={handleBrowseClick}
            >
              <MdOutlineLibraryBooks size={25} />
            </span>
          </Tooltip>
        </form>
      </div>

      <div className="header-right">
        {/* Explore Premium Button - Hidden on mobile */}
        <Tooltip content="Upgrade to Premium">
          <button
            className="header-explore-btn"
            onClick={handleExplorePremium}
          >
            Explore Premium
          </button>
        </Tooltip>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Bell - Hidden on small mobile */}
        <Tooltip content="What's New">
          <div
            className="header-bell-icon"
            onClick={handleNotificationsClick}
          >
            <IoNotificationsOutline size={20} />
          </div>
        </Tooltip>

        {/* Profile Avatar */}
        <Tooltip content="Tizkid">
          <div
            className="header-profile"
            onClick={handleProfileClick}
          >
            T
          </div>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;