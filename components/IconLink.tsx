import styled from "styled-components";

export const IconLink = styled.a.attrs(() => ({
  size: '24px',
}))`
  display: block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  
  > img {
    display: block;
    min-width: ${({ size }) => size};
    max-width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`;
