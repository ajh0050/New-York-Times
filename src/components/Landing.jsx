import React, { useEffect } from 'react';
import { useArticles } from '../../context/ArticleContext';
import Card from './Card';

const Landing = () => {
  const { state, dispatch } = useArticles();

  useEffect(() => {
    const fetchArticles = async () => {
      const api_key = 'zhTVqkUYCbU5g7t6AVlPemif0Wm8IrkF';
      const url = `https://api.nytimes.com/svc/topstories/v2/${state.section}.json?api-key=${api_key}`;

      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          dispatch({ type: 'SET_ARTICLES', payload: data.results });
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [dispatch, state.section]);

  // Function to change section state
  const changeSection = (newSection) => {
    dispatch({ type: 'SET_SECTION', payload: newSection });
  };

  const cards = state.articles.map((article) => {
    return <Card key={article.url} article={article} />;
    });

  return (
    <div>
      <h1>Home</h1>
      {cards}
    </div>
  );
};

export default Landing;
