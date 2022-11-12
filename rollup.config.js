import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'es'
  },
  plugins: [
    typescript({
      tsconfig: 'src/tsconfig.json',
      outDir: 'lib',
      removeComments: true
    })
  ],
  external: ['@peculiar/webcrypto']
}
