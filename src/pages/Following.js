import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import FollowCard from '../components/following/FollowCard';
import { useAppData } from '../context/AppDataContext';
import { CURRENT_USER_USERNAME, getUser, userFollowingMap } from '../data/mockUsers';
import './Following.css';

function Following() {
  const { username } = useParams();
  const profileUsername = username || CURRENT_USER_USERNAME;
  const { following } = useAppData();
  const profileUser = getUser(profileUsername);
  const isOwn = profileUsername === CURRENT_USER_USERNAME;

  const followedUsers = useMemo(() => {
    const usernames = isOwn ? following : userFollowingMap[profileUsername] || [];
    return usernames.map((u) => getUser(u)).filter(Boolean);
  }, [following, isOwn, profileUsername]);

  const backTo = isOwn ? '/profile' : `/profile/${profileUsername}`;

  return (
    <div className="following-page">
      <PageHeader
        title={isOwn ? 'Following' : `${profileUser?.username || profileUsername}`}
        backTo={backTo}
      />
      <p className="following-page__subtitle">Following</p>

      <div className="following-page__list">
        {followedUsers.length > 0 ? (
          followedUsers.map((user) => (
            <FollowCard key={user.username} user={user} isOwnList={isOwn} />
          ))
        ) : (
          <p className="following-page__empty">Not following anyone yet.</p>
        )}
      </div>
    </div>
  );
}

export default Following;
