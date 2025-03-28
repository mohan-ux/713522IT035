const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 9876;

// Enable CORS
app.use(cors());

// API endpoints for different number types
const API_ENDPOINTS = {
    prime: 'http://20.244.56.144/test/primes',
    fibonacci: 'http://20.244.56.144/test/fibo',
    even: 'http://20.244.56.144/test/even',
    random: 'http://20.244.56.144/test/rand'
};

// Store the last 10 unique numbers for each type
const numberWindows = {
    prime: [],
    fibonacci: [],
    even: [],
    random: []
};

// Calculate average of numbers
function calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

// Fetch numbers from API with timeout
async function fetchNumbers(url) {
    try {
        const response = await axios.get(url, { timeout: 500 });
        return response.data.numbers || [];
    } catch (error) {
        console.error(`Error fetching numbers from ${url}:`, error.message);
        return [];
    }
}

// Update number window with new numbers
function updateNumberWindow(type, newNumbers) {
    const window = numberWindows[type];
    const uniqueNewNumbers = [...new Set(newNumbers)];
    
    // Add new numbers to the window
    uniqueNewNumbers.forEach(num => {
        if (!window.includes(num)) {
            window.push(num);
            // Keep only last 10 numbers
            if (window.length > 10) {
                window.shift();
            }
        }
    });
}

// Main endpoint handler
app.get('/numbers/:type', async (req, res) => {
    const type = req.params.type.toLowerCase();
    
    // Validate number type
    if (!API_ENDPOINTS[type]) {
        return res.status(400).json({
            error: 'Invalid number type. Supported types: prime, fibonacci, even, random'
        });
    }

    try {
        // Fetch new numbers
        const newNumbers = await fetchNumbers(API_ENDPOINTS[type]);
        
        // Store previous state
        const previousState = [...numberWindows[type]];
        
        // Update number window
        updateNumberWindow(type, newNumbers);
        
        // Calculate average
        const average = calculateAverage(numberWindows[type]);
        
        // Prepare response
        const response = {
            windowPrevState: previousState,
            windowCurrState: numberWindows[type],
            numbers: newNumbers,
            avg: Number(average.toFixed(2))
        };
        
        res.json(response);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Average Calculator Microservice running on port ${PORT}`);
}); 