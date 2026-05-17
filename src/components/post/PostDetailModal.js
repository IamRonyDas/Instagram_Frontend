import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import CommentsModal from './CommentsModal';
import './PostDetailModal.css';

function PostDetailModal({ post, onClose, showDelete = false, onDeleted }) {
  const { toggleLike, deletePost, feedPosts, currentUsername } = useAppData();
  const [showComments, setShowComments] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!post) return null;

  const livePost = feedPosts.find((p) => p.id === post.id) || post;
  const authorUsername = livePost.author?.username || livePost.authorUsername;
  const isOwn = authorUsername === currentUsername;

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deletePost(livePost.id);
    onDeleted?.();
    onClose();
  };

  return (
    <>
      <div className="post-detail__backdrop" onClick={onClose} role="presentation">
        <div
          className="post-detail"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <header className="post-detail__header">
            <Link
              to={`/profile/${authorUsername}`}
              className="post-detail__author"
              onClick={onClose}
            >
              <img src={livePost.author?.avatarUrl} alt="" className="post-detail__avatar" />
              <span>{authorUsername}</span>
            </Link>
            <button type="button" className="post-detail__close" onClick={onClose} aria-label="Close">
              ×
            </button>
          </header>

          <div className="post-detail__media">
            <img src={livePost.imageUrl} alt={livePost.caption || 'Post'} />
          </div>

          <div className="post-detail__actions">
            <button
              type="button"
              className={`post-detail__action${livePost.isLiked ? ' post-detail__action--liked' : ''}`}
              onClick={() => toggleLike(livePost.id)}
            >
              {livePost.isLiked ? 'Liked' : 'Like'}
            </button>
            <button
              type="button"
              className="post-detail__action"
              onClick={() => setShowComments(true)}
            >
              Comment
            </button>
          </div>

          <p className="post-detail__likes">{livePost.likesCount?.toLocaleString()} likes</p>
          {livePost.likesLast24h != null && livePost.isWithin24h && (
            <p className="post-detail__trending">
              🔥 {livePost.likesLast24h.toLocaleString()} likes in last 24h
            </p>
          )}

          {livePost.caption && (
            <p className="post-detail__caption">
              <strong>{authorUsername}</strong> {livePost.caption}
            </p>
          )}

          {showDelete && isOwn && (
            <button
              type="button"
              className={`post-detail__delete${confirmDelete ? ' post-detail__delete--confirm' : ''}`}
              onClick={handleDelete}
            >
              {confirmDelete ? 'Tap again to delete' : 'Delete post'}
            </button>
          )}
        </div>
      </div>

      {showComments && (
        <CommentsModal post={livePost} onClose={() => setShowComments(false)} />
      )}
    </>
  );
}

export default PostDetailModal;
