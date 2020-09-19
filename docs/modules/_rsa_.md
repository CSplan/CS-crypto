[cs-crypto](../README.md) › [Globals](../globals.md) › ["rsa"](_rsa_.md)

# Module: "rsa"

## Index

### Functions

* [exportPublicKey](_rsa_.md#exportpublickey)
* [generateKeypair](_rsa_.md#generatekeypair)
* [importPublicKey](_rsa_.md#importpublickey)
* [unwrapKey](_rsa_.md#unwrapkey)
* [unwrapPrivateKey](_rsa_.md#unwrapprivatekey)
* [wrapKey](_rsa_.md#wrapkey)
* [wrapPrivateKey](_rsa_.md#wrapprivatekey)

## Functions

###  exportPublicKey

▸ **exportPublicKey**(`publicKey`: CryptoKey): *Promise‹string›*

*Defined in [rsa.ts:96](https://github.com/very-amused/CS-crypto/blob/b15ee1f/src/rsa.ts#L96)*

Export an RSA public key as base64 encoded text

**Parameters:**

Name | Type |
------ | ------ |
`publicKey` | CryptoKey |

**Returns:** *Promise‹string›*

___

###  generateKeypair

▸ **generateKeypair**(`keySize`: number): *PromiseLike‹CryptoKeyPair›*

*Defined in [rsa.ts:10](https://github.com/very-amused/CS-crypto/blob/b15ee1f/src/rsa.ts#L10)*

Generate an RSA keypair of a specified keysize

**Parameters:**

Name | Type |
------ | ------ |
`keySize` | number |

**Returns:** *PromiseLike‹CryptoKeyPair›*

___

###  importPublicKey

▸ **importPublicKey**(`encoded`: string): *PromiseLike‹CryptoKey›*

*Defined in [rsa.ts:106](https://github.com/very-amused/CS-crypto/blob/b15ee1f/src/rsa.ts#L106)*

Import an RSA public key from base64 encoded text

**Parameters:**

Name | Type |
------ | ------ |
`encoded` | string |

**Returns:** *PromiseLike‹CryptoKey›*

___

###  unwrapKey

▸ **unwrapKey**(`encodedKey`: string, `unwrappingKey`: CryptoKey): *PromiseLike‹CryptoKey›*

*Defined in [rsa.ts:138](https://github.com/very-amused/CS-crypto/blob/b15ee1f/src/rsa.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`encodedKey` | string |
`unwrappingKey` | CryptoKey |

**Returns:** *PromiseLike‹CryptoKey›*

___

###  unwrapPrivateKey

▸ **unwrapPrivateKey**(`encodedPrivateKey`: string, `passphrase`: string, `PBKDF2salt`: Uint8Array): *Promise‹CryptoKey›*

*Defined in [rsa.ts:57](https://github.com/very-amused/CS-crypto/blob/b15ee1f/src/rsa.ts#L57)*

Decrypt an RSA private key using the same passphrase and salt that were passed to wrapPrivateKey

**Parameters:**

Name | Type |
------ | ------ |
`encodedPrivateKey` | string |
`passphrase` | string |
`PBKDF2salt` | Uint8Array |

**Returns:** *Promise‹CryptoKey›*

___

###  wrapKey

▸ **wrapKey**(`key`: CryptoKey, `wrappingKey`: CryptoKey): *Promise‹string›*

*Defined in [rsa.ts:122](https://github.com/very-amused/CS-crypto/blob/b15ee1f/src/rsa.ts#L122)*

Wrap (encrypt) a CryptoKey using an RSA public key

**Parameters:**

Name | Type |
------ | ------ |
`key` | CryptoKey |
`wrappingKey` | CryptoKey |

**Returns:** *Promise‹string›*

___

###  wrapPrivateKey

▸ **wrapPrivateKey**(`privateKey`: CryptoKey, `passphrase`: string, `PBKDF2salt`: Uint8Array, `algorithm`: "AES-GCM" | "AES-CBC"): *Promise‹string›*

*Defined in [rsa.ts:27](https://github.com/very-amused/CS-crypto/blob/b15ee1f/src/rsa.ts#L27)*

Encrypt an RSA private key using an AES private key generated using a passphrase and salt

**Parameters:**

Name | Type |
------ | ------ |
`privateKey` | CryptoKey |
`passphrase` | string |
`PBKDF2salt` | Uint8Array |
`algorithm` | "AES-GCM" &#124; "AES-CBC" |

**Returns:** *Promise‹string›*
