import styled from "styled-components";
import { Image } from "react-datocms";

export const Avatar = styled(Image)`
  --size: 175px;
  min-width: var(--size);
  max-width: var(--size);
  height: var(--size);
`;
