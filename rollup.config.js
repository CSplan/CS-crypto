import typescript from '@rollup/plugin-typescript'

const tsconfig = 'src/tsconfig.json'
const external = ['@peculiar/webcrypto']

export default {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'es'
  },
  plugins: [
    typescript({
      tsconfig,
      outDir: 'lib',
      removeComments: true
    })
  ],
  external
}
