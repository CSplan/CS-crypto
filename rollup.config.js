import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const tsconfig = 'src/tsconfig.json'
const external = ['@peculiar/webcrypto']

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'lib',
      format: 'es'
    },
    plugins: [
      typescript({
        tsconfig,
        declaration: true,
        outDir: 'lib'
      })
    ],
    external
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/cs-crypto.js',
        format: 'es'
      },
      {
        file: 'dist/cs-crypto.min.js',
        format: 'es',
        plugins: [
          terser({
            compress: {
              global_defs: {
                'process.env.NODE_ENV': 'production'
              }
            }
          })
        ]
      }
    ],
    plugins: [
      typescript({
        tsconfig,
        declaration: false
      })
    ],
    external
  }
]
