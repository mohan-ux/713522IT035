import axios from 'axios';

// API Configuration
const BASE_URL = 'http://localhost:9876/numbers';
const TIMEOUT = 5000;

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Mock data functions
const generatePrimes = (count) => {
  const primes = [];
  let num = 2;
  while (primes.length < count) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(num);
    }
    num++;
  }
  return primes;
};

const generateFibonacci = (count) => {
  const fib = [1, 2];
  while (fib.length < count) {
    fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
  }
  return fib;
};

const generateEven = (count) => {
  return Array.from({ length: count }, (_, i) => (i + 1) * 2);
};

const generateRandom = (count) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 100) + 1);
};

// Mock data function
const getMockData = (type) => {
  let numbers;
  switch (type) {
    case 'prime':
      numbers = generatePrimes(10);
      break;
    case 'fibonacci':
      numbers = generateFibonacci(10);
      break;
    case 'even':
      numbers = generateEven(10);
      break;
    case 'random':
      numbers = generateRandom(10);
      break;
    default:
      throw new Error('Invalid number type');
  }

  return {
    numbers,
    windowPrevState: [],
    windowCurrState: numbers,
    avg: numbers.reduce((a, b) => a + b, 0) / numbers.length
  };
};

// API function with fallback to mock data
export const fetchNumbers = async (type) => {
  try {
    const response = await api.get(`/${type}`);
    return response.data;
  } catch (error) {
    console.warn('Using mock data due to API error:', error.message);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return getMockData(type);
  }
}; 