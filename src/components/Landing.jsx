import React, { useEffect } from 'react';
import { useArticles } from '../../context/ArticleContext';
import Card from './Card';

const Landing = () => {
  const { state, dispatch } = useArticles();

  useEffect(() => {
    const fetchArticles = async () => {
      const url = '/api/getArticles';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section: state.section }),
      };
      
      try {
        const response = await fetch(url, options);

        if (response.ok) {
          const data = await response.json();
          dispatch({ type: 'SET_ARTICLES', payload: data });
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [dispatch, state.section]);

  const cards = state.articles?.map((article) => {
    return <Card key={article.url} article={article} />;
  });

  const changeFirstLetterToUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container mx-auto px-4" style={{ minHeight: '80dvh' }}>
      <h1 className="text-4xl font-semibold mb-8">{changeFirstLetterToUpperCase(state.section)}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards}
      </div>
    </div>
  );
};

export default Landing;
