import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { initialPosts } from '../data/mockPosts';
import { CURRENT_USER_USERNAME, initialFollowing } from '../data/mockUsers';
import { getUser } from '../data/mockUsers';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);
  const [following, setFollowing] = useState(() => new Set(initialFollowing));

  const addComment = useCallback((postId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `c-${Date.now()}`,
                  username: CURRENT_USER_USERNAME,
                  text: trimmed,
                  createdAt: 'now',
                },
              ],
            }
          : post
      )
    );
  }, []);

  const toggleLike = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likesCount: post.likesCount + (isLiked ? 1 : -1),
        };
      })
    );
  }, []);

  const toggleFollow = useCallback((username) => {
    if (username === CURRENT_USER_USERNAME) return;
    setFollowing((prev) => {
      const next = new Set(prev);
      if (next.has(username)) next.delete(username);
      else next.add(username);
      return next;
    });
  }, []);

  const isFollowing = useCallback((username) => following.has(username), [following]);

  const addPost = useCallback((imageUrl, caption) => {
    const newPost = {
      id: `post-${Date.now()}`,
      authorUsername: CURRENT_USER_USERNAME,
      imageUrl,
      caption: caption.trim(),
      likesCount: 0,
      isLiked: false,
      createdAt: 'now',
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  }, []);

  const enrichPost = useCallback(
    (post) => {
      const author = getUser(post.authorUsername);
      return {
        ...post,
        author: author
          ? {
              username: author.username,
              fullName: author.fullName,
              avatarUrl: author.avatarUrl,
            }
          : {
              username: post.authorUsername,
              fullName: post.authorUsername,
              avatarUrl: 'https://i.pravatar.cc/150?img=68',
            },
      };
    },
    []
  );

  const feedPosts = useMemo(() => posts.map(enrichPost), [posts, enrichPost]);

  const value = useMemo(
    () => ({
      posts,
      feedPosts,
      following: [...following],
      followingSet: following,
      currentUser: getUser(CURRENT_USER_USERNAME),
      currentUsername: CURRENT_USER_USERNAME,
      addComment,
      toggleLike,
      toggleFollow,
      isFollowing,
      addPost,
      getPostsByUser: (username) =>
        posts.filter((p) => p.authorUsername === username).map(enrichPost),
    }),
    [posts, feedPosts, following, addComment, toggleLike, toggleFollow, isFollowing, addPost, enrichPost]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
