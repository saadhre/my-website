import type { GetStaticProps } from 'next'
import type { ApiPersonalData, ApiHomepageHomepage } from "../schemas";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import {
  CompanyData,
  ContactForm,
  Footer,
  Layout,
  PageHeader,
  TechnologiesGroup,
  ViewSource
} from "../components/Layout";
import { MetaTags } from "../components/MetaTags";
import { StrapiMarkdown } from "../components/StrapiMarkdown";

import { QUERY_HOMEPAGE, QUERY_PERSONAL_DATA } from "../lib/queries";
import { request } from "../lib/strapi";

interface HomeProps {
  homepage: ApiHomepageHomepage;
  personalData: ApiPersonalData;
}

const Home: React.FC<HomeProps> = ({ personalData, homepage }) => {
  const { description, technologyGroups, seo } = homepage.attributes;

  return (
    <Layout>
      <MetaTags {...seo} />
      <PageHeader personalData={personalData} />
      <StrapiMarkdown content={description} />

      {technologyGroups.map((group, index) => (
        <TechnologiesGroup key={`Group-${index}`} group={group} />
      ))}

      <Footer>
        <ContactForm languages={personalData.attributes.languages} />
        <CompanyData personalData={personalData} />
      </Footer>

      <ViewSource />
      {/*{isPreviewMode && <PreviewModeIndicator />}*/}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || 'pl';
  const includeDrafts = !!context.preview;

  const personalDataResponse = await request(QUERY_PERSONAL_DATA, { locale }, includeDrafts);
  const homepageResponse = await request(QUERY_HOMEPAGE, { locale }, includeDrafts);

  return {
    props: {
      personalData: personalDataResponse.personalData.data,
      homepage: homepageResponse.homepage.data,
      ...await serverSideTranslations(locale, ['common'])
    }
  };
};

export default Home
