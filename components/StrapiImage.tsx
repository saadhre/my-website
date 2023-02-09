import type { ApiImage, ImageFormatType } from "../schemas";

import Image from "next/image";
import React from "react";

import { mediaUrl } from "../lib/strapi";

interface StrapiImageProps {
  media: ApiImage,
  format?: ImageFormatType,
  alt?: string,
  priority?: boolean,
}

export const StrapiImage: React.FC<StrapiImageProps> = ({ media: { data }, format = 'medium', alt = '', ...props }) => {
  if (!data) {
    return null;
  }

  const { attributes: { url, width, height, alternativeText = alt, formats } } = data;

  const currentFormat = formats ? formats[format] : {
    width,
    height,
    url,
  };

  let imageProps = {
    alt: `${alternativeText}`,
    ...props
  };

  return (
    <Image
      {...imageProps}
      width={currentFormat.width}
      height={currentFormat.height}
      src={mediaUrl(currentFormat.url)}
    />
  );
};
