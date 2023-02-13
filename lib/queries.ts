import { gql } from "graphql-request";

const FRAGMENT_IMAGE = gql`
  fragment Image on UploadFileEntityResponse {
    data {
      attributes {
        url
        previewUrl
        width
        height
        alternativeText
        formats
      }
    }
  }
`;

export const QUERY_PERSONAL_DATA = gql`
  query GetPersonalData($locale: I18NLocaleCode) {
    personalData(locale: $locale) {
      data {
        attributes {
          fullName
          languages
          job
          companyName
          street
          postalCode
          city
          vatId
          regon
          contactEmail
          phone
          latLng
          socialMedia {
            title
            profileUrl
            icon {
              ...Image
            }
          }
          photo {
            ...Image
          }
        }
      }
    }
  }
  
  ${FRAGMENT_IMAGE}
`

export const QUERY_HOMEPAGE = gql`
  query GetHomepage($locale: I18NLocaleCode) {
    homepage(locale: $locale) {
      data {
        attributes {
          locale
          description
          technologyGroups {
            title
            technologies {
              title
              url
            }
          }
          seo {
            metaTitle
            metaDescription
            keywords
            metaImage {
              ...Image
            }
          }
        }
      }
    }
  }
  
  ${FRAGMENT_IMAGE}
`;
