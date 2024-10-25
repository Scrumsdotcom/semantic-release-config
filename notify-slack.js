const axios = require('axios');
const path = require('path');

// Get the Slack Webhook URL from environment variables.
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// Load package.json to extract version and package name
const packageJson = require(path.join(__dirname, 'package.json'));

// Build the release URL from the package version
const RELEASE_URL = `https://github.com/scrumsdotcom/semantic-release-config/releases/tag/v${packageJson.version}`;
const APP_URL = 'https://www.scrums.com'; // App URL which will stay constant

// Get the message type (success or failure) from environment variables or default to success
const TYPE = process.env.TYPE || 'success';

/**
 * Function to build and return the Slack message text based on success or failure.
 */
const formatMessage = (version, packageName, messageType) => {
  // Define the success and failure messages
  if (messageType === 'success') {
    return `***Release Successful!*** 🎉\nVersion: *${version}*\nPackage: *${packageName}*\nKeep up the great work! 🚀`;
  } else {
    return `❌ ***Release Failed*** ❌\nVersion: *${version}*\nPackage: *${packageName}*\nWe hope for a better release journey next time. ☮`;
  }
};

/**
 * Sends the formatted message as the payload via the webhook
 */
const sendSlackVariables = async (text, releaseUrl, appUrl) => {
  // Constructing the payload object based on Slack's expected structure
  const payload = {
    text: text, // The actual message content
    'release-url': releaseUrl, // Release URL (dynamic)
    'app-url': appUrl, // App URL (constant)
  };

  try {
    await axios({
      method: 'post',
      url: SLACK_WEBHOOK_URL,
      headers: {
        'Content-Type': 'application/json', // Ensure content type is JSON
      },
      data: payload, // Payload being sent
    });

    console.log(`Slack notification sent successfully.`);
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
};

// Format and send the message based on the release outcome
const formattedMessage = formatMessage(
  packageJson.version,
  packageJson.name,
  TYPE
);
sendSlackVariables(formattedMessage, RELEASE_URL, APP_URL);
