FROM --platform=linux/x86_64 node:20.17.0-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends locales git procps && \
    locale-gen ja_JP.UTF-8 && \
    localedef -f UTF-8 -i ja_JP ja_JP && \
    apt-get clean && \
    # イメージサイズを減らすために不要なキャッシュを削除
    rm -rf /var/lib/apt/lists/*

ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo

WORKDIR /app

RUN useradd -ms /bin/bash developer
RUN mkdir -p /app/node_modules && chown -R developer:developer /app
# 一時的にrootに戻ってcorepack enableを実行
USER root
RUN corepack enable

USER developer
# デフォルトでは .pnpm-store というディレクトリが app に生成されてしまうのでパスを変える
RUN corepack enable pnpm && \
    pnpm config set store-dir ~/.pnpm-store