##项目名称
气象数据六要素图表网页

##项目结构
本应用由 *数据库通信服务* 与 *网页端* 组成,   
单个 *数据库通信服务* 可服务多个 *网页端* 

##安装与运行
###数据库通信服务端
####环境与依赖安装
1. 安装 [Node.js](https://nodejs.org/)
2. 打开项目目录
3. 安装项目依赖: `npm install`.

####修改配置文件
1. 打开并编辑`server-config.json`配置数据库地址、账号密码以及数据库通信服务的运行端口

####运行
1. 运行`serverLauncher.bat`。
2. 确认服务器已在指定端口运行: 命令行显示 `Server is running on port ****`


###网页端
####修改配置文件
1. 打开并编辑`web-config.js`配置*数据库通信服务*地址与端口

####运行
1. 浏览器打开 `index.html`


###数据库信息配置
`server-config.json`可配置数据库名与表名,  
`web-config.js`可配置各要素对应的表头名字。

###网页端属性配置
`web-config,js`可配置数据抓取间隔，图表切换间隔