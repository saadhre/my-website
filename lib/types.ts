import type { ResponsiveImageType, TitleMetaLinkTag } from "react-datocms";
import type { FieldError } from "react-hook-form";

import type { SocialMediaIconProps } from "../components/SocialMediaIcon";
import type { TechnologiesGroupProps } from "../components/Layout";

export interface Titled {
  title: string;
}

export interface ApiConnectedPage<T> {
  data: T;
}

export interface SiteData {
  site: {
    favicon: TitleMetaLinkTag[];
    locales: string[];
  }
}

export interface Location {
  latitude: string;
  longitude: string;
}

export interface Homepage {
  homepage: {
    fullname: string;
    job: string;
    description: string;
    languages: string;
    socialMedia: SocialMediaIconProps[];
    photo: {
      responsiveImage: ResponsiveImageType;
    };
    technologies: TechnologiesGroupProps[];
    companyName: string;
    contactEmail: string;
    city: string;
    companyLocation: Location;
    phone: string;
    postalCode: string;
    regon: string;
    street: string;
    vatId: string;
    _seoMetaTags: TitleMetaLinkTag[];
  }
}

export interface FieldErrorProps {
  error?: FieldError | { message: string }
}
