import type { Homepage } from "../../lib/types";

import React from "react";
import { Trans } from "next-i18next";

import { SocialMediaIcon } from "../SocialMediaIcon";
import { IconsList } from "../IconsList";

import { PageTitle } from "./PageTitle";
import { PageSubtitle } from "./PageSubtitle";

export const HeaderMiddle: React.FC<Homepage> = ({ homepage: { fullname, job, socialMedia } }) => (
  <div>
    <PageTitle>{fullname}</PageTitle>
    <PageSubtitle>{job}</PageSubtitle>
    <p>
      <Trans
        i18nKey="experience"
        defaults="Ponad {{years}} lat doświadczenia"
        values={{ years: new Date().getFullYear() - 2001 }}
      />
    </p>
    <IconsList>
      {socialMedia.map((medium, index) => (
        <SocialMediaIcon key={`Medium-${index}`} {...medium} />
      ))}
    </IconsList>
  </div>
);
