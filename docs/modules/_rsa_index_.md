[cs-crypto](../README.md) › [Globals](../globals.md) › ["rsa/index"](_rsa_index_.md)

# Module: "rsa/index"

## Index

### Functions

* [exportPublicKey](_rsa_index_.md#exportpublickey)
* [generateKeypair](_rsa_index_.md#generatekeypair)
* [importPublicKey](_rsa_index_.md#importpublickey)
* [unwrapKey](_rsa_index_.md#unwrapkey)
* [unwrapPrivateKey](_rsa_index_.md#unwrapprivatekey)
* [wrapKey](_rsa_index_.md#wrapkey)
* [wrapPrivateKey](_rsa_index_.md#wrapprivatekey)

## Functions

###  exportPublicKey

▸ **exportPublicKey**(`publicKey`: CryptoKey): *Promise‹string›*

*Defined in [rsa/index.ts:135](https://github.com/very-amused/CS-crypto/blob/f46156f/src/rsa/index.ts#L135)*

Export an RSA public key as base64 encoded text

**Parameters:**

Name | Type |
------ | ------ |
`publicKey` | CryptoKey |

**Returns:** *Promise‹string›*

___

###  generateKeypair

▸ **generateKeypair**(`keySize`: number): *PromiseLike‹CryptoKeyPair›*

*Defined in [rsa/index.ts:49](https://github.com/very-amused/CS-crypto/blob/f46156f/src/rsa/index.ts#L49)*

Generate an RSA keypair of a specified keysize

**Parameters:**

Name | Type |
------ | ------ |
`keySize` | number |

**Returns:** *PromiseLike‹CryptoKeyPair›*

___

###  importPublicKey

▸ **importPublicKey**(`encoded`: string): *PromiseLike‹CryptoKey›*

*Defined in [rsa/index.ts:145](https://github.com/very-amused/CS-crypto/blob/f46156f/src/rsa/index.ts#L145)*

Import an RSA public key from base64 encoded text

**Parameters:**

Name | Type |
------ | ------ |
`encoded` | string |

**Returns:** *PromiseLike‹CryptoKey›*

___

###  unwrapKey

▸ **unwrapKey**(`encodedKey`: string, `unwrappingKey`: CryptoKey): *PromiseLike‹CryptoKey›*

*Defined in [rsa/index.ts:177](https://github.com/very-amused/CS-crypto/blob/f46156f/src/rsa/index.ts#L177)*

**Parameters:**

Name | Type |
------ | ------ |
`encodedKey` | string |
`unwrappingKey` | CryptoKey |

**Returns:** *PromiseLike‹CryptoKey›*

___

###  unwrapPrivateKey

▸ **unwrapPrivateKey**(`encodedPrivateKey`: string, `passphrase`: string, `PBKDF2salt`: Uint8Array): *Promise‹CryptoKey›*

*Defined in [rsa/index.ts:96](https://github.com/very-amused/CS-crypto/blob/f46156f/src/rsa/index.ts#L96)*

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

*Defined in [rsa/index.ts:161](https://github.com/very-amused/CS-crypto/blob/f46156f/src/rsa/index.ts#L161)*

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

*Defined in [rsa/index.ts:66](https://github.com/very-amused/CS-crypto/blob/f46156f/src/rsa/index.ts#L66)*

Encrypt an RSA private key using an AES private key generated using a passphrase and salt

**Parameters:**

Name | Type |
------ | ------ |
`privateKey` | CryptoKey |
`passphrase` | string |
`PBKDF2salt` | Uint8Array |
`algorithm` | "AES-GCM" &#124; "AES-CBC" |

**Returns:** *Promise‹string›*
