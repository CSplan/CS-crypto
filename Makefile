export DESTDIR=$(shell pwd)/wasm

all: ed25519

ed25519:
	$(MAKE) -C c/ed25519 prepare && $(MAKE) -C c/ed25519