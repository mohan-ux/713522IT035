import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, Paper } from '@mui/material';
import PostCard from '../components/PostCard';
import { fetchUsers, fetchUserPosts, fetchPostComments } from '../services/api';
import { useAppContext } from '../context/AppContext';

const TrendingPosts = () => {
  const { dispatch } = useAppContext();
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrendingPosts = async () => {
    try {
      setLoading(true);
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch all users
      const users = await fetchUsers();
      console.log('Fetched users:', users);

      // Fetch posts from all users
      const postsPromises = users.map(async (user) => {
        try {
          const userPosts = await fetchUserPosts(user.id);
          return userPosts.map(post => ({
            ...post,
            userName: user.name
          }));
        } catch (err) {
          console.error(`Failed to fetch posts for user ${user.name}:`, err);
          return [];
        }
      });

      const postsArrays = await Promise.all(postsPromises);
      const allPosts = postsArrays.flat();

      // Fetch comments for all posts
      const commentsPromises = allPosts.map(async (post) => {
        try {
          const fetchedComments = await fetchPostComments(post.id);
          return { postId: post.id, comments: fetchedComments };
        } catch (err) {
          console.error(`Failed to fetch comments for post ${post.id}:`, err);
          return { postId: post.id, comments: [] };
        }
      });

      const commentsResults = await Promise.all(commentsPromises);
      const commentsMap = commentsResults.reduce((acc, { postId, comments }) => {
        acc[postId] = comments;
        return acc;
      }, {});

      setComments(commentsMap);

      // Find posts with the most comments
      const postsWithCommentCount = allPosts.map(post => ({
        ...post,
        commentCount: commentsMap[post.id]?.length || 0
      }));

      // Sort by comment count and get posts with the highest count
      const maxCommentCount = Math.max(...postsWithCommentCount.map(p => p.commentCount));
      const trendingPosts = postsWithCommentCount.filter(post => post.commentCount === maxCommentCount);

      setTrendingPosts(trendingPosts);
    } catch (err) {
      console.error('Error in fetchTrendingPosts:', err);
      setError(err.message);
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      setLoading(false);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    fetchTrendingPosts();
    // Refresh every 5 minutes
    const interval = setInterval(fetchTrendingPosts, 300000);
    return () => clearInterval(interval);
  }, []);

  const handleCommentClick = async (postId) => {
    if (!comments[postId]) {
      try {
        const fetchedComments = await fetchPostComments(postId);
        setComments(prev => ({
          ...prev,
          [postId]: fetchedComments
        }));
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Trending Posts
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Posts with {trendingPosts[0]?.commentCount || 0} comments
      </Typography>
      {trendingPosts.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No trending posts available
        </Typography>
      ) : (
        trendingPosts.map(post => (
          <Paper key={post.id} elevation={3} sx={{ mb: 3 }}>
            <PostCard
              post={post}
              comments={comments[post.id] || []}
              onCommentClick={handleCommentClick}
            />
          </Paper>
        ))
      )}
    </Container>
  );
};

export default TrendingPosts;

