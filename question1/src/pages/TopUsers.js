import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import { fetchUsers, fetchUserPosts, getRandomAvatar } from '../services/api';
import { useAppContext } from '../context/AppContext';

const TopUsers = () => {
  const { dispatch } = useAppContext();
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopUsers = async () => {
    try {
      setLoading(true);
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch all users
      const users = await fetchUsers();
      console.log('Fetched users:', users);

      // Fetch posts for each user
      const usersWithPosts = await Promise.all(
        users.map(async (user) => {
          try {
            const posts = await fetchUserPosts(user.id);
            return {
              ...user,
              postCount: posts.length,
              posts: posts.slice(0, 3), // Get latest 3 posts
            };
          } catch (err) {
            console.error(`Failed to fetch posts for user ${user.name}:`, err);
            return {
              ...user,
              postCount: 0,
              posts: []
            };
          }
        })
      );

      // Sort users by post count and get top 5
      const sortedUsers = usersWithPosts
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, 5);

      setTopUsers(sortedUsers);
    } catch (err) {
      console.error('Error in fetchTopUsers:', err);
      setError(err.message);
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      setLoading(false);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    fetchTopUsers();
    // Refresh every 5 minutes
    const interval = setInterval(fetchTopUsers, 300000);
    return () => clearInterval(interval);
  }, []);

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
        Top Users
      </Typography>
      <Grid container spacing={3}>
        {topUsers.map((user, index) => (
          <Grid item xs={12} md={6} key={user.id}>
            <Paper elevation={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      src={getRandomAvatar()}
                      alt={user.name}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" component="div">
                        #{index + 1} {user.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {user.postCount} posts
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" gutterBottom>
                    Latest Posts:
                  </Typography>
                  <List>
                    {user.posts.map((post) => (
                      <React.Fragment key={post.id}>
                        <ListItem>
                          <ListItemText
                            primary={post.title}
                            secondary={post.body.substring(0, 100) + '...'}
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TopUsers;