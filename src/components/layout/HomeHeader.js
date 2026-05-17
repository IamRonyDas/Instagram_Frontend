import { Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import './HomeHeader.css';

function HomeHeader({ onSearchFocus }) {
  const { currentUser } = useAppData();

  return (
    <header className="home-header">
      <Link to="/profile" className="home-header__avatar-link" aria-label="Go to profile">
        <img
          src={currentUser?.avatarUrl}
          alt="Your profile"
          className="home-header__avatar"
          loading="lazy"
        />
      </Link>

      <div className="home-header__search-wrap">
        <span className="home-header__search-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3-3" />
          </svg>
        </span>
        <input
          type="search"
          className="home-header__search"
          placeholder="Search users or hashtags"
          onFocus={onSearchFocus}
          readOnly={Boolean(onSearchFocus)}
        />
      </div>

      <Link to="/add-post" className="home-header__add-btn" aria-label="Add post">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </Link>
    </header>
  );
}

export default HomeHeader;
