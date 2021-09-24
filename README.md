# QiYuTech Demo Action

[![build-test](https://github.com/QiYuTechDev/demo-action/actions/workflows/test.yml/badge.svg)](https://github.com/QiYuTechDev/demo-action/actions/workflows/test.yml)

If you are new, there's also a simpler introduction. See
the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Code in Main

安装依赖

```bash
$ npm install
```

编译 & 打包

```bash
$ npm run build && npm run package
```

## Change action.yml

The action.yml contains defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various
packages.

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder.

Then run [ncc](https://github.com/zeit/ncc) and push the results:

```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node
modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (
see [test.yml](.github/workflows/ubuntu.yml))

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/typescript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to
reference the stable and latest V1 action
