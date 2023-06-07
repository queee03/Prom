import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.es.js',
    format: 'es',
  },
  plugins: [
    // 插件是按顺序执行的
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: './tsconfig.build.json' }),
  ],
};
