#!/bin/bash

if [[ ! ${TRAVIS_BRANCH} == "master" ]]; then
  echo "masterブランチじゃない"
  exit 1
fi
if [[ ! ${TRAVIS_COMMIT_MESSAGE} =~ "Merge pull request" ]]; then
  echo "マージコミットじゃない"
  exit 1
fi

echo "デプロイするべきコミットですねこれは"
exit 0
