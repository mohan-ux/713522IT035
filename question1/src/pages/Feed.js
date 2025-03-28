import React, { useEffect, useState, useCallback } from 'react';
import { 
  Container, 
  Typography, 
  CircularProgress, 
  Box, 
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import PostCard from '../components/PostCard';
import { fetchUsers, fetchUserPosts, fetchPostComments } from '../services/api';
import { useAppContext } from '../context/AppContext';

const Feed = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { dispatch } = useAppContext();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const postsPerPage = 5;

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Fetch all users
      const users = await fetchUsers();
      
      // Fetch posts from all users
      const postsPromises = users.map(async (user) => {
        try {
          const userPosts = await fetchUserPosts(user.id);
          return userPosts.map(post => ({
            ...post,
            userName: user.name,
            userRole: user.role,
            userCompany: user.company,
          }));
        } catch (err) {
          console.error(`Failed to fetch posts for user ${user.name}:`, err);
          return [];
        }
      });
      
      const postsArrays = await Promise.all(postsPromises);
      const allPosts = postsArrays.flat().sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setPosts(allPosts);
      
      // Fetch comments for each post
      const commentsPromises = allPosts.map(async (post) => {
        try {
          const comments = await fetchPostComments(post.id);
          return { postId: post.id, comments };
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
    } catch (err) {
      console.error('Error in fetchPosts:', err);
      setError(err.message);
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      setLoading(false);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const displayedPosts = posts.slice(0, page * postsPerPage);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          mt={4}
          p={3}
          bgcolor="error.light"
          borderRadius={2}
        >
          <Typography color="error" align="center" gutterBottom>
            Error: {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchPosts}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            mb: 4,
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          Latest Posts
        </Typography>
        {posts.length === 0 ? (
          <Box 
            textAlign="center" 
            p={4} 
            bgcolor="grey.50" 
            borderRadius={2}
          >
            <Typography color="text.secondary">
              No posts available
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {displayedPosts.map((post, index) => (
                <Grid item xs={12} key={post.id}>
                  <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                    <div>
                      <PostCard
                        post={post}
                        comments={comments[post.id] || []}
                        onCommentClick={handleCommentClick}
                      />
                    </div>
                  </Fade>
                </Grid>
              ))}
            </Grid>
            {displayedPosts.length < posts.length && (
              <Box 
                display="flex" 
                justifyContent="center" 
                mt={4}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleLoadMore}
                  size="large"
                >
                  Load More Posts
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Feed;