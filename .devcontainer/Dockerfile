FROM node:16-alpine

# APK deps
RUN apk add bash zsh
RUN apk add curl git make
RUN apk add openssh-client

# Oh-my-zsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# change default shell from ash
RUN sed -i -e "s/bin\/ash/bin\/zsh/" /etc/passwd

# Diff so fancy
RUN apk add perl ncurses less \
  && curl -L https://raw.githubusercontent.com/so-fancy/diff-so-fancy/master/third_party/build_fatpack/diff-so-fancy -o diff-so-fancy \
  && chmod +x diff-so-fancy \
  && mv diff-so-fancy /usr/local/bin/diff-so-fancy

# Go modules for VSCode

COPY entrypoint.sh /opt
RUN chmod 755 /opt/entrypoint.sh

ENTRYPOINT /opt/entrypoint.sh
