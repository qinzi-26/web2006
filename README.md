# Vue-Ego(易购)
易购后台商品管理系统，主要包含商品管理、规格参数管理、广告管理，同时包含登陆注册功能，集成了图表处理与合同的PDF处理

## 项目构建
前台：Vue+Vue-Router+Vuex+Element+Axios+Echarts+国际化+第三方依赖
后台：Node+Token处理+MySQL

## 项目依赖
网络请求：npm install --save axios
ElementUI：vue add element
图表：npm install --save echarts
jwt：npm install --save jwt-decode

## 后台依赖
npm install --save express
npm install --save mysql
npm install --save jsonwebtoken

## 项目页面构建
1. 容器：Layout
2. 商品管理：Product/index.vue
3. 规格参数：Params/index.vue
4. 内容管理：Content/index.vue
5. 登陆注册：Login
6. 个人中心：UCenter
7. CSS文件初始化

## 路由配置
参考:vue-ego/src/router/index.js

## 功能实现
1. 顶部导航
2. 登陆配置，路由权限配置
3. 登陆注册功能模块
4. Vuex管理登陆数据

## 后台接口
1. 登陆接口

## Elememnt-UI组件
1. NavMenu 导航菜单
2. Form 表单
3. Card 卡片
4. Button 按钮
5. Icon 图标
6. Upload 上传
7. Table 表格
8. Tree 树形控件
9. Pagination 分页
10. Message 消息提示
11. Tabs 标签页
12. ¶Dialog 对话框
13. Loading 加载

## 国际化
(参考网址)[http://kazupon.github.io/vue-i18n/zh/]
### 安装依赖
npm install vue-i18n --save

