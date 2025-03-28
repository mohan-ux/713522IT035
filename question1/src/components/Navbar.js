import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Social Media Dashboard
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ mx: 1 }}
          >
            Feed
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/trending"
            sx={{ mx: 1 }}
          >
            Trending
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/top-users"
            sx={{ mx: 1 }}
          >
            Top Users
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;