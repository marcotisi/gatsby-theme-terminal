# Gatsby Theme Terminal

A Gatsby theme that looks like a real terminal! You have to type the command and
press `Enter` to navigate the site.

You can see a [demo](https://marcotisi.dev) on my actual website
[https://marcotisi.dev](https://marcotisi.dev).

## Installation

### For a new site

Sorry, no starter yet. You need to create a new site with `gatsby` and add the
theme manually:

```shell
gatsby new my-terminal-site
```

### For an existing site

1. Install the theme

```shell
npm install @mtdev/gatsby-theme-terminal

yarn add @mtdev/gatsby-theme-terminal
```

2. Add the configuration to your `gatsby-config.js` file

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "@mtdev/gatsby-theme-terminal",
      options: {
        // basePath defaults to "/"
        basePath: "/terminal",
      },
    },
  ],
};
```

3. Add commands (pages) by creating `md` or `mdx` files inside `/commands`.

4. Run your site using `gatsby develop`, browse it, type `help` and press
   `Enter`. You'll see a list of available commands.

## Usage

### Theme options

| Key                             | Default value | Description                                                                      |
| ------------------------------- | ------------- | -------------------------------------------------------------------------------- |
| `basePath`                      | `/`           | Root url for the site                                                            |
| `commandsPath`                  | `commands`    | Location of commands                                                             |
| `mdxOtherwiseConfigured`        | `false`       | Set this flag `true` if `gatsby-plugin-mdx` is already configured for your site. |
| `maxWidth`                      | `80ch`        | Max width of the body. Works best if using `ch`.                                 |
| `fontFamily`                    | `monospace`   | Font family.                                                                     |
| `backgroundColor`               | `#1E1E1E`     | Background color.                                                                |
| `textColor`                     | `#FFF`        | Text color.                                                                      |
| `promptPrefixColor`             | `#00a6b3`     | Prompt prefix color.                                                             |
| `promptTextColor`               | `#00a600`     | Prompt text color.                                                               |
| `promptSuffixColor`             | `#b200b3`     | Prompt suffix color.                                                             |
| `scrollbarWidth`                | `0.5rem`      | Scrollbar width.                                                                 |
| `scrollbarBackgroundColor`      | `#3c3c3c`     | Scrollbar background color.                                                      |
| `scrollbarTrackBackgroundColor` | `#3c3c3c`     | Scrollbar track background color.                                                |
| `scrollbarThumbBackgroundColor` | `#4c4c4c`     | Scrollbar thumb background color.                                                |

#### Example usage

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "@mtdev/gatsby-theme-terminal",
      options: {
        maxWidth: "120ch",
        fontFamily: "source-code-pro",
        backgroundColor: "#1B2B34",
        textColor: "#CDD3DE",
        promptPrefixColor: "#99C794",
        promptTextColor: "#5FB3B3",
        promptSuffixColor: "#EC5f67",
        scrollbarBackgroundColor: "#4F5B66",
        scrollbarTrackBackgroundColor: "#4F5B66",
        scrollbarThumbBackgroundColor: "#A7ADBA",
      },
    },
  ],
};
```

### Additional configuration

In addition to the theme options, you can customize some items using the
`siteMetadata` object of your site in `gatsby-config.js`

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    // Used for SEO twitter:creator meta
    author: "twitter_author",
    // Used for the site header, title and SEO
    title: "Gatsby Theme Terminal",
    // Used for the site header and SEO
    description: "Description",
    // Used for the welcome text just above the prompt
    helpText: "Type 'help' and press Enter to start",
    // Used to customize the user in the prompt
    user: "guest",
    // Used to customize the host in the prompt
    host: "gatsby-theme-terminal.dev",
  },
};
```

### Command Fields

The following are the defined command fields based on the node interface in the
schema

| Field       | Type   |
| ----------- | ------ |
| id          | String |
| command     | String |
| title       | String |
| description | String |
| slug        | String |
| body        | String |

### Example Command

Here's an example command with its fields:

```
---
command: example
title: Example
description: And example command
---

## Example command

This is an example command
```
