import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { SocialMediumRecord } from "../graphql/generated";
import { IconLink } from "./IconLink";

interface SocialMediaIconProps {
  medium: SocialMediumRecord;
}
export const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ medium }) => {
  const { profileUrl, icon, title } = medium;

  return (
    <IconLink href={`${profileUrl}`} target="_blank" rel="noreferrer nofollow">
      <FontAwesomeIcon icon={icon as IconProp} />
    </IconLink>
  );
};
