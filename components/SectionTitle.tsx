import React from "react";
import styled, { css } from "styled-components";

const sharedStyles = css`
  margin-bottom: 0.7em;
`;

export const H2Title = styled.h2`
  ${sharedStyles}
`;

export const H3Title = styled.h3`
  ${sharedStyles}
`;

interface SectionTitleProps {
  variant?: "h2" | "h3"
}

export const SectionTitle: React.FC<React.PropsWithChildren<SectionTitleProps>> = ({ children, variant = "h2" }) => {
  const Title = variant === "h2" ? H2Title : H3Title;

  return <Title>{children}</Title>;
};

