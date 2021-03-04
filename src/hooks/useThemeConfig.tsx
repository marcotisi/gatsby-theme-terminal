import { graphql, useStaticQuery } from "gatsby";

export const useThemeConfig = () => {
  const { terminalThemeConfig } = useStaticQuery<{
    terminalThemeConfig: {
      maxWidth?: string;
      fontFamily?: string;
      backgroundColor?: string;
      textColor?: string;
      promptPrefixColor?: string;
      promptTextColor?: string;
      promptSuffixColor?: string;
      scrollbarWidth?: string;
      scrollbarBackgroundColor?: string;
      scrollbarThumbBackgroundColor?: string;
      scrollbarTrackBackgroundColor?: string;
    };
  }>(graphql`
    query ThemeConfig {
      terminalThemeConfig(id: { eq: "gatsby-theme-terminal" }) {
        maxWidth
        fontFamily
        backgroundColor
        textColor
        promptPrefixColor
        promptTextColor
        promptSuffixColor
        scrollbarWidth
        scrollbarBackgroundColor
        scrollbarTrackBackgroundColor
        scrollbarThumbBackgroundColor
      }
    }
  `);

  return terminalThemeConfig;
};
