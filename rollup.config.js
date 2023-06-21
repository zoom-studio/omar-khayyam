import babel from 'rollup-plugin-babel'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: './source/index.ts',
    output: [
      { file: 'dist/index.js', format: 'cjs' },
      { file: 'dist/index.es.js', format: 'es', exports: 'named' },
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: [],
      }),
      typescript(),
      terser(),
    ],
  },
]
