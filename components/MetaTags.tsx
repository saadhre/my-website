import type { ApiSeo } from "../schemas";

import { NextSeoProps, NextSeo } from "next-seo";
import { useRouter } from "next/router";

import React from "react";

import { mediaUrl } from "../lib/strapi";

interface MetaImage {
  url: string;
}

export const MetaTags: React.FC<ApiSeo> = ({ metaImage, ...props }) => {
  const { locale } = useRouter();

  const nextSeoProps = {
    openGraph: {
      images: [] as MetaImage[],
      locale
    },
    title: props.metaTitle,
    description: props.metaDescription,
    keywords: props.keywords,
    canonical: props.canonicalURL,
  };

  if (metaImage) {
    nextSeoProps.openGraph.images = [{ url: mediaUrl(metaImage.data.attributes.url) }];
  }

  // @todo alternate languages

  return <NextSeo {...nextSeoProps} />;
};
