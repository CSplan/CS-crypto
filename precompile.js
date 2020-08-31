const fs = require('fs')

const isTestBuild = process.env.NODE_ENV === 'test'
const stripCodeRegex = /^( *)strip_code\(\)(;?)\n+((?<!end_strip_code\(\))[\s\S])*\n+( *)end_strip_code\(\)(;?)$/mg

try {
  const stat = fs.lstatSync('tmp')
  if (stat.isDirectory()) {
    // Only use the cached directory if not a test build
    if ((fs.readdirSync('tmp').values === fs.readdirSync('src').values) && !isTestBuild) {
      console.log('Using cached precompiled directory.')
      process.exit(0)
    }
  } else {
    fs.rmdirSync('tmp', {
      recursive: true
    })
    fs.mkdirSync('tmp')
  }
} catch {
  fs.mkdirSync('tmp')
}

for (const file of fs.readdirSync('src')) {
  // Process the file
  const content = fs.readFileSync(`src/${file}`).toString()
  // Strip any block between strip_code() and end_strip_code()
  const processed = content.replace(stripCodeRegex, '')
  // Write the processed file to the tmp directory (or the original if a test build is detected)
  if (isTestBuild) {
    fs.writeFileSync(`tmp/${file}`, content)
  } else {
    fs.writeFileSync(`tmp/${file}`, processed)
  }
}
