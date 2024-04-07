import { Trans } from "next-i18next";

import type { AboutRecord } from "../../graphql/generated";
import { SocialMediaIcon } from "../SocialMediaIcon";
import { IconsList } from "../IconsList";
import { PageTitle } from "./PageTitle";
import { PageSubtitle } from "./PageSubtitle";

interface HeaderMiddleProps {
  about: AboutRecord;
}
export const HeaderMiddle = ({ about }: HeaderMiddleProps) => {
  const { fullname, job, socialMedia } = about;

  return (
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
          <SocialMediaIcon key={`Medium-${index}`} medium={medium} />
        ))}
      </IconsList>
    </div>
  );
};
