#!/bin/bash

set -euxo pipefail

# TODO: copy .gitconfig and SSH key
if [[ -f $HOMEDIR/.gitconfig ]]; then
  cp $HOMEDIR/.gitconfig /home/node/.gitconfig
  git config --global core.pager "diff-so-fancy | less --tabs=4 -RFX"
fi

if [[ -d $HOMEDIR/.ssh ]]; then
  cp -r $HOMEDIR/.ssh /home/node/.ssh
  chmod 700 /home/node/.ssh
  chmod 600 /home/node/.ssh/*

  eval $(ssh-agent)
  for possiblekey in /home/node/.ssh/id_*; do
    if grep -q PRIVATE "$possiblekey"; then
      ssh-add "$possiblekey"
    fi
  done

fi

# Never end
tail -f /dev/null
