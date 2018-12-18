
DATE=`date`

curl -XPOST \
    -H "Content-Type: application/json; charset=utf-8" \
    -H "Authorization: Bearer ${SLACK_BOT_TOKEN}" \
    -d "{'text': '${DATE}\nホームページ更新デプロイしたから見て！\nhttps://yukemuli.dance', 'channel':'homepage'}" \
    "https://slack.com/api/chat.postMessage"

