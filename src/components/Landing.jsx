import React, { useEffect } from 'react';
import { useArticles } from '../../context/ArticleContext';
import Card from './Card';

const Landing = () => {
  const { state, dispatch } = useArticles();

  const handleSectionChange = (event) => {
    dispatch({ type: 'SET_SECTION', payload: event.target.value });
  };

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

  const sections = [
    'arts', 'automobiles', 'books', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world'
  ];

  return (
    <div className="container mx-auto px-4" style={{ minHeight: '80vh' }}>
      <div>
        <h1 className="text-xl font-semibold mb-2">Category</h1>
        <select onChange={handleSectionChange} value={state.section} className="mb-8 text-black">
          {sections.map((section) => (
            <option key={section} value={section}>
              {changeFirstLetterToUpperCase(section)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards}
      </div>
    </div>
  );
};

export default Landing;
