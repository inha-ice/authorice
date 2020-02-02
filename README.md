# Authorice

> Inha Univ. ICE Student Association Single Sign-On Service

[![Actions Status](https://github.com/inha-ice/authorice/workflows/Node%20CI/badge.svg)](https://github.com/inha-ice/authorice/actions) ![NODE](https://img.shields.io/badge/Node-%3E%3D12.0.0-brightgreen)

## Installation

```bash
git clone https://github.com/inha-ice/authorice.git
```

## Server

The server source code is placed in the [apis](./apis) directory.

Change directory before you follow guides below:

```bash
cd ./apis/
```

You need `.env` to load environment variables. See [example](./apis/.env.example).

### Quick Start

```bash
# build an image from a Dockerfile
docker build --tag authorice .
```

### Development

```bash
# install dependencies
npm run install

# serve with hot reload at localhost:3000
npm run dev

# launch server at localhost:3000
npm start

# run integration test
npm test

# lint codes
npm run lint

# lint codes and auto fix
npm run lint:fix
```
