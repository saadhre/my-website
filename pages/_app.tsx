import type { AppProps } from "next/app";

import "../styles/globals.css";

import React from "react";
import ReactGA from 'react-ga';
import { appWithTranslation } from "next-i18next";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

if (googleAnalyticsId) {
  ReactGA.initialize(googleAnalyticsId);
}

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
  return (
    <AppGlobalContext.Provider value={global}>
      <Component {...pageProps} />
    </AppGlobalContext.Provider>
  );
}

export default appWithTranslation(MyApp);
