import { GatsbyBrowser } from "gatsby";
import React from "react";

import { HistoryProvider } from "../hooks";
import { Header } from "./Header";
import { History } from "./History";
import { ThemeConfig } from "./ThemeConfig";

export const WrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => (
  <HistoryProvider>
    <main>
      <ThemeConfig />
      <Header />
      <History />
      {element}
    </main>
  </HistoryProvider>
);
