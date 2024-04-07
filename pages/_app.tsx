import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";

import "../styles/globals.css";

interface AppPropsCustom extends AppProps {}
function MyApp({ Component, pageProps }: AppPropsCustom) {
  const analytics = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      <Component {...pageProps} />
      {analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${analytics}`} strategy="afterInteractive" />
          <Script
            id="googleAnalytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', '${analytics}');`
            }}
          />
        </>
      )}
    </>
  );
}

export default appWithTranslation(MyApp);
