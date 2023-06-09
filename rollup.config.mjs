import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import sass from 'rollup-plugin-sass';

const commonConfig = {
  input: 'src/index.ts',
  plugins: [
    // 插件是按顺序执行的
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: './tsconfig.build.json' }),
    sass({
      output: 'dist/index.css',
    }),
  ],
};

export default [
  {
    ...commonConfig,
    output: [
      {
        format: 'es',
        // dir: 'dist/es',
        file: 'dist/index.es.js',
      },
    ],
    plugins: [...commonConfig.plugins, excludeDependenciesFromBundle()],
  },
  {
    ...commonConfig,
    output: {
      format: 'umd',
      // dir: 'dist/umd',
      file: 'dist/index.umd.js',
      name: 'PromUI', // umd 格式需提供一个供用户使用的全局变量
      exports: 'named', // 指定打包后的模块使用全局变量命名的方式导出
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        axios: 'Axios',
      },
    },
    external: ['react', 'react-dom', 'axios'], // 针对 umd，仅排除几个常用的依赖库，让用户自己引入
    plugins: [...commonConfig.plugins, terser()],
  },
];
