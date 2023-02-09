import type { ApiPersonalData } from "../../schemas";

import { Trans } from "next-i18next";
import React from "react";

import { SocialMediaIcon } from "../SocialMediaIcon";
import { IconsList } from "../IconsList";

import { PageTitle } from "./PageTitle";
import { PageSubtitle } from "./PageSubtitle";

interface HeaderMiddleProps {
  personalData: ApiPersonalData;
}

export const HeaderMiddle: React.FC<HeaderMiddleProps> = ({ personalData }) => {
  const { fullName, job, socialMedia } = personalData.attributes;

  return (
    <div>
      <PageTitle>{fullName}</PageTitle>
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
          <SocialMediaIcon key={`Medium-${index}`} medium={medium} />
        ))}
      </IconsList>
    </div>
  );
};
