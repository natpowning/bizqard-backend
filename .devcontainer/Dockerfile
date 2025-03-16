FROM mcr.microsoft.com/vscode/devcontainers/universal:2

USER root

RUN apt-get update && \
    apt-get install -y \
    zsh \
    curl \
    wget \
    git \
    dnsutils \
    iputils-ping \
    net-tools \
    iproute2 \
    vim \
    python3 \
    htop \
    lsof \
    tcpdump \
    telnet \
    jq \
    unzip \
    && apt-get clean

USER codespace

RUN npx -q playwright install \
     && npx playwright install-deps
