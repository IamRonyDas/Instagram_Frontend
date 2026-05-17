import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import BottomNav from '../components/layout/BottomNav';
import { mockNotifications, notificationSections } from '../data/mockNotifications';
import { getUser } from '../data/mockUsers';
import { useAppData } from '../context/AppDataContext';
import './Notifications.css';

function NotificationItem({ notification }) {
  const user = getUser(notification.username);
  const { toggleFollow, isFollowing } = useAppData();
  const following = isFollowing(notification.username);

  return (
    <div className={`notification-item${notification.isNew ? ' notification-item--new' : ''}`}>
      <Link to={`/profile/${notification.username}`} className="notification-item__avatar-link">
        <img
          src={user?.avatarUrl || 'https://i.pravatar.cc/150?img=1'}
          alt={notification.username}
          className="notification-item__avatar"
        />
      </Link>
      <div className="notification-item__content">
        <p className="notification-item__text">
          <Link to={`/profile/${notification.username}`} className="notification-item__user">
            {notification.username}
          </Link>{' '}
          {notification.message}
          <span className="notification-item__time"> {notification.time}</span>
        </p>
        {notification.showFollowBack && (
          <button
            type="button"
            className={`notification-item__follow-btn${following ? ' notification-item__follow-btn--active' : ''}`}
            onClick={() => toggleFollow(notification.username)}
          >
            {following ? 'Following' : 'Follow back'}
          </button>
        )}
      </div>
      {notification.postThumbnail && (
        <Link to="/" className="notification-item__thumb-link">
          <img
            src={notification.postThumbnail}
            alt=""
            className="notification-item__thumb"
          />
        </Link>
      )}
    </div>
  );
}

function Notifications() {
  const [notifications] = useState(mockNotifications);

  return (
    <div className="notifications-page">
      <PageHeader title="Notifications" backTo="/" />

      <div className="notifications-page__list">
        {notificationSections.map((section) => {
          const items = notifications.filter(section.filter);
          if (items.length === 0) return null;
          return (
            <section key={section.label}>
              <h2 className="notifications-page__section-label">{section.label}</h2>
              {items.map((n) => (
                <NotificationItem key={n.id} notification={n} />
              ))}
            </section>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}

export default Notifications;
