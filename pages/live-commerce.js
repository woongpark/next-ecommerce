import {useEffect, useState, useRef} from 'react';
import Layout from '../layouts/Main';
import Footer from '../components/footer';

const LiveCommerce = () => {
  const [url, setUrl] = useState('');
  const landing = useRef(null);
  
  useEffect(() => {
    document.addEventListener('readystatechange', (event) => {
      if(document.readyState === 'complete') {
        setLandingPage()
      }
    })
    setLandingPage()
  }, [])

  function setLandingPage() {
    if(window.VcommerceWidget) {
      setUrl(window.VcommerceWidget.landingUrl)
      window.VcommerceWidget.landingIFrame = landing.current;
    }
  }
  const iframeStyle = {
    height: '50vw'
  }
  return (
    <Layout>
      <iframe src={url} ref={landing} style={iframeStyle}></iframe>
      <Footer />
    </Layout>
  )
}

  
export default LiveCommerce
  