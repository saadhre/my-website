import type { NextPage, NextPageContext } from 'next'
import type { ApiConnectedPage, Homepage, SiteData } from "../lib/types";

import React from "react";
import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { request } from "../lib/datocms";
import { HOMEPAGE_QUERY } from "../lib/queries";

import {
  CompanyData,
  ContactForm,
  Footer,
  Layout,
  PageHeader,
  TechnologiesGroup,
  ViewSource
} from "../components/Layout";
import { Richtext } from "../components/Richtext";

const Home: NextPage<ApiConnectedPage<Homepage & SiteData>> = ({ data: { homepage, site } }) => {
  const { languages, technologies, description, _seoMetaTags } = homepage

  const renderMeta = () => {
    const tags = site ? _seoMetaTags.concat(site.favicon) : _seoMetaTags;
    return renderMetaTags(tags);
  }

  return (
    <Layout>
      <Head>{renderMeta()}</Head>

      <PageHeader homepage={homepage} />

      <Richtext dangerouslySetInnerHTML={{ __html: description }} />

      {technologies.map((value, index) => (
        <TechnologiesGroup key={`Group-${index}`} {...value} />
      ))}

      <Footer>
        <ContactForm languages={languages} />
        <CompanyData homepage={homepage} />
      </Footer>

      <ViewSource />
    </Layout>
  )
}

export async function getStaticProps(context: NextPageContext) {
  const currenLocale = context.locale || 'pl';

  const data = await request({
    query: HOMEPAGE_QUERY.replace(/:locale:/g, currenLocale),
    variables: { limit: 10 }
  });

  return {
    props: {
      data,
      ...await serverSideTranslations(currenLocale, ['common'])
    }
  };
}

export default Home
