import type { ApiSocialMediaLink } from "../schemas";

import React from "react";

import { IconLink } from "./IconLink";
import { StrapiImage } from "./StrapiImage";

interface SocialMediaIconProps {
  medium: ApiSocialMediaLink;
}

export const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ medium }) => {
  const { profileUrl, icon, title } = medium;

  return (
    <IconLink href={profileUrl} target="_blank" rel="noreferrer nofollow">
      <StrapiImage media={icon} alt={title} />
    </IconLink>
  );
};
