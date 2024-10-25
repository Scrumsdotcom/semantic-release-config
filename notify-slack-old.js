const axios = require('axios');
const path = require('path');

// Get the Slack Webhook URL from environment variables.
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// Load package.json to extract version
const packageJson = require(path.join(__dirname, 'package.json'));

// Get the release version and release URL from command-line arguments
const RELEASE_URL = `https://github.com/scrumsdotcom/semantic-release-config/releases/tag/v${packageJson.version}`;

const TYPE = process.argv[4] || 'success';

// Sends the provided variables as the payload via the webhook
const sendSlackVariables = async (
  version,
  releaseUrl,
  messageType,
  packageName
) => {
  const payload = {
    message: version,
    'package-name': packageName,
    'release-url': releaseUrl,
    status: messageType, // Possibly to indicate if it's a success or failure event
  };

  try {
    // Post the variables to the Slack workflow webhook endpoint
    await axios.post(SLACK_WEBHOOK_URL, payload);
    console.log(
      `Slack notification (${messageType}) variables sent successfully for version ${version}`
    );
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
};

// Send the variables for formatting in the pre-set Slack message template
sendSlackVariables(packageJson.version, RELEASE_URL, TYPE, packageJson.name);
