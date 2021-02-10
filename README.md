# Okta UI Configurations

This repository contains standards and configurations for building JavaScript applications at Okta.

<!-- TOC depthFrom:2 -->

- [Packages](#packages)
  - [Monorepo](#monorepo)
  - [Versioning](#versioning)

<!-- /TOC -->
<!-- TOC generated using VSCode Plugin Markdown TOC -->

## Packages

| Package | Status | Description |
|---------| -------| ------------|
| [**eslint-plugin-okta**](/packages/eslint-plugin-okta) | *Internal only* | Standard ESLint rules and plugins. |

### Monorepo

This repo is managed as a **monorepo** using [Lerna](https://lernajs.io/). Each package within the **monorepo** is a separate npm module, each with its own `package.json` and `node_modules` directory.

Packages are parsed from the `packages` property in [lerna.json](lerna.json), and adhere to this structure:

```bash
packages/
  eslint-plugin-okta
```

### Versioning

We've configured Lerna with [independent mode](https://github.com/lerna/lerna/#independent-mode---independent), which means that each package is required to manage its own version number.
