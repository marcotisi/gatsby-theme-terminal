import React from "react";
import { Helmet } from "react-helmet";

import { useSiteMetadata } from "../hooks";

export const SEO: React.FC<{
  title?: string;
  description?: string;
}> = ({ title, description }) => {
  const { title: siteTitle, author } = useSiteMetadata();

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={title || siteTitle}
      titleTemplate={title ? `%s | ${siteTitle}` : undefined}
      meta={[
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:creator",
          content: author,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:card",
          content: "summary",
        },
      ]}
    />
  );
};
