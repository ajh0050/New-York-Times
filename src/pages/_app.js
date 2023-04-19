import '@/styles/globals.css'
import Layout from '../components/Layout'
import { ArticleProvider } from '../../context/ArticleContext';

export default function App({ Component, pageProps }) {
  return (
    <ArticleProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ArticleProvider>
  )
}
