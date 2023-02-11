import type { AppProps } from "next/app";

import "../styles/globals.css";

import React from "react";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";

interface GlobalData {
  someProp: string;
  someOtherProp: number;
}

const AppGlobalContext = React.createContext<GlobalData>({
  someProp: '',
  someOtherProp: 100,
});

interface AppPropsCustom extends AppProps {
  global: GlobalData;
}

function MyApp({ Component, pageProps, global }: AppPropsCustom) {
  const analytics = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <AppGlobalContext.Provider value={global}>
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
    </AppGlobalContext.Provider>
  );
}

export default appWithTranslation(MyApp);
