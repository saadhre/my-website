import type { ApiTechnologyGroup } from "../../schemas";

import React from "react";
import styled from "styled-components";

import { SectionTitle } from "../SectionTitle";

interface TechnologiesGroupProps {
  group: ApiTechnologyGroup;
}

const Wrapper = styled.div`
  line-height: 1.4;
  max-width: 750px;
`;

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  column-gap: .1em;
`;

export const TechnologiesGroup: React.FC<TechnologiesGroupProps> = ({ group }) => {
  const { technologies, title } = group;

  const renderItems = () => {
    const items = technologies.map<React.ReactNode>(({ url, title }, index) =>
      <Link key={`Link-${index}`} href={`${url}`} target="_blank" rel="noreferrer nofollow">
        <span>
          {`${title}`}
          <span className="material-icons">link</span>
        </span>
      </Link>
    );
    return items.reduce((previousValue, currentValue) => [previousValue, ', ', currentValue]);
  };

  return (
    <Wrapper>
      <SectionTitle variant="h3">{title}</SectionTitle>
      {renderItems()}
    </Wrapper>
  );
}
