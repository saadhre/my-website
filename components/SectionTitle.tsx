import React from "react";
import styled from "styled-components";

export const H2Title = styled.h2`
  margin-bottom: 0.7em;
`;

export const H3Title = styled.h3`
  margin-bottom: 0.5em;
`;

interface SectionTitleProps {
  variant?: "h2" | "h3"
}

export const SectionTitle: React.FC<React.PropsWithChildren<SectionTitleProps>> = ({ children, variant = "h2" }) => {
  const Title = variant === "h2" ? H2Title : H3Title;

  return <Title>{children}</Title>;
};

