import React from "react";
import { Trans } from "next-i18next";
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

export const ViewSource: React.FC = () => (
  <Link
    href="https://github.com/saadhre/my-website"
    rel="noreferrer nofollow"
    target="_blank"
  >
    <FontAwesomeIcon icon="code" />
    <Trans
      i18nKey="viewSource"
      defaults="Zobacz kod tej strony"
    />
  </Link>
);
