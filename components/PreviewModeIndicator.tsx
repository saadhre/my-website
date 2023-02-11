import styled from "styled-components";

const Wrapper = styled.a`
  position: fixed;
  top: 1em;
  right: 1em;
  display: flex;
  align-items: center;
  gap: 1em;
`;

const GreenDot = styled.div`
  width: 1em;
  height: 1em;
  border-radius: 100%;
  background-color: green;
`;

export const PreviewModeIndicator = () => {
  return (
    <Wrapper href="/api/preview-disable">
      <GreenDot />
      Preview
    </Wrapper>
  );
};
