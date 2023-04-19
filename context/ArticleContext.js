// context/ArticleContext.js
import { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  articles: [],
};

// Reducer function
const articleReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return { ...state, articles: action.payload };
    // Add more actions as needed
    default:
      return state;
  }
};

// Create context
const ArticleContext = createContext();

// Create provider
export const ArticleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(articleReducer, initialState);
  return (
    <ArticleContext.Provider value={{ state, dispatch }}>
      {children}
    </ArticleContext.Provider>
  );
};

// Custom hook to use ArticleContext
export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};
