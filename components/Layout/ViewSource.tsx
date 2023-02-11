import { Trans } from "next-i18next";
import React from "react";
import styled from "styled-components";

const Link = styled.a`
  display: flex;
  align-items: center;
  column-gap: 0.5em;
  font-size: 0.9em;
  
  .material-icons {
    position: relative;
    top: 6px;
    margin-right: 5px;
  }
`;

export const ViewSource: React.FC = () => (
  <Link
    href="https://github.com/saadhre/my-website"
    rel="noreferrer nofollow"
    target="_blank"
  >
    <span>
      <span className="material-icons">code</span>
      <Trans
        i18nKey="viewSource"
        defaults="Zobacz kod tej strony"
      />
    </span>
  </Link>
);
