import { PageProps } from "gatsby";
import React from "react";

import { Layout } from "../components";
import { useCommandFromLocation } from "../hooks";

const NotFoundPage: React.FC<PageProps> = () => {
  const command = useCommandFromLocation();

  return <Layout title="Page Not Found">command not found {command}</Layout>;
};

export default NotFoundPage;
