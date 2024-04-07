import type { GetStaticProps } from 'next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import type { AboutRecord, SkillsCategoryRecord } from "../graphql/generated";
import { HOMEPAGE_QUERY } from "../graphql/queries";
import {
  CompanyData,
  ContactForm,
  Footer,
  Layout,
  PageHeader,
  SkillsCategory,
  ViewSource
} from "../components/Layout";
import { Description } from "../components/Description";
import { fetchCmsData } from "../lib/datocms";

interface HomeProps {
  isPreview: boolean;
  homepage: {
    about: AboutRecord;
    skills: SkillsCategoryRecord[];
  }
}
const Home = ({ homepage: { about, skills }, isPreview }: HomeProps) => {
  return (
    <Layout seo={about._seoMetaTags} isPreview={isPreview}>
      <PageHeader about={about} />
      <Description content={about.description!} />
      {skills.map((group, index) => (
        <SkillsCategory key={`Group-${index}`} group={group} />
      ))}
      <Footer>
        <ContactForm languages={about.languages!} />
        <CompanyData about={about} />
      </Footer>
      <ViewSource />
    </Layout>
  )
}
export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || 'pl';

  const includeDrafts = !!context.preview;

  const { data: homepage } = await fetchCmsData({ query: HOMEPAGE_QUERY, variables: { locale }, includeDrafts });
  return {
    props: {
      isPreview: includeDrafts,
      homepage,
      ...await serverSideTranslations(locale, ['common'])
    }
  };
};
