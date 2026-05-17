import { NavLink } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import './BottomNav.css';

function BottomNav() {
  const { unreadBadge } = useAppData();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`
        }
      >
        Posts
      </NavLink>
      <NavLink
        to="/trending"
        className={({ isActive }) =>
          `bottom-nav__item bottom-nav__item--icon${isActive ? ' bottom-nav__item--active' : ''}`
        }
      >
        <span className="bottom-nav__fire" aria-hidden="true">🔥</span>
        Trending
      </NavLink>
      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          `bottom-nav__item bottom-nav__item--badge-wrap${isActive ? ' bottom-nav__item--active' : ''}`
        }
      >
        <span className="bottom-nav__label">
          Notification
          {unreadBadge && (
            <span className="bottom-nav__badge" aria-label={`${unreadBadge} unread notifications`}>
              {unreadBadge}
            </span>
          )}
        </span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
