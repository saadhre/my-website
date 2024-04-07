import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Trans } from "next-i18next";
import styled from "styled-components";

const Link = styled.a`
  display: flex;
  align-items: center;
  column-gap: 0.5em;
  font-size: 0.9em;
`;

export const ViewSource = () => (
  <Link
    href="https://github.com/saadhre/my-website"
    rel="noreferrer nofollow"
    target="_blank"
  >
    <FontAwesomeIcon icon={faGithub} size="lg" />
    <Trans
      i18nKey="viewSource"
      defaults="Zobacz kod tej strony"
    />
  </Link>
);
