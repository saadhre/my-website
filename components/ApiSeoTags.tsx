import type { ApiSeo } from "../schemas";

import { NextSeoProps, NextSeo } from "next-seo";
import { useRouter } from "next/router";

import React from "react";

import { mediaUrl } from "../lib/strapi";

export const ApiSeoTags: React.FC<NextSeoProps & ApiSeo> = ({ ogImage, ...props }) => {
  const { locale } = useRouter();

  // @todo alternate languages

  return (
    <NextSeo
      {...props}
      openGraph={{ images: [{ url: mediaUrl(ogImage?.data.attributes.url) }], locale }}
    />
  );
};
