import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'tmp/index.ts',
  output: [
    // Regular and minified iife bundles
    {
      file: 'dist/cs-crypto.js',
      format: 'iife',
      name: 'csCrypto'
    },
    {
      file: 'dist/cs-crypto.min.js',
      format: 'iife',
      name: 'csCrypto',
      plugins: [terser()]
    },
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
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext',
          declaration: true
        },
        include: [
          'src'
        ]
      }
    })
  ],
  external: ['node-webcrypto-ossl', 'Base64']
}
