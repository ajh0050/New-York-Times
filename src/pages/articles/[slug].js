// // pages/article/[slug].js
// import { useRouter } from 'next/router';

// const Article = () => {
//   const router = useRouter();
//   const { slug } = router.query;
//   const title = slug.split('-').join(' ');

//   return (
//     <div>
//       <h1>{title}</h1>
//     </div>
//   );
// };

// export default Article;

// pages/article/[slug].js
import { useRouter } from 'next/router';
import { useArticles } from '../../context/ArticleContext';

const Article = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { state } = useArticles();
  const selectedArticle = state.articles.find(article => generateSlug(article.uri) === slug);

  const generateSlug = (uri) => {
    return uri.split('/').pop();
  };

  return (
    <div>
      {selectedArticle && <h1>{selectedArticle.title}</h1>}
    </div>
  );
};

export default Article;
