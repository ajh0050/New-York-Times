// pages/article/[slug].js
import { useRouter } from 'next/router';

const Article = () => {
  const router = useRouter();
  const { slug } = router.query;
  const title = slug.split('-').join(' ');

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Article;
