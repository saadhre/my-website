import type { OpenGraphMedia } from "next-seo/lib/types";
import type { ApiSeo } from "../schemas";

import { NextSeoProps, NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";

import { mediaUrl } from "../lib/strapi";

export const MetaTags: React.FC<ApiSeo> = ({ metaImage, ...props }) => {
  const { locale } = useRouter();

  const nextSeoProps = {
    openGraph: {
      images: [] as OpenGraphMedia[],
      locale
    },
    title: props.metaTitle,
    description: props.metaDescription,
    keywords: props.keywords,
    canonical: props.canonicalURL,
  } as NextSeoProps;

  if (metaImage && nextSeoProps.openGraph) {
    nextSeoProps.openGraph.images = [{ url: mediaUrl(metaImage.data.attributes.url) }];
  }

  // @todo alternate languages

  return <NextSeo {...nextSeoProps} />;
};
