// notify-slack.js
const axios = require('axios');
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const VERSION = $(node -p "require('./package.json').version")

// Extracts version and branch from command-line arguments or environment variables
const getVersion = () => process.argv[2] || process.env.VERSION || 'vX.X.X';
const getType = () => process.argv[3] || 'success'; // Types: 'success' or 'failure'

const sendSlackNotification = async (version, type) => {
  const payload = {
    success: {
      text: `:rocket: *Success!* Version *${version}* was published!`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `:rocket: *A new release has been published!* \n\n Version *${version}* is available! 🚀`
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'View Release',
              },
              url: `https://github.com/scrumsdotcom/semantc-release-config/releases/tag/${version}`,
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'View Application',
              },
              url: `https://www.scrums.com`,
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
            text: `:x: *Release Failed!* \n\n Version *${version}* failed. :warning:`
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Check the logs on GitHub: <ttps://github.com/scrumsdotcom/semantc-release-config/actions|GitHub Actions>`
          }
        }
      ],
    },
  };

  try {
    // Sending the message using axios
    await axios.post(SLACK_WEBHOOK_URL, payload[type]);
    console.log(`Slack notification (${type}) sent successfully for version ${version}`);
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
}

// Get version and type from arguments or environment variables
const version = getVersion();

const type = getType();

// Call the function
sendSlackNotification(version, type);