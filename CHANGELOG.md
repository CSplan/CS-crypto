# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.2] 2023-09-20
### Added
- Optional options parameter for `aes.importKeyMaterial` of type `aes.ImportKeyMaterialOpts`

### Changed
- Migrated all tests from Ava to Jasmine
- Switched to GNU Make as build system

### Deprecated
- WARNING: Release 0.8.3 will be a **total purge for all functions marked as @deprecated**. Any code depending on functions deprecated as of 0.8.2 (including functions deprecated *only* as of 0.8.2) will break with 0.8.3 when these functions are **removed**.
- `rsa.wrapPrivateKey` and `rsa.unwrapPrivateKey`, these functions are now provided as `aes.wrapKey` and `aes.unwrapKey` to improve organization and consistency. *With consideration to the upcoming deprecation purge in 0.8.3, these functions are noteworthy as a rapid breaking change turnaround, migration should be prioritized.*

## [0.8.1] 2022-11-12
### Added
- `aes.binaryEncrypt` and `aes.binaryDecrypt` functions, superseding `aes.ABencrypt` and `aes.ABdecrypt`
- `binaryConcat` function, superseding `ABconcat` and accepting a variable amount of `Uint8Arrays` instead of only 2

### Changed
- Deprecated `aes.ABencrypt`, `aes.ABdecrypt`, and `ABconcat`, use `aes.binaryEncrypt`, `aes.binaryDecrypt`, and `binaryConcat` instead
- Deprecated exports of `encode` and `decode` from the root module, import these functions as `base64.encode` and `base64.decode`

### Removed
- Minified builds in `dist`, minification is now left up to library users. This change is made with the intent of simplifying the build process
- Comments from js build output, only declaration file and license comments are preserved in builds

## [0.8.0] 2022-05-08
### Changed
- This package is now exclusively an ES module with `type: module` declared in package.json
- Imports are now linted to require file extensions, this is necessary for node to run tests (node requires file extensions for all relative ESM imports)
- Clearer generic function signatures on `deepEncrypt` and `deepDecrypt`

### Removed
- All commonjs builds

## [0.7.4] - 2022-01-31
### Added
- `aes.deepEncrypt` and `aes.deepDecrypt` now pass through empty strings, preventing extraneous IV generation
- `exportable` parameter to `rsa.unwrapPrivateKey`, allowing RSA keys to be decrypted and then re-encrypted or exported (needed in CSplan for password changes)

### Changed
- Simplified and shortened test names

### Removed
- Dependency on `node-webcrypto-ossl` (deprecated) for testing, `@peculiar/webcrypto` is used instead

## [0.7.3] - 2021-10-04
### Added
- `aes.deepDecrypt` and `aes.deepEncrypt` now use generics for better return typing
- Configured terser to remove error messages for minified builds
- CommonJS builds are back
- `aes.ABencrypt` and `aes.ABdecrypt` - encrypt/decrypt array buffers
- `aes.blobDecrypt` - decrypt array buffer as typed blob

### Removed
- Parsing of 'true' or 'false' as booleans in `aes.decrypt`, applications should handle this manually on a case by case basis

### Fixed
- ESlint errors caused by TypeScript-incompatible rules

## [0.7.1] - 2021-02-17
### Fixed
- Base64 decoding now ignores newlines, which fixes decoding long base64 strings produced many standard implementations of base64 (including MySQL's `TO_BASE64()`)
- WebCrypto/node crypto provider detection errors

## [0.7.0] - 2021-01-31
### Added
- Full base64 implementation for encoding and decoding functions
- `aes.importKeyMaterial` function to import an AES-GCM or AES-CBC key from a Uint8Array of key material

### Removed
- `aes.deriveKey` function and all behavior related to PBKDF2
- Dependency of `atob` and `btoa` for encoding
- Encryption mode prefixes for wrapped keys, this makes 0.7.0 completely incompatible with any previous versions

### Changed
- `rsa.wrapPrivateKey` and `rsa.unwrapPrivateKey` are hardcoded to use AES-GCM encryption
- `aes.exportKey` no longer prepends a salt to the exported key

## [0.6.5] - 2020-09-19
### Added
- Build script and code stripping

### Fixed
- ESM imports

## [0.6.4] - 2020-08-28
### Added
- Optional exportable parameter to deriveKey function

### Removed
- ESM entry point (leaving ESM builds to the dist folder reduces project complexity)
- All references to NPM in package scripts

## [0.6.3] - 2020-08-27
### Added
- Type declarations to ESM module entry point

### Changed
- Names of build scripts

## [0.6.2] - 2020-08-27
### Added
- Function to export AES keys unencrypted

### Changed
- Encoding functions are now exported at the top level
- Moved AES deriveKey function from the RSA submodule to the AES submodule
- AES deriveKey function is now public

### Fixed
- Broken imports due to past submodule structure change

## [0.6.1] - 2020-08-04
### Added
- Functions to handle the importing and exporting of public RSA keys
- Unit tests for importing/exporting public RSA keys

## [0.6.0] - 2020-08-04
### Added
- ArrayBuffer -> Base64 encoding and decoding functions to exports

### Changed
- Submodule structure to allow more semantic imports (i.e: `import { wrapPrivateKey } from 'cs-crypto/rsa'`)

## [0.5.3] - 2020-08-02
### Removed
- Unnecessary whitespace from error messages, reducing minfied filesize and improving error readability

## [0.5.2] - 2020-07-30
### Added
- Rollup bundling system
- IIFE and esnext js available under dist
- Minified js dist files available for production use

## [0.5.1] - 2020-07-29
### Added
- .npmignore file for smaller package size
- Included esmodule build for usage with modern browsers
- Module starting point in package.json
- CHANGELOG.md for keeping track of changes

### Removed
- Source typescript in npm package
- Documentation in npm package

### Changed
- npm prepublish script to prepublishOnly (prepublish is deprecated by npm)

## [0.5.0] - 2020-07-29
### Added
- Internal Base64 encoding and decoding
- RSA key generation
- Wrapping of private RSA keys using a provided passphrase and salt
- AES-CBC/AES-GCM key generation
- Symmetric encryption using AES keys
- Wrapping AES keys using an RSA keypair
- Automatic parsing of key/encryption types through string formatting
- Unit tests (with GitHub CI)
- Automatic documentation generation using [TypeDoc](https://typedoc.org/)
