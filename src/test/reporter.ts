import 'jasmine'
import 'process'


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
		for (const expectation of result.failedExpectations) {
			process.stdout.write(`\n\t \x1b[31mFAIL\x1b[0m: ${expectation.message}`)
		}
		process.stdout.write('\n')
	}
}

export default reporter
