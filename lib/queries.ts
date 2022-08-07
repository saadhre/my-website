export const HOMEPAGE_QUERY = `query MyQuery {
  site: _site {
    favicon: faviconMetaTags {
      attributes
      content
      tag
    }
  }
  homepage(locale: :locale:) {
    fullname
    job
    description
    languages
    socialMedia {
      title
      profileUrl
      icon
    }
    photo {
      responsiveImage(
          imgixParams: { fit: crop, w: 175, h: 175, auto: format }
        ) {
          srcSet
          webpSrcSet
          sizes
          src
          width
          height
          aspectRatio
          alt
          title
          bgColor
          base64
        }
    }
    technologies {
      title
      technologies {
        title
        url
      }
    }
    companyName
    contactEmail
    city
    companyLocation {
      latitude
      longitude
    }
    phone
    postalCode
    regon
    street
    vatId
    _seoMetaTags {
      attributes
      content
      tag
    }
  }
}
`
