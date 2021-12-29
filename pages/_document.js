import { Fragment } from 'react'
import Document, { Head, Main, NextScript, Html } from 'next/document'
import { GA_TRACKING_ID } from '../utils/gtag';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage
    const initialProps = await Document.getInitialProps(ctx)

    // Check if in production
    const isProduction = process.env.NODE_ENV === 'production'

    return {
      ...initialProps,
      isProduction,
    }
  }

  render() {
    const { isProduction } = this.props

    return (
      <Html lang="en">
        <Head>
          {/* We only want to add the scripts if in production */}
          
          <script type="text/javascript" src="https://localhost:8080/vcommerce-loader.js?teamId=MkJu7TFX9pXXombqtVUA&roomId=j8VJ9jwFoqXsIKWlIPPq"></script>
          <script 
            dangerouslySetInnerHTML={{
              __html: `
                if(window.location.pathname === '/live-commerce') {
                  document.addEventListener('readystatechange', (event) => {
                    if(document.readyState === 'complete') {
                      window.VcommerceWidget && window.VcommerceWidget('init')
                    }
                  });
                }
              `,
            }}
          />
          {isProduction && (
            <Fragment>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </Fragment>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}