import { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import BottomNav from '../components/layout/BottomNav';
import PostCard from '../components/post/PostCard';
import CommentsModal from '../components/post/CommentsModal';
import { useAppData } from '../context/AppDataContext';
import './Trending.css';

function Trending() {
  const { trendingPosts } = useAppData();
  const [activePost, setActivePost] = useState(null);

  const activePostData = activePost
    ? trendingPosts.find((p) => p.id === activePost.id) || activePost
    : null;

  return (
    <div className="trending-page">
      <PageHeader title="Trending" backTo="/" />

      <div className="trending-page__banner">
        <span className="trending-page__fire" aria-hidden="true">🔥</span>
        <div>
          <h2 className="trending-page__heading">Trending now</h2>
          <p className="trending-page__sub">Top posts by likes in the last 24 hours</p>
        </div>
      </div>

      <main className="trending-page__feed">
        {trendingPosts.length > 0 ? (
          trendingPosts.map((post) => (
            <div key={post.id} className="trending-page__item">
              <div className="trending-page__badge">
                🔥 {post.likesLast24h?.toLocaleString()} likes · 24h
              </div>
              <PostCard post={post} onCommentClick={setActivePost} />
            </div>
          ))
        ) : (
          <p className="trending-page__empty">No trending posts in the last 24 hours.</p>
        )}
      </main>

      <BottomNav />

      <CommentsModal post={activePostData} onClose={() => setActivePost(null)} />
    </div>
  );
}

export default Trending;
