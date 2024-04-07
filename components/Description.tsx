import styled from "styled-components";

import type { Maybe, Scalars } from "../graphql/generated";

const Wrapper = styled.div`
  & p {
    margin-bottom: 1em;
    line-height: 1.3;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

interface DescriptionProps {
  content: Maybe<Scalars['String']['output']>;
}

export const Description = ({ content }: DescriptionProps) =>
  <Wrapper dangerouslySetInnerHTML={{ __html: content!.toString() }} />;
