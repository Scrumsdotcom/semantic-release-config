const axios = require('axios');
const path = require('path');

// Extract version from package.json using Node's require()
const packageJson = require(path.join(__dirname, 'package.json'));
const VERSION = packageJson.version; // This will extract the version from package.json

// Read the type of message ('success' or 'failure') from the arguments
const type = process.argv[2] || 'success';

// Define where your Slack Webhook URL is coming from (either environment variable)
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const sendSlackNotification = async (version, messageType) => {
  const payload = {
    success: {
      text: `:rocket: *Success!* Version *${version}* was published!`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `:rocket: *A new release has been published!* \n\n Version *${version}* is available! 🚀`,
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: { type: 'plain_text', text: 'View Release' },
              url: `https://github.com/your-org/your-repo/releases/tag/${version}`,
            },
            {
              type: 'button',
              text: { type: 'plain_text', text: 'View Dashboard' },
              url: `https://your-dashboard-link.com/${version}`,
            },
          ],
        },
      ],
    },
    failure: {
      text: `:x: *Release Failure for version *${version}*.`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `:x: *Release Failed!* \n\n Version *${version}* failed. :warning:`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Check the logs on GitHub: <https://github.com/your-org/your-repo/actions|GitHub Actions>`,
          },
        },
      ],
    },
  };

  try {
    // Post the payload to Slack via the webhook URL
    await axios.post(SLACK_WEBHOOK_URL, payload[messageType]);
    console.log(
      `Slack notification (${messageType}) sent successfully for version ${version}`
    );
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
};

// Call the function with the correct version and type e.g. success or failure
sendSlackNotification(VERSION, type);
