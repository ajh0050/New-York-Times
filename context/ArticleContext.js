import React, { createContext, useReducer, useContext } from 'react';

const ArticleStateContext = createContext();
const ArticleDispatchContext = createContext();

const initialState = {
  articles: [],
  selectedArticle: null,
  section: 'home',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return { ...state, articles: action.payload };
    case 'SET_SELECTED_ARTICLE':
      return { ...state, selectedArticle: action.payload };
    case 'SET_SECTION':
      return { ...state, section: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const ArticleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticleStateContext.Provider value={state}>
      <ArticleDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleDispatchContext.Provider>
    </ArticleStateContext.Provider>
  );
};

const useArticles = () => {
  const state = useContext(ArticleStateContext);
  const dispatch = useContext(ArticleDispatchContext);

  if (state === undefined || dispatch === undefined) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }

  return { state, dispatch };
};

export { ArticleProvider, useArticles };

