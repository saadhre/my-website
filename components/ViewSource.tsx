import React from "react";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";

library.add(faCode);

const Link = styled.a`
  display: flex;
  align-items: center;
  column-gap: 0.5em;
  font-size: 0.9em;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ViewSource = () => (
  <Link href="https://github.com/saadhre/my-website" target="_blank" rel="noreferrer nofollow">
    <FontAwesomeIcon icon="code" />
    Zobacz kod tej strony
  </Link>
);
