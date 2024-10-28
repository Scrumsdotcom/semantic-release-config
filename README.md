<h1 align="center">@scrumsdotcom/semantic-release-config</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/sovtech/semantic-release-config#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/sovtech/semantic-release-config/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/sovtech/semantic-release-config/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Scrums.com's shareable [**semantic-release**](https://github.com/semantic-release/semantic-release) configuration

# Plugins

This [shareable configuration](https://github.com/sovtech/semantic-release-config/blob/master/.releaserc.json) uses the following plugins:

- [`@semantic-release/commit-analyzer`](https://github.com/semantic-release/commit-analyzer)
- [`@semantic-release/release-notes-generator`](https://github.com/semantic-release/release-notes-generator)
- [`@semantic-release/npm`](https://github.com/semantic-release/npm)
- [`@semantic-release/git`](https://github.com/semantic-release/git)

## Summary

- Provides an informative [git](https://github.com/semantic-release/git) commit message for the release commit that does not trigger continuous integration and conforms to the [conventional commits specification](https://www.conventionalcommits.org/) (e.g., "`chore(release): 1.2.3 [skip ci]`").
- Commits the version change in `package.json`.
- Creates or updates a [changelog](https://github.com/semantic-release/changelog) file.

## 🚀 Quick Start

With your package manager of choice:

```bash
$ yarn add -D semantic-release @scrumsdotcom/semantic-release-config
$ npm install --save-dev semantic-release @scrumsdotcom/semantic-release-config
$ bun add -d semantic-release @scrumsdotcom/semantic-release-config
$ pnpm add -D semantic-release @scrumsdotcom/semantic-release-config
```

## Usage

The shareable config can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

Preferred via `.releaserc` file:

```json
{
  "extends": "@scrumsdotcom/semantic-release-config"
}
```

Or via `release` key in the project's `package.json` file:

```json
{
  "release": {
    "extends": "@scrumsdotcom/semantic-release-config"
  }
}
```

## Triggering Semantic Release

To learn about where and when to trigger Semantic Release, please refer to the official Semantic Release documentation:

- [CI Configuration](https://semantic-release.gitbook.io/semantic-release/usage/ci-configuration): Learn how to configure Semantic Release with different CI services.
- [Triggering a Release](https://semantic-release.gitbook.io/semantic-release/usage/configuration#triggering-a-release): Understand the conditions that trigger a release.

Typically, Semantic Release is triggered on the CI service when changes are pushed to your main branch. Make sure to set up your CI pipeline to run Semantic Release at the appropriate stage of your workflow.

## Additional Configuration

We decided to not include the Slack integration in the package, as this leads it to do too many things. Keep it simple, implement Slack if you please. Guide below 👇🏼

Setup the Semantic Release slackbot integration on your Slack's workspace. [Setup Guide](https://github.com/juliuscc/semantic-release-slack-bot#configuration)

Ensure that your CI configuration has the following **_secret_** environment variables set:

- `SLACK_WEBHOOK`: Slack webhook created when adding app to workspace.
- `SEMANTIC_RELEASE_PACKAGE`: Override or add package name instead of npm package name.

See each [plugins](#plugins) documentation for required installation and configuration steps.

## 🌟 Support This Project

If you find this project helpful, please consider giving it a star on GitHub! It helps us know you find it useful and encourages further development.

[![GitHub stars](https://img.shields.io/github/stars/Scrumsdotcom/semantic-release-config.svg?style=social&label=Star)](https://github.com/Scrumsdotcom/semantic-release-config)

Made with ❤️ by [Scrums.com](https://www.scrums.com)
