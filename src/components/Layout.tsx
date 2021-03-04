import React, { useEffect } from "react";

import { useCommandFromLocation, useHistory } from "../hooks";
import { Prompt } from "./Prompt";
import { SEO } from "./SEO";

export const Layout: React.FC<{
  title?: string;
  description?: string;
}> = ({ title, description, children: element }) => {
  const { pushToHistory } = useHistory();
  const command = useCommandFromLocation();
  const isSSR = typeof window === "undefined";

  useEffect(() => {
    if (!command) {
      return;
    }

    pushToHistory({
      command,
      element,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SEO title={title} description={description} />
      {isSSR ? (
        <>
          <Prompt value={command} />
          {element}
        </>
      ) : (
        <Prompt element={element} />
      )}
    </>
  );
};
