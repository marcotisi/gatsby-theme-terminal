import React from "react";

import { Layout } from "../components";
import { useSiteMetadata } from "../hooks";

const IndexPage: React.FC = () => {
  const { description } = useSiteMetadata();

  return <Layout title="Home" description={description} />;
};

export default IndexPage;
