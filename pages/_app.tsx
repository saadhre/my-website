import type { AppProps } from "next/app";

import "../styles/globals.css";

import ReactGA from 'react-ga';
import { appWithTranslation } from "next-i18next";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

if (googleAnalyticsId) {
  ReactGA.initialize(googleAnalyticsId);
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
