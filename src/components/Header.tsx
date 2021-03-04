import React from "react";

import { useSiteMetadata } from "../hooks";

export const Header: React.FC = () => {
  const { title, description, helpText } = useSiteMetadata();

  if (!title && !description) {
    return null;
  }

  return (
    <header>
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
      {helpText && <small>{helpText}</small>}
    </header>
  );
};
