src:=$(shell find src -mindepth 1 -type f -name '*.ts')
node-bin=node_modules/.bin

cs-crypto=build/index.js

JASMINE-FLAGS=--random=false

all: $(cs-crypto) declarations docs

release: clean .WAIT all test

$(cs-crypto): $(src)
	$(node-bin)/rollup -c

declarations: $(src)
	$(node-bin)/tsc -b src/tsconfig-d.json
	rm -rf build/internal
.PHONY: declarations

test: tests
	$(node-bin)/jasmine $(JASMINE-FLAGS) test/test/index.js
.PHONY: test
tests: $(src)
	$(node-bin)/tsc -b src/tsconfig-test.json

docs: $(src)
	$(node-bin)/typedoc --plugin typedoc-plugin-markdown src/index.ts --out docs
	sed 's/\[docs\](docs\/modules.md)/\[modules\](modules.md)/' -i docs/README.md

lint:
	$(node-bin)/eslint src/
.PHONY: lint

clean:
	rm -rf build
	rm -rf test
	rm -rf docs
.PHONY: clean
