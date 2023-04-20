import React, { useState, useEffect } from 'react';
import { useArticles } from '../../../context/ArticleContext';

const Article = () => {
  const { state } = useArticles();
  const [articleText, setArticleText] = useState(null);
  const selectedArticle = state.selectedArticle;

  useEffect(() => {
    if (selectedArticle) {
      fetch('/api/articleText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: selectedArticle.url }),
      })
        .then((response) => response.json())
        .then((data) => {
          setArticleText(data.articleText);
        })
        .catch((error) => {
          console.error('Error calling API:', error);
        });
    }
  }, [selectedArticle]);
  


  return (
    <div className="bg-gray-100" style={{ minHeight: "85dvh" }}>
      {selectedArticle && (
        <div className="max-w-5xl mx-auto">
          <div
            className="relative h-96 md:h-80 xl:h-96 overflow-hidden shadow-md"
          >
            <img
              className="absolute top-0 left-0 w-full h-full object-cover object-center transition duration-500 ease-in-out transform hover:scale-110"
              src={selectedArticle.multimedia[0].url}
              alt={selectedArticle.multimedia[0].caption}
            />
            <div className="absolute inset-x-0 bottom-0 px-4 py-2 bg-white bg-opacity-80">
              <p className="text-gray-800 font-medium">
                Photo by {selectedArticle.multimedia[0].caption}
              </p>
            </div>
          </div>
          <div className="my-8">
            <p className="text-gray-500 text-sm mx-8">
              {selectedArticle.byline} |{' '}
              {new Date(selectedArticle.published_date).toLocaleDateString()}
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-black mb-4 mx-8">
            {selectedArticle.title}
          </h1>
          <p className="text-black text-lg xl:text-xl pb-8 mx-8">
            {articleText}
          </p>
        </div>
      )}
    </div>
  );
};

export default Article;
