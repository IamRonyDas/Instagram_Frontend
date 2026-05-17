import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '../components/layout/HomeHeader';
import BottomNav from '../components/layout/BottomNav';
import PostCard from '../components/post/PostCard';
import CommentsModal from '../components/post/CommentsModal';
import { useAppData } from '../context/AppDataContext';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { feedPosts } = useAppData();
  const [activePost, setActivePost] = useState(null);

  const activePostData = activePost
    ? feedPosts.find((p) => p.id === activePost.id) || activePost
    : null;

  return (
    <div className="home-page">
      <HomeHeader onSearchFocus={() => navigate('/search')} />

      <main className="home-page__feed">
        {feedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onCommentClick={setActivePost}
          />
        ))}
      </main>

      <BottomNav />

      <CommentsModal post={activePostData} onClose={() => setActivePost(null)} />
    </div>
  );
}

export default Home;
