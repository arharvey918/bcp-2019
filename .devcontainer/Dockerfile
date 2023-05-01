# Note: You can use any Debian/Ubuntu based image you want. 
FROM mcr.microsoft.com/devcontainers/typescript-node:0-18

RUN npm install --global diff-so-fancy

COPY entrypoint.sh /opt
RUN chmod 755 /opt/entrypoint.sh

ENTRYPOINT /opt/entrypoint.sh
