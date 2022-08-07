import styled from "styled-components";

import { library } from "@fortawesome/fontawesome-svg-core";

import { faExternalLink } from "@fortawesome/free-solid-svg-icons/faExternalLink";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";

library.add(faExternalLink, faCode);

export const Layout = styled.div`
  padding: 15px 15px;
  display: flex;
  flex-direction: column;
  gap: 2em;
  max-width: 1200px;
  margin: 0 auto;
`;
