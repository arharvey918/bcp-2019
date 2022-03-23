#!/bin/bash

set -euxo pipefail

# TODO: copy .gitconfig and SSH key
if [[ -f /home/user/.gitconfig ]]; then
  cp /home/user/.gitconfig /root/.gitconfig
  git config --global core.pager "diff-so-fancy | less --tabs=4 -RFX"
fi

if [[ -d /home/user/.ssh ]]; then
  cp -r /home/user/.ssh /root/.ssh
  chmod 700 /root/.ssh
  chmod 600 /root/.ssh/*

  eval $(ssh-agent)
  for possiblekey in /root/.ssh/id_*; do
    if grep -q PRIVATE "$possiblekey"; then
      ssh-add "$possiblekey"
    fi
  done

fi

# Never end
tail -f /dev/null
