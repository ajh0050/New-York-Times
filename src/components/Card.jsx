// components/Card.js
import React from 'react';
import Link from 'next/link';

const Card = ({ article }) => {
  const { title, url, multimedia } = article;
  const imageUrl = multimedia.find(media => media.format === 'threeByTwoSmallAt2X').url;
  const slug = title.toLowerCase().split(' ').join('-');

  return (
    <Link href={`/article/${encodeURIComponent(slug)}`}>
      <a className="block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-300 ease-in-out">
        <div className="relative h-40">
          <img src={imageUrl} className="rounded-t-lg object-cover h-full w-full" alt={title} />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        </div>
      </a>
    </Link>
  );
};

export default Card;

