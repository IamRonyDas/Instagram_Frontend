export const initialPosts = [
  {
    id: 'post-1',
    authorUsername: 'jane_doe',
    imageUrl: 'https://picsum.photos/seed/insta1/800/800',
    caption: 'Golden hour never gets old. 🌅',
    likesCount: 248,
    isLiked: false,
    createdAt: '2h',
    comments: [
      { id: 'c1', username: 'alex_shots', text: 'Stunning shot!', createdAt: '1h' },
      { id: 'c2', username: 'rony_dev', text: 'Love the colors here', createdAt: '45m' },
    ],
  },
  {
    id: 'post-2',
    authorUsername: 'alex_shots',
    imageUrl: 'https://picsum.photos/seed/insta2/800/800',
    caption: 'Weekend hike with the crew.',
    likesCount: 91,
    isLiked: true,
    createdAt: '5h',
    comments: [
      { id: 'c3', username: 'fit.with.sam', text: 'Where is this trail?', createdAt: '4h' },
    ],
  },
  {
    id: 'post-3',
    authorUsername: 'maya.creates',
    imageUrl: 'https://picsum.photos/seed/insta3/800/800',
    caption: 'New studio setup. What do you think?',
    likesCount: 412,
    isLiked: false,
    createdAt: '1d',
    comments: [],
  },
  {
    id: 'post-4',
    authorUsername: 'travel.nova',
    imageUrl: 'https://picsum.photos/seed/insta4/800/800',
    caption: 'Kyoto mornings hit different.',
    likesCount: 1204,
    isLiked: true,
    createdAt: '1d',
    comments: [
      { id: 'c4', username: 'jane_doe', text: 'Adding this to my bucket list!', createdAt: '20h' },
      { id: 'c5', username: 'foodie.lena', text: 'The vibes 😍', createdAt: '18h' },
    ],
  },
  {
    id: 'post-5',
    authorUsername: 'foodie.lena',
    imageUrl: 'https://picsum.photos/seed/insta5/800/800',
    caption: 'Homemade ramen night 🍜',
    likesCount: 567,
    isLiked: false,
    createdAt: '2d',
    comments: [
      { id: 'c6', username: 'rony_dev', text: 'Recipe please!', createdAt: '1d' },
    ],
  },
  {
    id: 'post-6',
    authorUsername: 'fit.with.sam',
    imageUrl: 'https://picsum.photos/seed/insta6/800/800',
    caption: 'Leg day = best day.',
    likesCount: 334,
    isLiked: false,
    createdAt: '2d',
    comments: [],
  },
  {
    id: 'post-7',
    authorUsername: 'art.by.kai',
    imageUrl: 'https://picsum.photos/seed/insta7/800/800',
    caption: 'Work in progress — cyberpunk series',
    likesCount: 189,
    isLiked: false,
    createdAt: '3d',
    comments: [
      { id: 'c7', username: 'maya.creates', text: 'The palette is incredible', createdAt: '2d' },
    ],
  },
  {
    id: 'post-8',
    authorUsername: 'rony_dev',
    imageUrl: 'https://picsum.photos/seed/rony1/800/800',
    caption: 'Shipped a new feature today 🚀',
    likesCount: 72,
    isLiked: false,
    createdAt: '4h',
    comments: [],
  },
];

export const ronyProfilePosts = [
  { id: 'rony-p1', imageUrl: 'https://picsum.photos/seed/ronygrid1/400/400' },
  { id: 'rony-p2', imageUrl: 'https://picsum.photos/seed/ronygrid2/400/400' },
  { id: 'rony-p3', imageUrl: 'https://picsum.photos/seed/ronygrid3/400/400' },
  { id: 'rony-p4', imageUrl: 'https://picsum.photos/seed/ronygrid4/400/400' },
  { id: 'rony-p5', imageUrl: 'https://picsum.photos/seed/ronygrid5/400/400' },
  { id: 'rony-p6', imageUrl: 'https://picsum.photos/seed/ronygrid6/400/400' },
  { id: 'rony-p7', imageUrl: 'https://picsum.photos/seed/ronygrid7/400/400' },
  { id: 'rony-p8', imageUrl: 'https://picsum.photos/seed/ronygrid8/400/400' },
  { id: 'rony-p9', imageUrl: 'https://picsum.photos/seed/ronygrid9/400/400' },
];

export const userProfilePosts = {
  jane_doe: [
    { id: 'j1', imageUrl: 'https://picsum.photos/seed/jane1/400/400' },
    { id: 'j2', imageUrl: 'https://picsum.photos/seed/jane2/400/400' },
    { id: 'j3', imageUrl: 'https://picsum.photos/seed/jane3/400/400' },
    { id: 'j4', imageUrl: 'https://picsum.photos/seed/jane4/400/400' },
    { id: 'j5', imageUrl: 'https://picsum.photos/seed/jane5/400/400' },
    { id: 'j6', imageUrl: 'https://picsum.photos/seed/jane6/400/400' },
  ],
  alex_shots: [
    { id: 'a1', imageUrl: 'https://picsum.photos/seed/alex1/400/400' },
    { id: 'a2', imageUrl: 'https://picsum.photos/seed/alex2/400/400' },
    { id: 'a3', imageUrl: 'https://picsum.photos/seed/alex3/400/400' },
    { id: 'a4', imageUrl: 'https://picsum.photos/seed/alex4/400/400' },
    { id: 'a5', imageUrl: 'https://picsum.photos/seed/alex5/400/400' },
    { id: 'a6', imageUrl: 'https://picsum.photos/seed/alex6/400/400' },
  ],
  'maya.creates': [
    { id: 'm1', imageUrl: 'https://picsum.photos/seed/maya1/400/400' },
    { id: 'm2', imageUrl: 'https://picsum.photos/seed/maya2/400/400' },
    { id: 'm3', imageUrl: 'https://picsum.photos/seed/maya3/400/400' },
    { id: 'm4', imageUrl: 'https://picsum.photos/seed/maya4/400/400' },
    { id: 'm5', imageUrl: 'https://picsum.photos/seed/maya5/400/400' },
    { id: 'm6', imageUrl: 'https://picsum.photos/seed/maya6/400/400' },
  ],
  'travel.nova': [
    { id: 't1', imageUrl: 'https://picsum.photos/seed/nova1/400/400' },
    { id: 't2', imageUrl: 'https://picsum.photos/seed/nova2/400/400' },
    { id: 't3', imageUrl: 'https://picsum.photos/seed/nova3/400/400' },
    { id: 't4', imageUrl: 'https://picsum.photos/seed/nova4/400/400' },
    { id: 't5', imageUrl: 'https://picsum.photos/seed/nova5/400/400' },
    { id: 't6', imageUrl: 'https://picsum.photos/seed/nova6/400/400' },
  ],
  'foodie.lena': [
    { id: 'f1', imageUrl: 'https://picsum.photos/seed/lena1/400/400' },
    { id: 'f2', imageUrl: 'https://picsum.photos/seed/lena2/400/400' },
    { id: 'f3', imageUrl: 'https://picsum.photos/seed/lena3/400/400' },
    { id: 'f4', imageUrl: 'https://picsum.photos/seed/lena4/400/400' },
    { id: 'f5', imageUrl: 'https://picsum.photos/seed/lena5/400/400' },
    { id: 'f6', imageUrl: 'https://picsum.photos/seed/lena6/400/400' },
  ],
  'fit.with.sam': [
    { id: 's1', imageUrl: 'https://picsum.photos/seed/sam1/400/400' },
    { id: 's2', imageUrl: 'https://picsum.photos/seed/sam2/400/400' },
    { id: 's3', imageUrl: 'https://picsum.photos/seed/sam3/400/400' },
    { id: 's4', imageUrl: 'https://picsum.photos/seed/sam4/400/400' },
    { id: 's5', imageUrl: 'https://picsum.photos/seed/sam5/400/400' },
    { id: 's6', imageUrl: 'https://picsum.photos/seed/sam6/400/400' },
  ],
  'art.by.kai': [
    { id: 'k1', imageUrl: 'https://picsum.photos/seed/kai1/400/400' },
    { id: 'k2', imageUrl: 'https://picsum.photos/seed/kai2/400/400' },
    { id: 'k3', imageUrl: 'https://picsum.photos/seed/kai3/400/400' },
    { id: 'k4', imageUrl: 'https://picsum.photos/seed/kai4/400/400' },
    { id: 'k5', imageUrl: 'https://picsum.photos/seed/kai5/400/400' },
    { id: 'k6', imageUrl: 'https://picsum.photos/seed/kai6/400/400' },
  ],
};

export function getProfileGrid(username) {
  if (username === 'rony_dev') return ronyProfilePosts;
  return userProfilePosts[username] || [];
}

export function getPostsByUser(username, allPosts) {
  return allPosts.filter((p) => p.authorUsername === username);
}
