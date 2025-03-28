// Mock data for the Average Calculator

// Helper function to generate prime numbers
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

// Helper function to generate Fibonacci numbers
const generateFibonacci = (count) => {
  const fib = [1, 2];
  while (fib.length < count) {
    fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
  }
  return fib;
};

// Helper function to generate even numbers
const generateEven = (count) => {
  return Array.from({ length: count }, (_, i) => (i + 1) * 2);
};

// Helper function to generate random numbers
const generateRandom = (count) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 100) + 1);
};

// Mock API functions
export const fetchNumbers = async (type) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
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