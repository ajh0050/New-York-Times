import React from 'react';
import { useArticles } from '../../context/ArticleContext';
import { useRouter } from 'next/router';

const generateSlug = (uri) => {
  return uri.split('/').pop();
};

const Card = ({ article }) => {
  const { dispatch, state } = useArticles();
  const { title, uri, multimedia } = article;
  const imageUrl = multimedia.find(media => media.format === 'threeByTwoSmallAt2X').url;
  const slug = generateSlug(uri);
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SELECTED_ARTICLE', payload: article });
    console.log("slug", slug,)
    console.log('encodedUri', encodeURIComponent(slug))
    router.push(`/articles/${encodeURIComponent(slug)}`);
    console.log("i fired in the handleClick function", state.selectedArticle);
  };

  return (
    <div onClick={handleClick} className="block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-300 ease-in-out cursor-pointer">
      <div className="relative h-40">
        <img src={imageUrl} className="rounded-t-lg object-cover h-full w-full" alt={title} />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
