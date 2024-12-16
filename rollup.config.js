import typescript from '@rollup/plugin-typescript'
import {readFileSync} from 'fs'
/** @property {string} version */
const pkg = JSON.parse(readFileSync('package.json'))

const banner = `/**
 * @license
 * cs-crypto v${pkg.version}
 * MIT License
 * Copyright (c) 2022 Keith Scroggs, CSplan LLC
 */\n`

export default {
  input: 'src/index.ts',
  output: {
    dir: 'build',
    format: 'es',
    banner
  },
  plugins: [
    typescript({
      tsconfig: 'src/tsconfig.json',
      outDir: 'build',
      removeComments: true
    })
  ],
  external: ['@peculiar/webcrypto']
}
