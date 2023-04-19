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

  const cards = state.articles.map((article) => {
    return <Card key={article.url} article={article} />;
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-semibold mb-8">Home</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards}
      </div>
    </div>
  );
};

export default Landing;

