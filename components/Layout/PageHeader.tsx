import { Image as DatoImage, type ResponsiveImageType } from "react-datocms";
import styled from "styled-components";

import type { AboutRecord } from "../../graphql/generated";
import { IconsList } from "../IconsList";
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
    grid-template-columns: 156px 1fr 1fr;
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
  about: AboutRecord;
}
export const PageHeader = ({ about }: PageHeaderProps) => {
  const { photo } = about;

  return (
    <Wrapper>
      {photo && <div><DatoImage data={photo?.responsiveImage as ResponsiveImageType} /></div>}
      <HeaderMiddle about={about} />
      <div className="right-part">
        <CompanyLogo />
        <LanguageSelector />
      </div>
    </Wrapper>
  )
};
