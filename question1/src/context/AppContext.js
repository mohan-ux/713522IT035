import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  users: [],
  posts: [],
  comments: {},
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'SET_COMMENTS':
      return {
        ...state,
        comments: { ...state.comments, [action.payload.postId]: action.payload.comments }
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
} 