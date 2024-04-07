import { gql } from "graphql-request";

export const HOMEPAGE_QUERY = gql`
  query Homepage($locale: SiteLocale) {
    about(locale:$locale) {
      photo {
        responsiveImage(imgixParams: { w: 156, h: 156, fm: webp }) {
          sizes
          src
          width
          height
          alt
          title
          base64
        }
      }
      fullname
      job
      languages
      socialMedia {
        title
        icon
        profileUrl
      }
      description
      companyName
      companyLocation {
        latitude
        longitude
      }
      street
      postalCode
      city
      phone
      contactEmail
      vatId
      regon
      _seoMetaTags {
        attributes
        content
        tag
      }
    }

    skills: allSkillsCategories(locale:$locale) {
      title
      technologies {
        title
        url
      }
    }
  }
`;
