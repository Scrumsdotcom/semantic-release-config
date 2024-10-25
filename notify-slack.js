const axios = require('axios');
const path = require('path');

// Get the Slack Webhook URL from environment variables.
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// Load package.json to extract version and package name
const packageJson = require(path.join(__dirname, 'package.json'));

// Build the release URL from the package version
const RELEASE_URL = `https://github.com/scrumsdotcom/semantic-release-config/releases/tag/v${packageJson.version}`;

// Get the message type (success or failure) from the command-line arguments
const TYPE = process.env.TYPE || 'success';

/**
 * Function to build and return the Slack message based on success or failure.
 */
const formatMessage = (version, releaseUrl, packageName, messageType) => {
  if (messageType === 'success') {
    return `🎉 *Release Successful!* 🎉\n
            Version: *${version}*\n
            Package: *${packageName}*\n
            Release URL: <${releaseUrl}|View Release>\n
            Keep up the great work! 🚀`;
  } else {
    return `❌ *Release Failed* ❌\n
            Version: *${version}*\n
            Package: *${packageName}*\n
            Please review the release process or check the logs for more details: <${releaseUrl}|View Logs>\n
            We hope for a better release journey next time. ⚠️`;
  }
};

// Sends the message as the payload via the webhook
const sendSlackVariables = async (formattedMessage, releaseUrl) => {
  const payload = {
    text: formattedMessage, // Slack message content expected by the webhook workflow
    'release-url': releaseUrl, // Release URL to view the release
  };

  try {
    // Post the variables to the Slack workflow webhook endpoint
    await axios.post(SLACK_WEBHOOK_URL, payload);
    console.log(`Slack notification sent successfully.`);
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
};

// Format and send the message
const formattedMessage = formatMessage(
  packageJson.version,
  RELEASE_URL,
  packageJson.name,
  TYPE
);

sendSlackVariables(formattedMessage, RELEASE_URL);
