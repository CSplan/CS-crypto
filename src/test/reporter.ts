import 'jasmine'
import 'process'

const failedSuites = new Map<string, boolean>()

const reporter: jasmine.CustomReporter = {
  jasmineStarted() {
    console.log('Running tests:\n')
  },
  suiteStarted(result) {
    console.log(`[${result.description}]`)
  },
  specStarted(result) {
    process.stdout.write(`\t\u2014 ${result.description}`)
  },
  specDone(result) {
    if (result.failedExpectations.length === 0) {
      process.stdout.write(' \x1b[32mOK\x1b[0m\n')
      return
    }
    // Mark the suite as failed if any specs within it fail, mimicking Go's test behavior
    failedSuites.set((result as jasmine.SpecResult & { parentSuiteId: string })['parentSuiteId'], true)
    for (const expectation of result.failedExpectations) {
      process.stdout.write(`\n\t \x1b[31mFAIL\x1b[0m: ${expectation.message}`)
    }
    process.stdout.write('\n')
  },
  suiteDone(result) {
    if (result.failedExpectations.length === 0 && !failedSuites.has(result.id)) {
      process.stdout.write(`\x1b[32m[${result.description}: OK]\x1b[0m\n\n`)
      return
    }
    process.stdout.write(`\x1b[31m[${result.description}: FAIL]\x1b[0m\n\n`)
  }
}

export default reporter
