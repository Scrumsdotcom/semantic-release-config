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
const formatMessage = (version, messageType) => {
  if (messageType === 'success') {
    return `🎉 ***Release Successful!***\n
            Version: *${version}*\n
            Keep up the great work! 🚀`;
  } else {
    return `❌ ***Release Failed***\n
            Version: *${version}*\n
            Please review the release process.`;
  }
};

/**
 * Sends the message as the JSON payload via webhook.
 */
const sendSlackVariables = async (appUrl, text, releaseUrl) => {
  // Construct the payload
  const payload = {
    'app-url': appUrl,
    text,
    'release-url': releaseUrl,
  };

  try {
    // Post the request to Slack Webhook endpoint
    await axios({
      method: 'post',
      url: SLACK_WEBHOOK_URL,
      headers: {
        'Content-Type': 'application/json', // Required content type
      },
      data: payload, // Send data as payload
    });

    console.log('Slack notification sent successfully.');
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
};

// Format the message based on release outcome (success/failure)
const formattedMessage = formatMessage(packageJson.version, TYPE);

// Send the Slack Notification with your predefined variables
sendSlackVariables(APP_URL, formattedMessage, RELEASE_URL);
