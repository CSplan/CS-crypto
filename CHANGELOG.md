# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
