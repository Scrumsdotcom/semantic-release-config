const axios = require('axios');
const path = require('path');

// Load package.json to extract version
const packageJson = require(path.join(__dirname, 'package.json'));
const VERSION = packageJson.version;

// Get type (success or failure) from command-line arguments
const type = process.argv[2] || 'success';

// Your Slack Incoming Webhook URL (passed as an environment variable)
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// Function to send slack notification
const sendSlackNotification = async (version, messageType) => {
  const payload = {
    success: {
      text: `🎉 *Success!* Version *${version}* of *${packageJson.name}* has been released! 🚀`,
      attachments: [
        {
          color: '#36a64f',
          fields: [
            { title: 'Version', value: version, short: true },
            { title: 'Package Name', value: packageJson.name, short: true },
          ],
          text: `You can check the release details here: <https://github.com/your-org/your-repo/releases/tag/${version}|Release Page>\nOr access the dashboard: <https://your-dashboard-link.com/releases/${version}|Dashboard>`,
        },
      ],
    },
    failure: {
      text: `❌ *Release Failure* for version *${version}* of *${packageJson.name}*`,
      attachments: [
        {
          color: '#ff0000',
          fields: [
            { title: 'Version', value: version, short: true },
            { title: 'Package Name', value: packageJson.name, short: true },
          ],
          text: `😞 The release failed. Check the logs for more details: <https://github.com/your-org/your-repo/actions|GitHub Actions Logs>.`,
        },
      ],
    },
  };

  try {
    // Post the payload to Slack
    await axios.post(SLACK_WEBHOOK_URL, payload[messageType]);
    console.log(
      `Slack notification (${messageType}) sent successfully for version ${version}`
    );
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
};

// Call the function to send the notification based on the outcome
sendSlackNotification(VERSION, type);
