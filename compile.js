#! /usr/bin/env node

const { spawn } = require('child_process')
const fs = require('fs')
const tsc = 'node_modules/typescript/bin/tsc'

// Parse build arguments
let isTestBuild = false
let isEsmBuild = false
for (const arg of process.argv.slice(2)) {
  if (arg === '-test' || arg === '--test') {
    isTestBuild = true
  } else if (arg === '-esm' || arg === '--esm') {
    isEsmBuild = true
  }
}

const stripCodeRegex = /^( *)\/\/ strip-code\n[\s\S]*?\n( *)\/\/ end-strip-code$/mg
const importRegex = /^(import|export) ({ )?(\S,?)+( })? from '\S+'(;?)$/g

// Generate a random id to append to the tmp directory (5 digits of base16)
let id = ''
for (let i = 0; i < 5; i++) {
  const int = Math.round(16 * Math.random())
  id += int.toString(16)
}
const tmp = `/tmp/cs-crypto-${id}`

// Backup the original src directory before precompiling
try {
  fs.mkdirSync(tmp)
} catch {
  fs.rmdirSync(tmp, {
    recursive: true
  })
  fs.mkdirSync(tmp)
}

// Patch the src
for (const file of fs.readdirSync('src')) {
  try {
    fs.copyFileSync(`src/${file}`, `${tmp}/${file}`)
  } catch {
    // Don't patch any file that wasn't successfully able to be backed up
    continue
  }
  if (!file.endsWith('.ts') || isTestBuild) {
    break
  }
  
  const content = fs.readFileSync(`src/${file}`).toString()
    .replace(stripCodeRegex, '')   // Strip any code blocks between // strip-code and // end-strip-code
  fs.writeFileSync(`src/${file}`, content)
}

// Run the typescript compiler
const cmd = isEsmBuild ? spawn(tsc, ['--module', 'esnext']) : spawn(tsc)
cmd.stdout.pipe(process.stdout)
cmd.stderr.pipe(process.stderr)
cmd.on('close', (code) => {
  // Restore the backup of the src directory
  for (const file of fs.readdirSync(tmp)) {
    fs.copyFileSync(`${tmp}/${file}`, `src/${file}`)
  }
  // Delete the tmp directory
  fs.rmdirSync(tmp, {
    recursive: true
  })
  process.exit(code)
})
