import React from "react";
import { Helmet } from "react-helmet";

import { useThemeConfig } from "../hooks";

export const ThemeConfig: React.FC = () => {
  const {
    maxWidth,
    fontFamily,
    backgroundColor,
    textColor,
    promptPrefixColor,
    promptTextColor,
    promptSuffixColor,
    scrollbarWidth,
    scrollbarBackgroundColor,
    scrollbarTrackBackgroundColor,
    scrollbarThumbBackgroundColor,
  } = useThemeConfig();

  const themeConfig = {
    "--max-width": maxWidth,
    "--font-family": fontFamily,
    "--background-color": backgroundColor,
    "--text-color": textColor,
    "--prompt-prefix-color": promptPrefixColor,
    "--prompt-text-color": promptTextColor,
    "--prompt-suffix-color": promptSuffixColor,
    "--scrollbar-width": scrollbarWidth,
    "--scrollbar-background-color": scrollbarBackgroundColor,
    "--scrollbar-track-background-color": scrollbarTrackBackgroundColor,
    "--scrollbar-thumb-background-color": scrollbarThumbBackgroundColor,
  };

  return (
    <Helmet>
      <style type="text/css">{`:root { ${Object.entries(themeConfig)
        .filter(([_, value]) => Boolean(value))
        .map(([key, value]) => `${key}: ${value};`)
        .join("")} }`}</style>
    </Helmet>
  );
};
