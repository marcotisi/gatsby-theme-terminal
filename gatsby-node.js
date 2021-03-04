const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const debug = require("debug");
const { createFilePath } = require("gatsby-source-filesystem");
const { urlResolve, createContentDigest } = require("gatsby-core-utils");
const withDefaults = require("./utils/default-options");

const debugTheme = debug("gatsby-theme-terminal");

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();
  const { commandsPath } = withDefaults(themeOptions);
  const dir = path.join(program.directory, commandsPath);

  debugTheme("Initializing ${dir} directory");
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }
};

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info,
) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  return await resolver(mdxNode, args, context, {
    fieldName,
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  createTypes(`interface Command @nodeInterface {
      id: ID!
      command: String!
      title: String
      description: String
      slug: String!
      body: String!
  }`);

  createTypes(
    schema.buildObjectType({
      name: "MdxCommand",
      fields: {
        id: { type: "ID!" },
        title: {
          type: "String",
        },
        command: {
          type: "String!",
        },
        description: {
          type: "String",
        },
        slug: {
          type: "String!",
        },
        body: {
          type: "String!",
          resolve: mdxResolverPassthrough("body"),
        },
      },
      interfaces: ["Node", "Command"],
      extensions: {
        infer: false,
      },
    }),
  );

  createTypes(`
    type TerminalThemeConfig implements Node {
      maxWidth: String
      fontFamily: String
      backgroundColor: String
      textColor: String
      promptPrefixColor: String
      promptTextColor: String
      promptSuffixColor: String
      scrollbarWidth: String
      scrollbarBackgroundColor: String
      scrollbarTrackBackgroundColor: String
      scrollbarThumbBackgroundColor: String
    }
  `);
};

exports.sourceNodes = (
  { actions, createContentDigest },
  terminalThemeConfig,
) => {
  const { createNode } = actions;
  const themeConfig = {
    maxWidth: terminalThemeConfig.maxWidth,
    fontFamily: terminalThemeConfig.fontFamily,
    backgroundColor: terminalThemeConfig.backgroundColor,
    textColor: terminalThemeConfig.textColor,
    promptPrefixColor: terminalThemeConfig.promptPrefixColor,
    promptTextColor: terminalThemeConfig.promptTextColor,
    promptSuffixColor: terminalThemeConfig.promptSuffixColor,
    scrollbarWidth: terminalThemeConfig.scrollbarWidth,
    scrollbarBackgroundColor: terminalThemeConfig.scrollbarBackgroundColor,
    scrollbarTrackBackgroundColor:
      terminalThemeConfig.scrollbarTrackBackgroundColor,
    scrollbarThumbBackgroundColor:
      terminalThemeConfig.scrollbarThumbBackgroundColor,
  };

  createNode({
    ...themeConfig,
    id: "gatsby-theme-terminal",
    parent: null,
    children: [],
    internal: {
      type: "TerminalThemeConfig",
      contentDigest: createContentDigest(themeConfig),
      content: JSON.stringify(themeConfig),
      description: "Options for gatsby-theme-terminal",
    },
  });
};

// Create fields for command slugs and source
// This will change with schema customization with work
exports.onCreateNode = async (
  { node, actions, getNode, createNodeId },
  themeOptions,
) => {
  const { createNode, createParentChildLink } = actions;
  const { commandsPath, basePath } = withDefaults(themeOptions);

  // Make sure it's an MDX node
  if (node.internal.type !== "Mdx") {
    return;
  }

  // Create source field (according to commandsPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (node.internal.type === "Mdx" && source === commandsPath) {
    let slug;
    if (node.frontmatter.slug) {
      slug = node.frontmatter.slug;
    } else {
      // otherwise use the filepath function from gatsby-source-filesystem
      const filePath = createFilePath({
        node: fileNode,
        getNode,
        basePath: commandsPath,
      });

      slug = urlResolve(basePath, filePath);
    }
    // normalize use of trailing slash
    slug = slug.replace(/\/*$/, "/");

    const fieldData = {
      command: node.frontmatter.command,
      title: node.frontmatter.title,
      description: node.frontmatter.description,
      slug,
    };

    const mdxBlogCommandId = createNodeId(`${node.id} >>> MdxCommand`);
    await createNode({
      ...fieldData,
      // Required fields.
      id: mdxBlogCommandId,
      parent: node.id,
      children: [],
      internal: {
        type: "MdxCommand",
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: "Mdx implementation of the Command interface",
      },
    });
    createParentChildLink({ parent: node, child: getNode(mdxBlogCommandId) });
  }
};

// These templates are simply data-fetching wrappers that import components
const CommandTemplate = require.resolve("./src/templates/command.tsx");
const IndexTemplate = require.resolve("./src/templates/index.tsx");
const HelpTemplate = require.resolve("./src/templates/help.tsx");
const NotFoundTemplate = require.resolve("./src/templates/404.tsx");

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions;
  const { basePath } = withDefaults(themeOptions);

  const result = await graphql(`
    {
      allCommand(limit: 1000) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  // Create Commands and Command pages.
  const { allCommand } = result.data;
  const commands = allCommand.nodes;

  // Create a page for each Command
  commands.forEach(command => {
    const { slug } = command;
    createPage({
      path: slug,
      component: CommandTemplate,
      context: {
        id: command.id,
      },
    });
  });

  // Create the Index page
  createPage({
    path: basePath,
    component: IndexTemplate,
    context: {},
  });

  // Create the Help page
  createPage({
    path: urlResolve(basePath, "help"),
    component: HelpTemplate,
    context: {},
  });

  // Create the Not Found page
  createPage({
    path: urlResolve(basePath, "404"),
    component: NotFoundTemplate,
    context: {},
  });
  createPage({
    path: urlResolve(basePath, "404.html"),
    component: NotFoundTemplate,
    context: {},
  });
};
