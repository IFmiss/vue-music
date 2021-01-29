## 3.0都来了 学啥2.0 啊 🐶
## 代码已不维护，可移步 https://github.com/IFmiss/vue-website
## [demo地址](https://v2.daiwei.site/);

### vue-music

这是新的vue音乐播放器 UI 基本是仿照网易云音乐IOS系统的UI

新的代码才刚开始，不建议继续看以前[v1.0](https://github.com/IFmiss/vue-music/tree/v1.0)的代码，因为真的有待完善，所以我必须要写一个稍微靠谱一点的播放器，不能让你们和我一样踩同样的坑

最新的播放器会使用 [NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi/#/)的API，有兴趣可以看看

#### 项目安装 (保证vue-music和NeteaseCloudMusicApi为同级文件夹)
- step 1. 将最新的vue-music代码拉到本地
- step 2. 将NeteaseCloudMusicApi拉到本地
- step 3. 启动 NeteaseCloudMusicApi (npm start)  默认 端口为3000   如果觉得麻烦可以直接访问 https://daiwei.site/netease 调用api
- setp 4. 启动vue-music (npm run dev)  如果NeteaseCloudMusicApi是默认端口3000， 在vue-music项目中登陆之后基本可以跑通接口了

#### vue-cli3
项目基于vue-cli3.0搭建的vue开发环境

#### pug
vue的模版编辑都是基于[pug](https://pug.bootcss.com/api/getting-started.html)的，使用这个模版引擎会使得编写template里的内容会很方便

项目刚开始做的，而且正在进行中

想看之前老版本的代码，请切换到[v1.0](https://github.com/IFmiss/vue-music/tree/v1.0)的代码
