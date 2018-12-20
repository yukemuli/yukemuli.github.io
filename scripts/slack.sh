#!/bin/sh

git checkout master
git pull origin master

DATE=`date`
LAST=`git log --author=ayanel-ci -1 --pretty='%H'`
# PREFIX='*'
PREFIX='・'
COMMITS=`git log --pretty="%s" "${LAST}..HEAD" | sed -e "s/^/${PREFIX} /"`

curl -XPOST \
    -H "Content-Type: application/json; charset=utf-8" \
    -H "Authorization: Bearer ${SLACK_BOT_TOKEN}" \
    -d "{'mrkdwn': true, 'text': '_${DATE}_\nホームページ更新デプロイしたから見て！\n\n${COMMITS}\n\nhttps://yukemuli.dance', 'channel':'${SLACK_CHANNEL}'}" \
    "https://slack.com/api/chat.postMessage"
