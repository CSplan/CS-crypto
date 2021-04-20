import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const tsconfig = 'src/tsconfig.json'
const external = ['node-webcrypto-ossl']

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'module',
      format: 'es'
    },
    plugins: [
      typescript({
        tsconfig,
        declaration: true,
        outDir: 'module'
      })
    ],
    external
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/cs-crypto.min.js',
      format: 'es'
    },
    plugins: [
      typescript({
        tsconfig,
        declaration: false
      }),
      terser()
    ],
    external
  }
]
