import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import { useAppData } from '../context/AppDataContext';
import './AddPost.css';

function AddPost() {
  const navigate = useNavigate();
  const { addPost } = useAppData();
  const galleryRef = useRef(null);
  const cameraRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    e.target.value = '';
  };

  const handlePost = () => {
    if (!preview) return;
    addPost(preview, caption);
    navigate('/');
  };

  const privacyLabels = {
    public: 'Public',
    friends: 'Friends only',
    private: 'Only me',
  };

  return (
    <div className="add-post-page">
      <PageHeader title="Create" backTo="/" />

      <div className="add-post-page__body">
        {!preview ? (
          <div className="add-post-page__picker">
            <div className="add-post-page__picker-icon">+</div>
            <p className="add-post-page__picker-label">Add Post</p>
            <p className="add-post-page__picker-hint">Gallery or camera</p>
            <div className="add-post-page__picker-actions">
              <button
                type="button"
                className="add-post-page__picker-btn"
                onClick={() => galleryRef.current?.click()}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                Gallery
              </button>
              <button
                type="button"
                className="add-post-page__picker-btn"
                onClick={() => cameraRef.current?.click()}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Camera
              </button>
            </div>
          </div>
        ) : (
          <div className="add-post-page__preview-wrap">
            <img src={preview} alt="Preview" className="add-post-page__preview" />
            <button
              type="button"
              className="add-post-page__change"
              onClick={() => {
                setPreview(null);
              }}
            >
              Change photo
            </button>
          </div>
        )}

        <input
          ref={galleryRef}
          type="file"
          accept="image/*,video/*"
          className="add-post-page__file-input"
          onChange={handleFile}
        />
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="add-post-page__file-input"
          onChange={handleFile}
        />

        <label className="add-post-page__label" htmlFor="caption">
          Caption
        </label>
        <textarea
          id="caption"
          className="add-post-page__caption"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
        />

        <div className="add-post-page__privacy-wrap">
          <button
            type="button"
            className="add-post-page__privacy-btn"
            onClick={() => setShowPrivacyMenu((v) => !v)}
          >
            Set Privacy: {privacyLabels[privacy]}
          </button>
          {showPrivacyMenu && (
            <div className="add-post-page__privacy-menu">
              {Object.entries(privacyLabels).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`add-post-page__privacy-option${privacy === key ? ' add-post-page__privacy-option--active' : ''}`}
                  onClick={() => {
                    setPrivacy(key);
                    setShowPrivacyMenu(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="add-post-page__submit"
          disabled={!preview}
          onClick={handlePost}
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default AddPost;
