# Kejian-usb-2.0

```
课件2.0 usb 项目, 作为[课件模板项目](http://git.shuobaotang.com/SaybotAsLib/rhinoforkelly)的桌面版包装
```

---
## Dependencies
* [node.js](https://nodejs.org/en/) - brew install node
* [npm](https://github.com/npm/npm) - brew install node
* [electron](https://github.com/atom/electron) - npm install -g electron-prebuilt
* [wine](https://github.com/maxogden/electron-packager/issues/160) - brew install wine
> [Building windows apps from non-windows platforms](https://github.com/maxogden/electron-packager/blob/master/readme.md#building-windows-apps-from-non-windows-platforms)

---


## build status

beta:
[![Build Status](http://jenkins.washington.shuobaotang.com/job/kejian-usb-2.0-beta/badge/icon)](http://jenkins.washington.shuobaotang.com/job/kejian-usb-2.0-beta/)
[![Build Status](http://jenkins.washington.shuobaotang.com/buildStatus/icon?job=kejian-usb-2.0-beta)](http://jenkins.washington.shuobaotang.com/job/kejian-usb-2.0-beta/)

## Local Development Env

### 下载依赖

`npm install`

### 打包环境

`brew install wine`

http://sourceforge.net/projects/darwine/
http://www.davidbaumgold.com/tutorials/wine-mac/
https://wiki.winehq.org/MacOSX/Building

### 安装Chrome Extension

https://github.com/zalmoxisus/redux-devtools-extension

https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd


### 准备asapp目录

本项目依赖[rhinoforkelly](http://git.shuobaotang.com/SaybotAsLib/rhinoforkelly)(electron分支)的编译输出，可使用以下命令做目录链接

`ln -sf /path/to/rhinoforkelly/out/production/RhinoForKellyApp ./asapp`

### 启动方式
* 以electron的方式启动

`npm run server`

`npm run dev`

#### [Debugging the Main Process](https://github.com/atom/electron/blob/master/docs/tutorial/debugging-main-process.md)

* `npm install -g node-inspector`
* `node-inspector --no-preload` 
* open `http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858` in browser

> node 5.0.0 will dependent on node-v46-darwin-x64/debug.node, but the default installed version is node-v47-darwin-x64/debug.node, install v4.2.2 should fix it

* 以web的方式启动(支持热更新)

`npm run server`

`npm run hot-dev`

之后在浏览器中打开`http://127.0.0.1:3000/`

> 替换hot-dev下面`main.js`里面target的引用,可以做到对指定react组件的实时调试~

### 单元测试
`npm run test`
> 本项目使用[Mocha](https://mochajs.org/)作为单元测试框架.

### Tools Integration
> 使用以下工具能够帮你提升开发效率，当并不是必需的

* [JetBrains IDE Live Templates](https://github.com/minwe/jetbrains-react) - React live templates for JetBrains editors (e.g. WebStorm, PHPStorm, etc.)
* [node-inspector](https://github.com/node-inspector/node-inspector) - debugging electron main process
* [react-devtools](https://github.com/facebook/react-devtools) - An extension that allows inspection of React component hierarchy in Chrome Developer Tools.

* [gliffy-diagrams](https://chrome.google.com/webstore/detail/gliffy-diagrams/bhmicilclplefnflapjmnngmkkkkpfad?hl=zh-CN)

### [更多项目中使用的框架和工具介绍以及遇到的问题请看这里](./docs/issues_resolved.md)

---
## Package Application
* `npm run build:osx` - package and release OSX application
* `npm run build:win64` - package and release Windows application

---
## 资源地址
* PRD & ART 192.168.0.11/ga/GA/chenjun/课件UI

---
## 代码规范

> 1. 本项目基于[airbnb code style](https://github.com/airbnb/javascript)做代码规范检查
> 2. `npm run hot-dev`方式运行时会自动启动检查
> 3. webstrom 和intellij请启用editorconfig插件支持代码自动格式化,其他ide请自行查找.
> 4. eslint和react代码格式检查配置在.eslintrc.js

## Stop Using Bower
* Bower is also redundant
* Bower is also unreliable
* Source control != package management
* Some features, like the url shorthand, are entirely broken
* Programmatic usage was painful
* Using both bower and npm in the same project is painful
* Keeping bower.json version field in sync with git tags is painful
* CommonJS support is not straightforward
* [Why We Should Stop Using Bower – And How to Do It](https://gofore.com/ohjelmistokehitys/stop-using-bower/)
* [merge bower into npm, why aren't we using npm?](https://github.com/bower/bower/issues/1520)
* [Why my team uses npm instead of bower](https://medium.com/@nickheiner/why-my-team-uses-npm-instead-of-bower-eecfe1b9afcb#.p66hcgyp0)

## 相关项目
* [rhinoforkelly](http://git.shuobaotang.com/SaybotAsLib/rhinoforkelly)

## See Also
* [PPAPI flash debug output](https://github.com/atom/electron/issues/2155)
* [ECMAScript 6入门](http://es6.ruanyifeng.com/)
* [JavaScript.The.Good.Parts](http://vdisk.weibo.com/s/ujncH7g4AXgGB)
* [Node.js C/C++ Addons](https://nodejs.org/api/addons.html)
* [React中文文档](http://reactjs.cn/react/docs/getting-started.html)
* [React on ES6+](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/)
* [electron文档](https://github.com/atom/electron/tree/master/docs-translations/zh-CN)
* [React源码剖析系列 － 生命周期的管理艺术](http://zhuanlan.zhihu.com/purerender/20312691)
* [高清ICON SVG解决方案（上）-腾讯ISUX – 社交用户体验设计](http://isux.tencent.com/svg-icon-part-one.html)

## 基于Electron的其他App参考

* [awesome-electron 这个一定要参考一下](https://github.com/sindresorhus/awesome-electron)
* [Medis](https://github.com/luin/medis)
