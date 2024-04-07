import styled from "styled-components";

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2em;
  }
`;
