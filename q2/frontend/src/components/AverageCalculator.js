import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { fetchNumbers } from '../services/api';

const numberTypes = [
  { id: 'prime', label: 'Prime Numbers', color: '#1976d2' },
  { id: 'fibonacci', label: 'Fibonacci Numbers', color: '#2e7d32' },
  { id: 'even', label: 'Even Numbers', color: '#ed6c02' },
  { id: 'random', label: 'Random Numbers', color: '#9c27b0' },
];

const AverageCalculator = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedType, setSelectedType] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (type) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchNumbers(type);
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching numbers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedType) {
      fetchData(selectedType);
    }
  }, [selectedType]);

  const formatNumber = (num) => {
    return Number(num).toFixed(2);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            mb: 4,
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          Average Calculator
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3, 
                mb: 3,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #f5f5f5 30%, #ffffff 90%)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Select Number Type
              </Typography>
              <Grid container spacing={2}>
                {numberTypes.map((type) => (
                  <Grid item xs={6} sm={3} key={type.id}>
                    <Button
                      variant={selectedType === type.id ? "contained" : "outlined"}
                      fullWidth
                      onClick={() => setSelectedType(type.id)}
                      sx={{
                        color: selectedType === type.id ? 'white' : type.color,
                        borderColor: type.color,
                        '&:hover': {
                          borderColor: type.color,
                          backgroundColor: `${type.color}20`,
                        },
                        '&.MuiButton-contained': {
                          backgroundColor: type.color,
                          '&:hover': {
                            backgroundColor: type.color,
                          },
                        },
                      }}
                    >
                      {type.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {loading && (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
              </Box>
            </Grid>
          )}

          {error && (
            <Grid item xs={12}>
              <Alert severity="error" sx={{ mb: 2 }}>
                Error: {error}
              </Alert>
            </Grid>
          )}

          {data && (
            <Grid item xs={12}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    Results
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                        Previous Window State
                      </Typography>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: 'grey.50', 
                        borderRadius: 2,
                        minHeight: '100px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                      }}>
                        {data.windowPrevState.length > 0 ? (
                          data.windowPrevState.map((num, index) => (
                            <Chip
                              key={index}
                              label={formatNumber(num)}
                              variant="outlined"
                              sx={{ 
                                bgcolor: 'white',
                                '&:hover': {
                                  bgcolor: 'grey.100',
                                },
                              }}
                            />
                          ))
                        ) : (
                          <Typography color="text.secondary">
                            No previous state
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                        Current Window State
                      </Typography>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: 'grey.50', 
                        borderRadius: 2,
                        minHeight: '100px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                      }}>
                        {data.windowCurrState.map((num, index) => (
                          <Chip
                            key={index}
                            label={formatNumber(num)}
                            sx={{ 
                              bgcolor: 'primary.main',
                              color: 'white',
                              '&:hover': {
                                bgcolor: 'primary.dark',
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                        New Numbers
                      </Typography>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: 'grey.50', 
                        borderRadius: 2,
                        minHeight: '100px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                      }}>
                        {data.numbers.map((num, index) => (
                          <Chip
                            key={index}
                            label={formatNumber(num)}
                            sx={{ 
                              bgcolor: 'secondary.main',
                              color: 'white',
                              '&:hover': {
                                bgcolor: 'secondary.dark',
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                        Average
                      </Typography>
                      <Box sx={{ 
                        p: 3, 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        borderRadius: 2,
                        textAlign: 'center',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {formatNumber(data.avg)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default AverageCalculator; 