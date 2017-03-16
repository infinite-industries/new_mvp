#!/usr/bin/env bash

ROOT='/home/ubuntu/new_mvp'
USER='ubuntu'

SERVER=''
if [[ "production" = $1 ]]; then
  SERVER='infinite.industries'
elif [[ "stage" = $1 ]]; then
  SERVER='staging.infinite.industries'
else
  echo Please specify environment to deploy to.
  echo Usage: ./deploy.sh environment
  echo Example: ./deploy.sh stage
  exit
fi

ssh $USER@$SERVER << EOF
  cd $ROOT
  echo 'Updating sources'
  git reset --hard HEAD
  git checkout master
  git pull
  echo 'Installing npm packages'
  npm install
  echo 'Restarting the bot'
  forever stop mvp
  rm /home/$USER/.forever/mvp.log
  forever start --uid mvp index.js
  echo 'Done!'
EOF
