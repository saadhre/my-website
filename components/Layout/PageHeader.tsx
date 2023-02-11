import type { ApiPersonalData } from "../../schemas";

import React from "react";
import styled from "styled-components";

import { IconsList } from "../IconsList";
import { StrapiImage } from "../StrapiImage";

import { CompanyLogo } from "./CompanyLogo";
import { HeaderMiddle } from "./HeaderMiddle";
import { LanguageSelector } from "./LanguageSelector";

const Wrapper = styled.div`
  display: grid;
  row-gap: 1.5em;

  ${IconsList} {
    margin-top: 1.5em;
  }

  .right-part {
    grid-row: 1;
    display: flex;
    flex-direction: column;
    row-gap: .8em;
  }

  @media (min-width: 768px) {
    grid-template-columns: 150px 1fr 1fr;
    grid-column-gap: 3em;

    ${IconsList} {
      margin-top: 1em;
    }

    .right-part {
      grid-column: 3;
      text-align: right;
    }
  }
`;

interface PageHeaderProps {
  personalData: ApiPersonalData;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ personalData }) => {
  const { attributes: { photo } } = personalData;

  return (
    <Wrapper>
      <StrapiImage media={photo} priority format="thumbnail" />
      <HeaderMiddle personalData={personalData} />
      <div className="right-part">
        <CompanyLogo />
        <LanguageSelector />
      </div>
    </Wrapper>
  )
};
