const axios = require('axios');
const path = require('path');

// Get the Slack Webhook URL from environment variables.
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// Load package.json to extract version and package name
const packageJson = require(path.join(__dirname, 'package.json'));

// Build necessary URLs
const RELEASE_URL = `${process.env.GH_REPO_URL}/releases/tag/v${packageJson.version}`;

// Custom App URL to redirect to the app
const APP_URL = process.env.APP_URL;

// Get the message type (success or failure) from command-line arguments
const TYPE = process.argv[2]; // Pass 'success' or 'failure' as a command-line argument

/**
 * Function to build the Slack message content based on success or failure.
 */
const formatMessage = (version, messageType, packageName) => {
  if (messageType === 'success') {
    // Slack likes fewer spaces around new lines for proper formatting
    return (
      `🎉 *Release Successful!*\n\n` +
      `Package: ${packageName}\n` +
      `Version: ${version}\n\n` +
      `Great job! Wunderbar! Mazel Tov! 🚀`
    );
  } else {
    return (
      `❌ Release Failed\n\n` + // Single asterisks should bold "Release Failed"
      `Package: ${packageJson.name}\n` +
      `Version: ${version}\n\n` + // Same formatting for version
      `Please review the release process and try again. Reach out if help is needed. :warning:`
    );
  }
};

// Sends the message as the JSON payload via webhook.
const sendSlackVariables = async (appUrl, text, releaseUrl) => {
  try {
    // Post the request to Slack Webhook endpoint
    await axios({
      method: 'post',
      url: SLACK_WEBHOOK_URL,
      headers: { 'Content-Type': 'application/json' },
      data: {
        'app-url': appUrl,
        text,
        'release-url': releaseUrl,
      },
    });

    console.log('Slack notification sent successfully.');
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
};

// Format the message based on release outcome (success/failure)
const formattedMessage = formatMessage(
  packageJson.version,
  TYPE,
  packageJson.name
);

// Send the Slack Notification with your predefined variables
sendSlackVariables(APP_URL, formattedMessage, RELEASE_URL);
