
const release = {
  default: (() => {
    const shell = require("child_process");
    return {
      gather: () => {
        const latestCommit = shell.execSync(`git log --author=ayanel-ci -2 --pretty='%H'`).toString().trim().split("\n").pop();
        const lines = shell.execSync(`git log --no-merges --pretty="%s" "${latestCommit}..HEAD"`).toString().trim().split("\n");
        console.log("DEBUG:", lines);
        return lines.filter(line => !!line);
      },
    };
  })(),
};

const announce = {
  twitter: ((config) => {
    const TwitterClient = require("twitter");
    const twitter = new TwitterClient(config || {
      consumer_key:        process.env.TWITTER_CONSUMER_KEY,
      consumer_secret:     process.env.TWITTER_CONSUMER_SECRET,
      access_token_key:    process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
    return {
      post: (lines) => {
        const text = lines.map(line => `・ ${line}`).join("\n");
        return twitter.post("statuses/update", {
          status: `ホームページ更新したから見て！\n${text}\nhttps://yukemuli.dance`,
        });
      },
    }
  })(),
  slack: ((config) => {
    const { WebClient } = require("@slack/client");
    const slack = new WebClient(config ? config.token : process.env.SLACK_BOT_TOKEN);
    return {
      post: (lines) => {
        const now = (new Date()).toLocaleString('ja-JP', {timeZone: "Asia/Tokyo"});
        const text = lines.map(line => `・ ${line}`).join("\n");
        return slack.chat.postMessage({
          channel: config ? config.channel : process.env.SLACK_CHANNEL,
          text: `_${now}_\nホームページ更新したから見て！\n\n${text}\n\nhttps://yukemuli.dance`,
          mrkdwn: true,
        });
      },
    }
  })(),
}

const lines = release.default.gather();
announce.slack.post(lines).catch(console.error);
announce.twitter.post(lines).catch(console.error);
