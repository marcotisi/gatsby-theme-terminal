const withDefaults = require("./utils/default-options");

module.exports = themeOptions => {
  const options = withDefaults(themeOptions);
  const { mdxOtherwiseConfigured = false } = themeOptions;

  return {
    siteMetadata: {
      author: "twitter_author",
      title: "Gatsby Theme Terminal",
      description: "Description",
      helpText: "Type 'help' and press Enter to start",
      user: "guest",
      host: "gatsby-theme-terminal.dev",
    },
    plugins: [
      !mdxOtherwiseConfigured && {
        resolve: "gatsby-plugin-mdx",
        options: {
          extensions: [".mdx", ".md"],
          gatsbyRemarkPlugins: [
            { resolve: "gatsby-remark-copy-linked-files" },
            { resolve: "gatsby-remark-smartypants" },
          ],
          remarkPlugins: [require("remark-slug")],
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: options.commandsPath || "commands",
          name: options.commandsPath || "commands",
        },
      },
      "gatsby-plugin-react-helmet",
    ].filter(Boolean),
  };
};
