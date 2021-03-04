module.exports = themeOptions => {
  const defaults = {
    basePath: "/",
    commandsPath: "commands",
  };

  return {
    ...defaults,
    ...themeOptions,
  };
};
