import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import TrendingPosts from './pages/TrendingPosts';
import TopUsers from './pages/TopUsers';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/trending" element={<TrendingPosts />} />
              <Route path="/top-users" element={<TopUsers />} />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;