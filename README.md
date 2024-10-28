# @scrumsdotcom/semantic-release-config

[![Version](https://img.shields.io/badge/version-1.0.68-blue.svg?cacheSeconds=2592000)](https://github.com/scrumsdotcom/semantic-release-config) [![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/scrumsdotcom/semantic-release-config#readme) [![Maintenance](https://img.shields.io/badge/Maintained-yes-green.svg)](https://github.com/scrumsdotcom/semantic-release-config/graphs/commit-activity) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/scrumsdotcom/semantic-release-config/blob/master/LICENSE)

This is Scrums.com's shareable configuration for **semantic-release**, designed to automate versioning and package publishing. This configuration follows the [Conventional Commits](https://www.conventionalcommits.org/) standard and integrates smoothly into popular CI/CD pipelines.

## 💡 Why Use This?

With this configuration, **semantic-release** will handle:

- Automatic updates to your `package.json` version.
- Creation and maintenance of a changelog.
- Ensuring continuous software delivery by releasing only when specific conditions (like commit message requirements) are met.

## 🛠️ Installation

First, install the required packages in your project. You can choose your preferred package manager:

# Using Yarn

```bash
yarn add -D semantic-release @scrumsdotcom/semantic-release-config
```

# Using npm

```bash
npm install --save-dev semantic-release @scrumsdotcom/semantic-release-config
```

# Using pnpm

```bash
pnpm add -D semantic-release @scrumsdotcom/semantic-release-config
```

# Using Bun

```bash
bun add -d semantic-release @scrumsdotcom/semantic-release-config
```

## 📄 Basic Setup

### 1. Add Release Configuration

After installing, you need to define how your project should use the configuration. You can do this in two different ways:

#### Option 1: Use a `.releaserc` file

Create a `.releaserc` file in the root of your project directory with the following content:

```json
{
  "extends": "@scrumsdotcom/semantic-release-config"
}
```

#### Option 2: Configure `package.json` directly

Alternatively, you can add the release configuration under the `release` section in your `package.json`:

```json
{
  "release": {
    "extends": "@scrumsdotcom/semantic-release-config"
  }
}
```

### 2. Configure CI to Trigger Semantic Release

To automatically trigger releases, **semantic-release** needs to run in your CI pipeline when code is pushed. The configuration you need depends on the CI service you use, but here's a simple example for **GitHub Actions**:

#### GitHub Actions Example:

Create a `.github/workflows/release.yml` file:

```yaml
name: Release

on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install dependencies
        run: npm install

      - name: Run semantic-release
        run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

> **Note:** CI tools like GitHub Actions require a token to publish to GitHub. This should be automatically populated by the GitHub Action runner. However, if it doesn't for you, you can find more information about GitHub Actions secrets [here](-github-actions/security-guides/automatic-token-authentication).

## 🔌 Plugins Used by This Config

Our configuration uses the following semantic-release plugins out of the box:

1. **[`@semantic-release/commit-analyzer`](https://github.com/semantic-release/commit-analyzer):** Analyzes your commits and decides if a release is necessary based on commit messages.
2. **[`@semantic-release/release-notes-generator`](https://github.com/semantic-release/release-notes-generator):** Automatically generates release notes based on the commit history.
3. **[`@semantic-release/npm`](https://github.com/semantic-release/npm):** Publishes the package to npm and updates the version in your `package.json`.
4. **[`@semantic-release/git`](https://github.com/semantic-release/git):** Commits the updated `package.json` and changelog after a release.

Each plugin plays a specific role in ensuring a bulletproof release process, so no additional setup is typically required unless you’re customizing further.

## 📑 Additional Configuration (Optional)

While this shareable configuration provides a sensible default setup, you may want to make additional tweaks, especially for notification purposes.

For example, you can configure notifications to Slack using the [**semantic-release-slack-bot**](https://github.com/juliuscc/semantic-release-slack-bot) plugin to notify your team of new releases. This is not included by default in our package to ensure modularity.

**To enable Slack notifications:**

1. Follow the [Slackbot Setup Guide](https://github.com/juliuscc/semantic-release-slack-bot#configuration).
2. Set the following environment variables in your CI:

- `SLACK_WEBHOOK`: The webhook URL from your Slack.
- `SEMANTIC_RELEASE_PACKAGE`: (Optional) Custom package name for notifications.

## 🛑 Troubleshooting

If you face issues while setting up or using the configuration, the official [**semantic-release** documentation](https://semantic-release.gitbook.io/semantic-release/) provides excellent resources, especially for:

- [CI Configuration](https://semantic-release.gitbook.io/semantic-release/usage/ci-configuration)
- [Triggering a Release](https://semantic-release.gitbook.io/semantic-release/usage/configuration#triggering-a-release)

## 🌟 Support and Contributions

If this project has been helpful to you, please consider giving it a star on GitHub. Contributions are welcome—feel free to submit issues or pull requests.

[![GitHub stars](https://img.shields.io/github/stars/Scrumsdotcom/semantic-release-config.svg?style=social&label=Star)](https://github.com/Scrumsdotcom/semantic-release-config)

Made with ❤️ by [Scrums.com](https://www.scrums.com)
