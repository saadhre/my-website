import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const Wrapper = styled.div`
  & p {
    margin-bottom: 1em;
    line-height: 1.3;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

interface StrapiMarkdownProps {
  content: string;
}

export const StrapiMarkdown: React.FC<StrapiMarkdownProps> = ({ content }) => (
  <Wrapper>
    <ReactMarkdown>{content}</ReactMarkdown>
  </Wrapper>
);
