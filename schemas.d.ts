export interface ApiImageFormat {
  url: string,
  width: number,
  height: number,
}

export type ImageFormatType = "thumbnail" | "large" | "small" | "medium";

export interface ApiImage {
  data: {
    attributes: {
      url: string,
      width: number,
      height: number,
      alternativeText: string,
      formats: {
        thumbnail: ApiImageFormat,
        large: ApiImageFormat,
        small: ApiImageFormat,
        medium: ApiImageFormat,
      } | null,
    }
  }
}

export interface ApiSeo {
  metaTitle: string,
  metaDescription: string,
  keywords: string,
  metaImage: ApiImage,
  canonicalURL: string;
}

export interface ApiSocialMediaLink {
  profileUrl: string,
  icon: ApiImage,
  title: string,
}

export interface ApiPersonalData {
  attributes: {
    languages: string,
    photo: ApiImage,
    fullName: string,
    job: string,
    socialMedia: ApiSocialMediaLink[],
    latLng: string,
    companyName: string,
    street: string,
    postalCode: string,
    city: string,
    phone: string,
    contactEmail: string,
    vatId: string,
    regon: string,
  }
}

export interface ApiTechnology {
  title: string,
  url: string,
}

export interface ApiTechnologyGroup {
  title: string,
  technologies: ApiTechnology[],
}

export interface ApiHomepage {
  attributes: {
    description: string,
    technologyGroups: ApiTechnologyGroup[],
    seo: ApiSeo,
  }
}
