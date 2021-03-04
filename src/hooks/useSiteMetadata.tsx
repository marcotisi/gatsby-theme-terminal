import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<{
    site: {
      siteMetadata: {
        author?: string;
        title?: string;
        description?: string;
        helpText?: string;
        user?: string;
        host?: string;
      };
    };
  }>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          author
          title
          description
          helpText
          user
          host
        }
      }
    }
  `);

  return site.siteMetadata;
};
