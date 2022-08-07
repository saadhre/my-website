import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { Titled } from "../lib/types";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconLink } from "./IconLink";

export interface SocialMediaIconProps extends Titled {
  profileUrl: string;
  icon: IconProp;
}

export const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ icon, profileUrl }) => (
  <IconLink href={profileUrl} target="_blank" rel="noreferrer nofollow">
    <FontAwesomeIcon icon={icon} />
  </IconLink>
);
