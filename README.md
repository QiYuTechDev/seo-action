# QiYuTech SEO Action

[![build-test](https://github.com/QiYuTechDev/demo-action/actions/workflows/test.yml/badge.svg)](https://github.com/QiYuTechDev/demo-action/actions/workflows/test.yml)

## GitHub Action 使用

```yaml
- name: Start MongoDB
  uses: supercharge/mongodb-github-action@1.6.0
  with:
    mongodb-version: "4.4"
- uses: QiYuTechDev/seo-action
  with:
    version: "0.6.4"
    url: "https://news.ycombinator.com/"
```

## 文档

安装依赖

```bash
$ npm install
```

编译 & 打包

```bash
$ npm run build && npm run package
```

