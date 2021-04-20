import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: [
    // Regular and minified esnext module bundles
    {
      file: 'dist/cs-crypto.esm.js',
      format: 'es'
    },
    {
      file: 'dist/cs-crypto.esm.min.js',
      format: 'es',
      plugins: [terser()]
    }
  ],
  plugins: [
    typescript({
      tsconfig: 'src/tsconfig-esm.json',
      declaration: false
    })
  ],
  external: ['node-webcrypto-ossl', 'worker_threads']
}
