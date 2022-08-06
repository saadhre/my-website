import styled from "styled-components";

export const CompanyLogo = styled.div`
  font-size: 3em;
  color: var(--color-alternative);
  //align-self: flex-start;
  //flex: 1;
  //text-align: right;
  cursor: pointer;

  &:hover {
    color: var(--color-brand);
    transition: var(--transition-color);
  }
`;
