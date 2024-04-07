import type { PropsWithChildren } from "react";
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
export const SectionTitle = ({ children, variant = "h2" }: PropsWithChildren<SectionTitleProps>) => {
  const Title = variant === "h2" ? H2Title : H3Title;

  return <Title>{children}</Title>;
};

