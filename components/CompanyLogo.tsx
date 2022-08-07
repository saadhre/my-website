import styled from "styled-components";

import { colorTransition } from "../styles/transitions";

export const CompanyLogo = styled.div`
  font-size: 2.4em;
  color: var(--color-alternative);
  cursor: pointer;

  &:hover {
    ${colorTransition};
    color: var(--color-brand);
  }
`;
