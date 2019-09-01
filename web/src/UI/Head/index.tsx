import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

type TextType = string | null

interface Props {
  color?: TextType
  appName?: TextType
  creator?: TextType
  title?: TextType
  description?: TextType
  image?: TextType
}

const Head: FC<Props> = (props) => {
  const {
    color,
    appName,
    creator,
    title,
    description,
    image,
  } = props

  return (
    <>
      {color && (
        <Helmet>
          <meta
            name="msapplication-TileColor"
            content={color}
          />

          <meta
            name="theme-color"
            content={color}
          />
        </Helmet>
      )}

      {appName && (
        <Helmet>
          <meta
            name="twitter:site"
            content={appName}
          />

          <meta
            property="og:site_name"
            content={appName}
          />

          <meta
            name="application-name"
            content={appName}
          />

          <meta
            name="apple-mobile-web-app-title"
            content={appName}
          />
        </Helmet>
      )}

      {color && (
        <Helmet>
          <meta
            name="keywords"
            content="Skill Hunter self-education education self-development development courses book share knowledge"
          />
        </Helmet>
      )}

      {creator && (
        <Helmet>
          <meta
            name="author"
            content={creator}
          />

          <meta
            name="twitter:creator"
            content={creator}
          />
        </Helmet>
      )}

      {title && (
        <Helmet>
          <title>{title}</title>
          <meta
            itemProp="name"
            content={title}
          />
          <meta
            name="twitter:title"
            content={title}
          />
          <meta
            property="og:title"
            content={title}
          />
        </Helmet>
      )}

      {description && (
        <Helmet>
          <meta
            name="description"
            content={description}
          />
          <meta
            itemProp="description"
            content={description}
          />
          <meta
            name="twitter:description"
            content={description}
          />
          <meta
            property="og:description"
            content={description}
          />
          <meta
            name="msapplication-tooltip"
            content={description}
          />
        </Helmet>
      )}

      {image && (
        <Helmet>
          <meta
            itemProp="image"
            content={image}
          />
          <meta
            property="og:image"
            content={image}
          />
          <meta
            name="twitter:image"
            content={image}
          />
        </Helmet>
      )}
    </>
  )
}

export default Head
