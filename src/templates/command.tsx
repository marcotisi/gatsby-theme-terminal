import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";

import { Layout } from "../components";

export const query = graphql`
  query($id: String!) {
    command(id: { eq: $id }) {
      title
      description
      body
    }
  }
`;

export const Command: React.FC<PageProps<{
  command: {
    title: string;
    description: string;
    body: string;
  };
}>> = ({ data }) => (
  <Layout title={data.command.title} description={data.command.description}>
    <MDXRenderer>{data.command.body}</MDXRenderer>
  </Layout>
);

export default Command;
