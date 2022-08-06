import styled from "styled-components";

export const Richtext = styled.div`
  & p {
    margin-bottom: 1em;
    line-height: 1.3;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
