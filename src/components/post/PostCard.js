import { Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import './PostCard.css';

function PostCard({ post, onCommentClick }) {
  const { toggleLike } = useAppData();

  return (
    <article className="post-card">
      <header className="post-card__header">
        <Link to={`/profile/${post.author.username}`} className="post-card__author">
          <img
            src={post.author.avatarUrl}
            alt={post.author.fullName}
            className="post-card__author-avatar"
            loading="lazy"
          />
          <div className="post-card__author-meta">
            <span className="post-card__username">{post.author.username}</span>
            <span className="post-card__time">{post.createdAt}</span>
          </div>
        </Link>
      </header>

      <div className="post-card__media">
        <img src={post.imageUrl} alt={post.caption} loading="lazy" />
      </div>

      <div className="post-card__actions">
        <button
          type="button"
          className={`post-card__action-btn${post.isLiked ? ' post-card__action-btn--liked' : ''}`}
          onClick={() => toggleLike(post.id)}
          aria-pressed={post.isLiked}
          aria-label={post.isLiked ? 'Unlike' : 'Like'}
        >
          {post.isLiked ? 'Liked' : 'Like'}
        </button>
        <button
          type="button"
          className="post-card__action-btn"
          onClick={() => onCommentClick?.(post)}
          aria-label="Comment"
        >
          Comment
        </button>
        <button type="button" className="post-card__action-btn" aria-label="Share">
          Share
        </button>
      </div>

      <p className="post-card__likes">{post.likesCount.toLocaleString()} likes</p>

      {post.caption && (
        <p className="post-card__caption">
          <Link to={`/profile/${post.author.username}`} className="post-card__caption-user">
            {post.author.username}
          </Link>{' '}
          {post.caption}
        </p>
      )}
    </article>
  );
}

export default PostCard;
