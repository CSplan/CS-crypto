src:=$(shell find src -mindepth 1 -type f -name '*.ts')
node-bin=node_modules/.bin

cs-crypto=build/index.js
d-ts-tmp:=$(src:.ts=.d.ts)
d-ts:=$(d-ts-tmp:src/%=build/%)

JASMINE-FLAGS=--random=false

all: $(cs-crypto) declarations

$(cs-crypto): $(src)
	$(node-bin)/rollup -c

declarations: $(src)
	$(node-bin)/tsc -b src/tsconfig-d.json
	rm -rf build/internal
.PHONY: declarations

test: tests
	$(node-bin)/jasmine $(JASMINE-FLAGS) test/test/index.js
tests:
	$(node-bin)/tsc -b src/tsconfig-test.json
.PHONY: test tests

clean:
	rm -f $(d-ts) $(cs-crypto)
	rm -rf test/*
.PHONY: clean
