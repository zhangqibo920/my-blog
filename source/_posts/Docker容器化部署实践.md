---
title: Docker容器化部署实践
date: 2026-07-08 14:30:00
tags: [Docker, DevOps, 部署]
categories: [运维部署]
---

## 什么是 Docker

Docker 是一个开源的应用容器引擎，让开发者可以打包应用及其依赖包到一个可移植的容器中。

## 基本概念

### 镜像（Image）

镜像是一个只读模板，包含运行应用所需的代码、运行时、库和配置。

### 容器（Container）

容器是镜像的运行实例，可以被启动、停止和删除。

## Dockerfile 编写

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

## 常用命令

```bash
# 构建镜像
docker build -t my-app .

# 运行容器
docker run -d -p 3000:3000 my-app

# 查看运行中的容器
docker ps

# 停止容器
docker stop <container_id>
```

## Docker Compose

用于定义和运行多容器应用：

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: myapp
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

## 总结

Docker 极大地简化了应用的部署流程，让"一次构建，到处运行"成为现实。
