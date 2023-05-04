# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 参考

https://git.imooc.com/coding-428/vikingship

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## 依赖

### `create-react-app`

项目构建，内置了很多配置，[文档](https://create-react-app.bootcss.com/docs/getting-started)

### `react-app-rewired`

用于在不暴露 `webpack` 配置的前提下完成自定义配置

### `customize-cra`

用于在不暴露 `webpack` 配置的前提下完成自定义配置

### `jest`

`create-react-app` 内置 `jest` 并为其做了基础配置，所以我们不用关心 `jest` 对 ts 的适配；也因此 `jest.config.js` 文件配置默认不会生效，如果在命令行中加上 `-- --config=jest.config.js` 强制启用则会完全覆盖默认配置；官方建议的配置方式是在 `package.json` 中添加配置。

#### 相关文档

- [running tests](https://create-react-app.dev/docs/running-tests)
- [configuration](https://create-react-app.dev/docs/running-tests/#configuration)

#### issues

- [引入 axios 报错](https://stackoverflow.com/questions/73958968/cannot-use-import-statement-outside-a-module-with-axios)

### `@testing-library`

[React Testing Library](https://create-react-app.dev/docs/running-tests/#react-testing-library)
用于组件测试

### `@fortawesome`

大型 icon 库，支持 fong-icon 和 svg 两种形式

### `react-transition-group`

辅助动画组件（本身不含任何动画效果）

### `storybook`

文档

### `rimraf`

跨平台命令行，用于删除文件
