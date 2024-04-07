import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import type { SkillsCategoryRecord } from "../../graphql/generated";
import { SectionTitle } from "../SectionTitle";

const Wrapper = styled.div`
  line-height: 1.4;
  max-width: 750px;
`;

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  column-gap: .1em;
  
  sup {
    position: relative;
    top: -5px;
  }
`;

interface TechnologiesGroupProps {
  group: SkillsCategoryRecord;
}
export const SkillsCategory = ({ group }: TechnologiesGroupProps) => {
  const { technologies, title } = group;

  const renderItems = () => {
    const items = technologies.map<React.ReactNode>(({ url, title }, index) =>
      <Link key={`Link-${index}`} href={`${url}`} target="_blank" rel="noreferrer nofollow">
        {`${title}`}
        <sup>
          <FontAwesomeIcon icon={faLink} size={"xs"} />
        </sup>
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
