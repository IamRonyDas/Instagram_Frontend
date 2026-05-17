import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import { useAppData } from '../context/AppDataContext';
import { CURRENT_USER_USERNAME, formatCount, getUser } from '../data/mockUsers';
import { getProfileGrid } from '../data/mockPosts';
import './Profile.css';

function Profile() {
  const { username: paramUsername } = useParams();
  const navigate = useNavigate();
  const { isFollowing, toggleFollow } = useAppData();

  const username = paramUsername || CURRENT_USER_USERNAME;
  const user = getUser(username);
  const isOwn = username === CURRENT_USER_USERNAME;
  const following = isFollowing(username);
  const [activeTab, setActiveTab] = useState('posts');

  if (!user) {
    return (
      <div className="profile-page">
        <PageHeader title="Profile" backTo="/" />
        <p className="profile-page__not-found">User not found.</p>
      </div>
    );
  }

  const gridPosts = getProfileGrid(username);

  const handleFollowingTab = () => {
    if (isOwn) navigate('/following');
    else navigate(`/profile/${username}/following`);
  };

  return (
    <div className="profile-page">
      <PageHeader
        title={user.username}
        backTo={isOwn ? '/' : '/'}
      />

      <section className="profile-page__top">
        <img src={user.avatarUrl} alt={user.fullName} className="profile-page__avatar" />
        <div className="profile-page__stats">
          <div className="profile-page__stat">
            <strong>{formatCount(user.postsCount)}</strong>
            <span>posts</span>
          </div>
          <div className="profile-page__stat">
            <strong>{formatCount(user.followersCount)}</strong>
            <span>followers</span>
          </div>
          <button
            type="button"
            className="profile-page__stat profile-page__stat--btn"
            onClick={handleFollowingTab}
          >
            <strong>{formatCount(user.followingCount)}</strong>
            <span>following</span>
          </button>
        </div>
      </section>

      <section className="profile-page__meta">
        <h1 className="profile-page__username">
          {user.username}
          {user.isVerified && <span className="profile-page__verified"> ✓</span>}
        </h1>
        <p className="profile-page__name">{user.fullName}</p>
        {user.bio && <p className="profile-page__bio">{user.bio}</p>}
      </section>

      <section className="profile-page__actions">
        {isOwn ? (
          <>
            <button type="button" className="profile-page__btn">Edit profile</button>
            <button type="button" className="profile-page__btn">Share profile</button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={`profile-page__btn${following ? '' : ' profile-page__btn--primary'}`}
              onClick={() => toggleFollow(username)}
            >
              {following ? 'Following' : 'Follow'}
            </button>
            <button type="button" className="profile-page__btn">Message</button>
          </>
        )}
      </section>

      <nav className="profile-page__tabs" aria-label="Profile sections">
        <button
          type="button"
          className={`profile-page__tab${activeTab === 'posts' ? ' profile-page__tab--active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        </button>
        <button
          type="button"
          className={`profile-page__tab${activeTab === 'following' ? ' profile-page__tab--active' : ''}`}
          onClick={handleFollowingTab}
        >
          Following
        </button>
      </nav>

      {activeTab === 'posts' && (
        <div className="profile-page__grid">
          {gridPosts.map((post) => (
            <div key={post.id} className="profile-page__grid-item">
              <img src={post.imageUrl} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
