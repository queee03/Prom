import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import typescript from 'rollup-plugin-typescript2';

import sass from 'rollup-plugin-sass';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.es.js',
    format: 'es',
  },
  // external: ['react', 'react-dom'],
  plugins: [
    // 插件是按顺序执行的
    nodeResolve(),
    commonjs(),
    json(),
    excludeDependenciesFromBundle(),
    typescript({ tsconfig: './tsconfig.build.json' }),
    sass({
      output: 'dist/index.css',
    }),
  ],
};
