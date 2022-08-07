import type { Titled } from "../../lib/types";

import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { opacityTransition } from "../../styles/transitions";
import { SectionTitle } from "../SectionTitle";

export interface Technology extends Titled {
  url: string;
}

export interface TechnologiesGroupProps extends Titled {
  technologies: Technology[];
}

const Wrapper = styled.div`
  line-height: 1.4;
  max-width: 750px;
`;

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  column-gap: .1em;

  svg {
    width: 0.7em;
    height: 0.7em;
    opacity: .6;
    ${opacityTransition}
  }

  &:hover svg {
    opacity: 1;
  }
`;

export const TechnologiesGroup: React.FC<TechnologiesGroupProps> = (props) => {
  const renderItems = () => {
    const items = props.technologies.map<React.ReactNode>(({ url, title }, index) =>
      <Link key={`Link-${index}`} href={url} target="_blank" rel="noreferrer nofollow">
        {title}
        <FontAwesomeIcon icon="external-link" />
      </Link>
    );
    return items.reduce((previousValue, currentValue) => [previousValue, ', ', currentValue]);
  };

  return (
    <Wrapper>
      <SectionTitle variant="h3">{props.title}</SectionTitle>
      {renderItems()}
    </Wrapper>
  );
}
