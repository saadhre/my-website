import type { NextPage } from 'next'
import type { ResponsiveImageType, TitleMetaLinkTag } from "react-datocms";
import { renderMetaTags } from "react-datocms";
import type { ApiConnectedPage, Titled } from "../lib/types";
import type { SocialMedium } from "../components/SocialMediaIcon";
import { SocialMediaIcon } from "../components/SocialMediaIcon";

import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons/faExternalLink";

import { request } from "../lib/datocms";
import { HOMEPAGE_QUERY } from "../lib/queries";

import { Layout } from "../components/Layout";
import { Avatar } from "../components/Avatar";
import { Richtext } from "../components/Richtext";
import { PageHeader } from "../components/PageHeader";
import { PageTitle } from "../components/PageTitle";
import { PageSubtitle } from "../components/PageSubtitle";
import { ContactForm } from "../components/ContactForm";
import { SectionTitle } from "../components/SectionTitle";
import { IconsList } from "../components/IconsList";
import { CompanyData } from "../components/CompanyData";
import { CompanyLogo } from "../components/CompanyLogo";
import { ViewSource } from "../components/ViewSource";

library.add(faExternalLink);

export interface Technology extends Titled {
  url: string;
}

export interface TechnologiesGroup extends Titled {
  technologies: Technology[];
}

const TechnologiesGroupWrapper = styled.div`
  line-height: 1.4;
  max-width: 750px;
`;

const TechnologyLink = styled.a`
  display: inline-flex;
  align-items: center;
  column-gap: .1em;
  
  svg {
    width: 0.7em;
    height: 0.7em;
    opacity: .6;
    transition: opacity var(--transition);
  }
  
  &:hover svg {
    opacity: 1;
  }
`;

const TechnologiesGroup: React.FC<TechnologiesGroup> = (props) => {
  const renderItems = () => {
    const items = props.technologies.map<React.ReactNode>(({ url, title }, index) =>
      <TechnologyLink key={`Link-${index}`} href={url} target="_blank" rel="noreferrer nofollow">
        {title}
        <FontAwesomeIcon icon="external-link" />
      </TechnologyLink>
    );
    return items.reduce((previousValue, currentValue) => [previousValue, ', ', currentValue]);
  };

  return (
    <TechnologiesGroupWrapper>
      <SectionTitle variant="h3">{props.title}</SectionTitle>
      {renderItems()}
    </TechnologiesGroupWrapper>
  );
}

export const ContactData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2em;
  }
`;

export interface Location {
  latitude: string;
  longitude: string;
}

export interface Homepage {
  homepage: {
    fullname: string;
    job: string;
    description: string;
    languages: string;
    socialMedia: SocialMedium[];
    photo: {
      responsiveImage: ResponsiveImageType;
    };
    technologies: TechnologiesGroup[];
    companyName: string;
    contactEmail: string;
    city: string;
    companyLocation: Location;
    phone: string;
    postalCode: string;
    regon: string;
    street: string;
    vatId: string;
    _seoMetaTags: TitleMetaLinkTag[];
  }
  site?: {
    favicon: TitleMetaLinkTag[];
  }
}

const Home: NextPage<ApiConnectedPage<Homepage>> = ({ data: { homepage, site } }) => {
  const { fullname, job, photo, languages, technologies, socialMedia, description, _seoMetaTags } = homepage

  const experience = () => new Date().getFullYear() - 2001;

  const renderMeta = () => {
    const tags = site ? _seoMetaTags.concat(site.favicon) : _seoMetaTags;
    return renderMetaTags(tags);
  }

  return (
    <Layout>
      <Head>{renderMeta()}</Head>
      <PageHeader>
        <Avatar data={photo.responsiveImage} />
        <div>
          <PageTitle>{fullname}</PageTitle>
          <PageSubtitle>{job}</PageSubtitle>
          <p>Ponad {experience()} lat doświadczenia</p>
          <IconsList>
            {socialMedia.map((medium, index) => (
              <SocialMediaIcon key={`Medium-${index}`} {...medium} />
            ))}
          </IconsList>
        </div>
        <CompanyLogo>
          Fully/:
          <strong>Stack☰d</strong>
        </CompanyLogo>
      </PageHeader>
      <Richtext dangerouslySetInnerHTML={{ __html: description }} />
      {technologies.map((value, index) => (
        <TechnologiesGroup key={`Group-${index}`} {...value} />
      ))}
      <ContactData>
        <ContactForm languages={languages} />
        <CompanyData homepage={homepage} />
      </ContactData>
      <ViewSource />
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 }
  });

  return {
    props: { data }
  };
}

export default Home
