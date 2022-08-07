import type { Homepage } from "../../lib/types";

import React from "react";
import styled from "styled-components";

import { IconsList } from "../IconsList";

import { Avatar } from "./Avatar";
import { HeaderMiddle } from "./HeaderMiddle";
import { CompanyLogo } from "./CompanyLogo";
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

    ${Avatar} {
      margin-bottom: 0;
    }

    ${IconsList} {
      margin-top: 1em;
    }

    .right-part {
      grid-column: 3;
      text-align: right;
    }
  }
`;

export const PageHeader: React.FC<Homepage> = ({ homepage }) => {
  const { photo } = homepage

  return (
    <Wrapper>
      <Avatar data={photo.responsiveImage} />
      <HeaderMiddle homepage={homepage} />
      <div className="right-part">
        <CompanyLogo />
        <LanguageSelector />
      </div>
    </Wrapper>
  )
};
