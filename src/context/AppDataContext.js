import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { initialPosts } from '../data/mockPosts';
import { mockNotifications as seedNotifications } from '../data/mockNotifications';
import {
  CURRENT_USER_USERNAME,
  initialFollowing,
  mockUsers as initialMockUsers,
} from '../data/mockUsers';

const AppDataContext = createContext(null);

function createNotification({ type, username, message, postThumbnail, postId, isNew = true }) {
  return {
    id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    username,
    message,
    time: 'now',
    postThumbnail,
    postId,
    isNew,
    showFollowBack: type === 'follow',
  };
}

export function AppDataProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);
  const [users, setUsers] = useState(initialMockUsers);
  const [following, setFollowing] = useState(() => new Set(initialFollowing));
  const [notifications, setNotifications] = useState(seedNotifications);
  const [unreadCount, setUnreadCount] = useState(
    () => seedNotifications.filter((n) => n.isNew).length
  );

  const pushNotification = useCallback((notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((c) => c + 1);
  }, []);

  const notifyInteraction = useCallback(
    ({ type, actorUsername, targetUsername, post, commentText }) => {
      const thumb = post?.imageUrl;
      const postId = post?.id;

      if (type === 'like') {
        if (targetUsername === CURRENT_USER_USERNAME && actorUsername !== CURRENT_USER_USERNAME) {
          pushNotification(
            createNotification({
              type: 'like',
              username: actorUsername,
              message: 'liked your photo.',
              postThumbnail: thumb,
              postId,
            })
          );
        } else if (actorUsername === CURRENT_USER_USERNAME && targetUsername !== CURRENT_USER_USERNAME) {
          pushNotification(
            createNotification({
              type: 'like',
              username: targetUsername,
              message: `You liked @${targetUsername}'s photo.`,
              postThumbnail: thumb,
              postId,
            })
          );
        }
      }

      if (type === 'comment') {
        const msg =
          actorUsername === CURRENT_USER_USERNAME
            ? `You commented: ${commentText}`
            : `commented: ${commentText}`;

        if (targetUsername === CURRENT_USER_USERNAME && actorUsername !== CURRENT_USER_USERNAME) {
          pushNotification(
            createNotification({
              type: 'comment',
              username: actorUsername,
              message: msg.replace('You commented: ', 'commented: '),
              postThumbnail: thumb,
              postId,
            })
          );
        } else if (actorUsername === CURRENT_USER_USERNAME && targetUsername !== CURRENT_USER_USERNAME) {
          pushNotification(
            createNotification({
              type: 'comment',
              username: targetUsername,
              message: `You commented on @${targetUsername}'s photo.`,
              postThumbnail: thumb,
              postId,
            })
          );
        }
      }
    },
    [pushNotification]
  );

  const markNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isNew: false })));
    setUnreadCount(0);
  }, []);

  const getUser = useCallback((username) => users[username] || null, [users]);

  const enrichPost = useCallback(
    (post) => {
      const author = users[post.authorUsername];
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
    [users]
  );

  const addComment = useCallback(
    (postId, text) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      let targetPost = null;
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;
          targetPost = post;
          return {
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
          };
        })
      );

      if (targetPost) {
        notifyInteraction({
          type: 'comment',
          actorUsername: CURRENT_USER_USERNAME,
          targetUsername: targetPost.authorUsername,
          post: targetPost,
          commentText: trimmed,
        });

        targetPost.comments.forEach((c) => {
          if (
            c.username !== CURRENT_USER_USERNAME &&
            targetPost.authorUsername === CURRENT_USER_USERNAME
          ) {
            /* existing comments from others on my post already seeded */
          }
        });
      }
    },
    [notifyInteraction]
  );

  const toggleLike = useCallback(
    (postId) => {
      let likedPost = null;
      let nowLiked = false;

      setPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;
          const isLiked = !post.isLiked;
          nowLiked = isLiked;
          likedPost = post;
          const likesDelta = isLiked ? 1 : -1;
          return {
            ...post,
            isLiked,
            likesCount: post.likesCount + likesDelta,
            likesLast24h: post.isWithin24h
              ? Math.max(0, (post.likesLast24h || 0) + likesDelta)
              : post.likesLast24h,
          };
        })
      );

      if (likedPost && nowLiked) {
        notifyInteraction({
          type: 'like',
          actorUsername: CURRENT_USER_USERNAME,
          targetUsername: likedPost.authorUsername,
          post: likedPost,
        });
      }
    },
    [notifyInteraction]
  );

  const deletePost = useCallback((postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setUsers((prev) => {
      const user = prev[CURRENT_USER_USERNAME];
      if (!user) return prev;
      return {
        ...prev,
        [CURRENT_USER_USERNAME]: {
          ...user,
          postsCount: Math.max(0, user.postsCount - 1),
        },
      };
    });
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
      likesLast24h: 0,
      isWithin24h: true,
      isLiked: false,
      createdAt: 'now',
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    setUsers((prev) => {
      const user = prev[CURRENT_USER_USERNAME];
      return {
        ...prev,
        [CURRENT_USER_USERNAME]: {
          ...user,
          postsCount: (user?.postsCount || 0) + 1,
        },
      };
    });
    return newPost;
  }, []);

  const updateProfile = useCallback(({ bio, avatarUrl }) => {
    setUsers((prev) => ({
      ...prev,
      [CURRENT_USER_USERNAME]: {
        ...prev[CURRENT_USER_USERNAME],
        ...(bio !== undefined ? { bio } : {}),
        ...(avatarUrl !== undefined ? { avatarUrl } : {}),
      },
    }));
  }, []);

  const feedPosts = useMemo(() => posts.map(enrichPost), [posts, enrichPost]);

  const trendingPosts = useMemo(
    () =>
      [...posts]
        .filter((p) => p.isWithin24h)
        .sort((a, b) => (b.likesLast24h || 0) - (a.likesLast24h || 0))
        .map(enrichPost),
    [posts, enrichPost]
  );

  const currentUser = users[CURRENT_USER_USERNAME];

  const value = useMemo(
    () => ({
      posts,
      feedPosts,
      trendingPosts,
      following: [...following],
      followingSet: following,
      currentUser,
      currentUsername: CURRENT_USER_USERNAME,
      users,
      getUser,
      notifications,
      unreadCount,
      unreadBadge: unreadCount > 9 ? '9+' : unreadCount > 0 ? String(unreadCount) : null,
      markNotificationsRead,
      addComment,
      toggleLike,
      toggleFollow,
      isFollowing,
      addPost,
      deletePost,
      updateProfile,
      getPostsByUser: (username) =>
        posts.filter((p) => p.authorUsername === username).map(enrichPost),
      enrichPost,
    }),
    [
      posts,
      feedPosts,
      trendingPosts,
      following,
      currentUser,
      users,
      getUser,
      notifications,
      unreadCount,
      markNotificationsRead,
      addComment,
      toggleLike,
      toggleFollow,
      isFollowing,
      addPost,
      deletePost,
      updateProfile,
      enrichPost,
    ]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
