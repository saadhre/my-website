import React from "react";
import styled from "styled-components";

import { colorTransition } from "../../styles/transitions";

const Wrapper = styled.div`
  font-size: 2.4em;
  color: var(--color-alternative);
  cursor: pointer;

  &:hover {
    ${colorTransition};
    color: var(--color-brand);
  }
`;

export const CompanyLogo: React.FC = () =>
  <Wrapper>
    Fully/:
    <strong>Stack☰d</strong>
  </Wrapper>;
