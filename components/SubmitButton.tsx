import styled from "styled-components";

import { backgroundColorTransition } from "../styles/transitions";

export const SubmitButton = styled.button`
  font-size: 1.2em;
  padding: 0.8em 1.2em;
  margin-top: 0.6em;
  appearance: none;
  border: 0;
  background-color: var(--color-alternative);
  color: var(--color-white);
  cursor: pointer;
  border-radius: var(--border-radius);
  ${backgroundColorTransition};
  
  &:hover {
    background-color: var(--color-brand);
  }
  
  &:disabled {
    pointer-events: none;
    opacity: 0.4;
  }
`;
