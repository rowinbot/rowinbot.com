const camelCase = require('lodash.camelcase')
const typescript = require('rollup-plugin-typescript2')

const rollupPluginCopy = require('rollup-plugin-copy')
const { default: dts } = require('rollup-plugin-dts')
const pluginCommonjs = require('@rollup/plugin-commonjs')
const pluginJson = require('@rollup/plugin-json')
const pluginNodeResolve = require('@rollup/plugin-node-resolve')

const pkg = require('./package.json')

const libraryName = pkg.name

module.exports = [
  {
    input: `src/worker.ts`,
    output: [
      {
        file: 'dist/worker.js',
        name: 'Worker',
        format: 'cjs',
        sourcemap: false,
        inlineDynamicImports: false,
      },
    ],
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      pluginCommonjs(),
      pluginJson(),
      pluginNodeResolve({
        preferBuiltins: true,
        resolveOnly: [''],
      }),
    ],
  },
  {
    input: `src/index.ts`,
    output: [
      {
        // file: 'dist/index.js',
        dir: 'dist',
        name: camelCase(libraryName),
        format: 'cjs',
        sourcemap: false,
        inlineDynamicImports: false,
      },
      // { file: pkg.module, format: 'es', dir: 'dist', sourcemap: true },
    ],
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      rollupPluginCopy({
        targets: [
          { src: 'src/**/*.json', dest: 'dist' },
          { src: 'languages/**/*', dest: 'dist/languages' },
        ],
      }),
      {
        input: './src/index.d.ts',
        output: [{ file: 'dist/types.d.ts', format: 'cjs' }],
        plugins: [dts()],
      },
      pluginCommonjs(),
      pluginJson(),
      pluginNodeResolve({
        preferBuiltins: true,
        resolveOnly: [''],
      }),
    ],
  },
]
