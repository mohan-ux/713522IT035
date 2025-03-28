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
} from '@mui/material';
import { fetchNumbers } from '../services/api';

const numberTypes = [
  { id: 'prime', label: 'Prime Numbers' },
  { id: 'fibonacci', label: 'Fibonacci Numbers' },
  { id: 'even', label: 'Even Numbers' },
  { id: 'random', label: 'Random Numbers' },
];

const AverageCalculator = () => {
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
          sx={{ mb: 4 }}
        >
          Average Calculator
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Select Number Type
              </Typography>
              <Grid container spacing={2}>
                {numberTypes.map((type) => (
                  <Grid item xs={6} sm={3} key={type.id}>
                    <Button
                      variant={selectedType === type.id ? "contained" : "outlined"}
                      fullWidth
                      onClick={() => setSelectedType(type.id)}
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
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Results
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Previous Window State
                      </Typography>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: 'grey.50', 
                        borderRadius: 1,
                        minHeight: '100px'
                      }}>
                        {data.windowPrevState.length > 0 ? (
                          data.windowPrevState.map((num, index) => (
                            <Typography key={index} component="span" sx={{ mr: 1 }}>
                              {formatNumber(num)}
                            </Typography>
                          ))
                        ) : (
                          <Typography color="text.secondary">
                            No previous state
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Current Window State
                      </Typography>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: 'grey.50', 
                        borderRadius: 1,
                        minHeight: '100px'
                      }}>
                        {data.windowCurrState.map((num, index) => (
                          <Typography key={index} component="span" sx={{ mr: 1 }}>
                            {formatNumber(num)}
                          </Typography>
                        ))}
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        New Numbers
                      </Typography>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: 'grey.50', 
                        borderRadius: 1,
                        minHeight: '100px'
                      }}>
                        {data.numbers.map((num, index) => (
                          <Typography key={index} component="span" sx={{ mr: 1 }}>
                            {formatNumber(num)}
                          </Typography>
                        ))}
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Average
                      </Typography>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: 'primary.light', 
                        color: 'primary.contrastText',
                        borderRadius: 1,
                        textAlign: 'center'
                      }}>
                        <Typography variant="h4">
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