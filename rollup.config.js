import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

const banner = `/**
 * @license
 * cs-crypto v${pkg.version}
 * MIT License
 * Copyright (c) 2022 Keith Scroggs, CSplan LLC
 */\n`

export default {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'es',
    banner
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
