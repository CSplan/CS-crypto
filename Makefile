export DESTDIR=$(shell pwd)/wasm

ed25519:
	$(MAKE) -C c/ed25519 prepare && $(MAKE) -C c/ed25519