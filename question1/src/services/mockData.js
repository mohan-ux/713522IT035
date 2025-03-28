// Mock data for the social media dashboard

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Tech Corp',
    role: 'Senior Developer',
    followers: 1234,
    following: 567,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    company: 'Design Studio',
    role: 'UI/UX Designer',
    followers: 2345,
    following: 789,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    company: 'Startup Inc',
    role: 'Product Manager',
    followers: 3456,
    following: 890,
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    company: 'Digital Agency',
    role: 'Marketing Director',
    followers: 4567,
    following: 901,
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@example.com',
    company: 'Innovation Labs',
    role: 'CTO',
    followers: 5678,
    following: 234,
  },
];

const mockPosts = [
  {
    id: 1,
    userId: 1,
    title: 'Getting Started with React',
    body: 'React is a powerful library for building user interfaces. In this post, we\'ll explore the basics of React components, state management, and hooks. Learn how to create reusable components and manage application state effectively.',
    likes: 42,
    comments: 8,
    shares: 15,
    tags: ['React', 'JavaScript', 'Web Development'],
    createdAt: '2024-03-15T10:30:00Z',
  },
  {
    id: 2,
    userId: 2,
    title: 'The Future of UI Design',
    body: 'As we move into 2024, UI design trends are evolving rapidly. From neumorphism to glassmorphism, discover the latest design patterns that are shaping the future of user interfaces. Learn how to implement these trends in your projects.',
    likes: 38,
    comments: 12,
    shares: 20,
    tags: ['UI Design', 'UX', 'Design Trends'],
    createdAt: '2024-03-14T15:45:00Z',
  },
  {
    id: 3,
    userId: 3,
    title: 'Building Scalable Applications',
    body: 'Scalability is crucial for modern applications. Let\'s discuss some best practices for building scalable systems, including microservices architecture, load balancing, and database optimization techniques.',
    likes: 56,
    comments: 15,
    shares: 25,
    tags: ['Architecture', 'Scalability', 'Best Practices'],
    createdAt: '2024-03-13T09:15:00Z',
  },
  {
    id: 4,
    userId: 4,
    title: 'Digital Marketing Strategies',
    body: 'Effective digital marketing can transform your business. Here are proven strategies for social media marketing, content creation, and audience engagement. Learn how to measure success and optimize your campaigns.',
    likes: 29,
    comments: 6,
    shares: 10,
    tags: ['Marketing', 'Digital', 'Strategy'],
    createdAt: '2024-03-12T14:20:00Z',
  },
  {
    id: 5,
    userId: 5,
    title: 'Innovation in Tech',
    body: 'The tech industry is constantly evolving. Let\'s explore the latest innovations in artificial intelligence, blockchain, and cloud computing. Discover how these technologies are shaping the future of business.',
    likes: 45,
    comments: 10,
    shares: 18,
    tags: ['Technology', 'Innovation', 'Future'],
    createdAt: '2024-03-11T11:00:00Z',
  },
];

const mockComments = [
  {
    id: 1,
    postId: 1,
    userId: 2,
    body: 'Great article! Very informative for beginners. I especially liked the section about React hooks.',
    email: 'jane@example.com',
    createdAt: '2024-03-15T11:00:00Z',
    likes: 5,
  },
  {
    id: 2,
    postId: 1,
    userId: 3,
    body: 'I would love to see more examples in the next post. Maybe some real-world use cases?',
    email: 'mike@example.com',
    createdAt: '2024-03-15T11:30:00Z',
    likes: 3,
  },
  {
    id: 3,
    postId: 2,
    userId: 1,
    body: 'These design trends are fascinating! I\'m already implementing some of these in our projects.',
    email: 'john@example.com',
    createdAt: '2024-03-14T16:00:00Z',
    likes: 7,
  },
  {
    id: 4,
    postId: 2,
    userId: 4,
    body: 'I agree with most points, but there are some additional trends to consider, especially in mobile design.',
    email: 'sarah@example.com',
    createdAt: '2024-03-14T16:30:00Z',
    likes: 4,
  },
  {
    id: 5,
    postId: 3,
    userId: 5,
    body: 'Scalability is indeed crucial. Thanks for sharing these insights. I\'d love to see more about microservices.',
    email: 'david@example.com',
    createdAt: '2024-03-13T10:00:00Z',
    likes: 6,
  },
];

// Mock API functions
export const fetchUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockUsers;
};

export const fetchUserPosts = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPosts.filter(post => post.userId === userId);
};

export const fetchPostComments = async (postId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockComments.filter(comment => comment.postId === postId);
};

export const getRandomAvatar = () => {
  const avatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',
    'https://i.pravatar.cc/150?img=5',
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
};

export const getRandomImage = () => {
  const images = [
    'https://source.unsplash.com/random/800x600?technology',
    'https://source.unsplash.com/random/800x600?coding',
    'https://source.unsplash.com/random/800x600?design',
    'https://source.unsplash.com/random/800x600?business',
    'https://source.unsplash.com/random/800x600?innovation',
  ];
  return images[Math.floor(Math.random() * images.length)];
}; 