const axios = require('axios');
const path = require('path');

const packageJson = require(path.join(__dirname, 'package.json'));

const config = {
  // Get the Slack Webhook URL from environment variables.
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  // Get the GitHub repository URL from environment variables.
  GH_REPO_URL: process.env.GH_REPO_URL,
  // Load package.json to extract version and package name
  PACKAGE_JSON: packageJson,
  // Custom App URL to redirect to the app
  APP_URL: process.env.APP_URL,
  // Build necessary URLs
  RELEASE_URL: `${process.env.GH_REPO_URL}/releases/tag/v${packageJson.version}`,
  // Get the message type (success or failure) from command-line arguments, passes 'success' or 'failure' as a command-line argument
  TYPE: process.argv[2],
};

/**
 * Function to build the Slack message content based on success or failure.
 * Slack Workflow Webhooks don't format text very well, no bold or italics.
 */
const formatMessage = (version, messageType, packageName) => {
  if (messageType === 'success') {
    return (
      `🎉 Release Successful! 🎉\n\n` +
      `Package: ${packageName}\n` +
      `Version: ${version}\n\n` +
      `Siyakuhalalisela! Great job! Wunderbar! Mazel Tov! 🚀`
    );
  } else {
    return (
      `❌ Release Failed ❌\n\n` +
      `Package: ${packageJson.name}\n` +
      `Version: ${version}\n\n` +
      `Please review the release process and try again. Reach out if help is needed. 🚧`
    );
  }
};

// Sends the message as the JSON payload via webhook.
const sendSlackVariables = async (appUrl, text, releaseUrl, slackWebhook) => {
  try {
    // Post the request to Slack Webhook endpoint
    await axios({
      method: 'post',
      url: slackWebhook,
      headers: { 'Content-Type': 'application/json' },
      data: { 'app-url': appUrl, text, 'release-url': releaseUrl },
    });

    console.log('Slack notification sent successfully.');
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
};

// Format the message based on release outcome (success/failure)
const FORMATTED_MESSAGE = formatMessage(
  config.PACKAGE_JSON.version,
  confg.TYPE,
  config.PACKAGE_JSON.name
);

// Send the Slack Notification with your predefined variables
sendSlackVariables(
  config.APP_URL,
  FORMATTED_MESSAGE,
  config.RELEASE_URL,
  config.SLACK_WEBHOOK_URL
);
