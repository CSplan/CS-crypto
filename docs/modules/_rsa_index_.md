[cs-crypto](../README.md) › [Globals](../globals.md) › ["rsa/index"](_rsa_index_.md)

# Module: "rsa/index"

## Index

### Functions

* [generateKeypair](_rsa_index_.md#generatekeypair)
* [unwrapKey](_rsa_index_.md#unwrapkey)
* [unwrapPrivateKey](_rsa_index_.md#unwrapprivatekey)
* [wrapKey](_rsa_index_.md#wrapkey)
* [wrapPrivateKey](_rsa_index_.md#wrapprivatekey)

## Functions

###  generateKeypair

▸ **generateKeypair**(`keySize`: number): *PromiseLike‹CryptoKeyPair›*

Defined in rsa/index.ts:49

Generate an RSA keypair of a specified keysize

**Parameters:**

Name | Type |
------ | ------ |
`keySize` | number |

**Returns:** *PromiseLike‹CryptoKeyPair›*

___

###  unwrapKey

▸ **unwrapKey**(`encodedKey`: string, `unwrappingKey`: CryptoKey): *PromiseLike‹CryptoKey›*

Defined in rsa/index.ts:151

**Parameters:**

Name | Type |
------ | ------ |
`encodedKey` | string |
`unwrappingKey` | CryptoKey |

**Returns:** *PromiseLike‹CryptoKey›*

___

###  unwrapPrivateKey

▸ **unwrapPrivateKey**(`encodedPrivateKey`: string, `passphrase`: string, `PBKDF2salt`: Uint8Array): *Promise‹CryptoKey›*

Defined in rsa/index.ts:96

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

Defined in rsa/index.ts:135

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

Defined in rsa/index.ts:66

Encrypt an RSA private key using an AES private key generated using a passphrase and salt

**Parameters:**

Name | Type |
------ | ------ |
`privateKey` | CryptoKey |
`passphrase` | string |
`PBKDF2salt` | Uint8Array |
`algorithm` | "AES-GCM" &#124; "AES-CBC" |

**Returns:** *Promise‹string›*
