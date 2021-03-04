import { graphql, useStaticQuery } from "gatsby";

export const useAllCommand = () => {
  const { allCommand } = useStaticQuery<{
    allCommand: {
      nodes: Array<{
        command: string;
        description: string;
      }>;
    };
  }>(
    graphql`
      query Commands {
        allCommand {
          nodes {
            command
            description
          }
        }
      }
    `,
  );

  return allCommand.nodes;
};
