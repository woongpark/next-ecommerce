import {useEffect, useRef} from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { useRouter } from 'next/router';

const main = ({ children, title = 'Next.js Ecommerce' }) => {
  const main = useRef(null);
  const router = useRouter();
  const pathname = router.pathname;
  useEffect(() => {
    if(!window.vcommerceBrandSite) {
      window.vcommerceBrandSite = main.current;
    }
  }, [])
  return (
    <div className="app-main">
      <Head>
        <title>{ title }</title>
      </Head>

      <Header />

      <main ref={main} className={(pathname !== '/' ? 'main-page' : '')}>
        { children }
      </main>
    </div>
  )
}
export default main