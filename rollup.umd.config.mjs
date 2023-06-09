import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

import sass from 'rollup-plugin-sass';

export default {
  input: 'src/index.ts',
  output: {
    format: 'umd',
    dir: 'dist/umd',
    name: 'PromUI', // umd 格式需提供一个供用户使用的全局变量
    exports: 'named', // 指定打包后的模块使用全局变量命名的方式导出
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      axios: 'Axios',
    },
  },
  external: ['react', 'react-dom', 'axios'], // 仅排除几个常用的依赖库，让用户自己引入
  plugins: [
    // 插件是按顺序执行的
    nodeResolve(),
    commonjs(),
    json(),
    // excludeDependenciesFromBundle(), // 如果全部排除，则用户在引用我的库时还要把我所用到的所有依赖一起手动引入
    typescript({ tsconfig: './tsconfig.build.json' }),
    sass({
      output: 'dist/umd/index.css',
    }),
  ],
};
