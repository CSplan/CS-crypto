[cs-crypto](../README.md) › [Globals](../globals.md) › ["asymmetric/rsa"](_asymmetric_rsa_.md)

# Module: "asymmetric/rsa"

## Index

### Functions

* [deriveKey](_asymmetric_rsa_.md#derivekey)
* [generateKeypair](_asymmetric_rsa_.md#generatekeypair)
* [passphraseToKey](_asymmetric_rsa_.md#passphrasetokey)
* [unwrapPrivateKey](_asymmetric_rsa_.md#unwrapprivatekey)
* [wrapPrivateKey](_asymmetric_rsa_.md#wrapprivatekey)

## Functions

###  deriveKey

▸ **deriveKey**(`type`: "AES-GCM" | "AES-CBC", `passphrase`: string, `salt`: Uint8Array): *Promise‹CryptoKey›*

*Defined in [asymmetric/rsa.ts:23](https://github.com/very-amused/CS-crypto/blob/9a6363e/src/asymmetric/rsa.ts#L23)*

Derive a temporary key of a specified type from a salt and passphrase  using PBKDF2

**Parameters:**

Name | Type |
------ | ------ |
`type` | "AES-GCM" &#124; "AES-CBC" |
`passphrase` | string |
`salt` | Uint8Array |

**Returns:** *Promise‹CryptoKey›*

___

###  generateKeypair

▸ **generateKeypair**(`keySize`: number): *PromiseLike‹CryptoKeyPair›*

*Defined in [asymmetric/rsa.ts:49](https://github.com/very-amused/CS-crypto/blob/9a6363e/src/asymmetric/rsa.ts#L49)*

Generate an RSA keypair of a specified keysize

**Parameters:**

Name | Type |
------ | ------ |
`keySize` | number |

**Returns:** *PromiseLike‹CryptoKeyPair›*

___

###  passphraseToKey

▸ **passphraseToKey**(`passphrase`: string): *PromiseLike‹CryptoKey›*

*Defined in [asymmetric/rsa.ts:9](https://github.com/very-amused/CS-crypto/blob/9a6363e/src/asymmetric/rsa.ts#L9)*

Get key material from a passphrase to be used in PBKDF2

**Parameters:**

Name | Type |
------ | ------ |
`passphrase` | string |

**Returns:** *PromiseLike‹CryptoKey›*

___

###  unwrapPrivateKey

▸ **unwrapPrivateKey**(`encodedPrivateKey`: string, `passphrase`: string, `PBKDF2salt`: Uint8Array): *Promise‹CryptoKey›*

*Defined in [asymmetric/rsa.ts:91](https://github.com/very-amused/CS-crypto/blob/9a6363e/src/asymmetric/rsa.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`encodedPrivateKey` | string |
`passphrase` | string |
`PBKDF2salt` | Uint8Array |

**Returns:** *Promise‹CryptoKey›*

___

###  wrapPrivateKey

▸ **wrapPrivateKey**(`privateKey`: CryptoKey, `passphrase`: string, `PBKDF2salt`: Uint8Array, `algorithm`: "AES-GCM" | "AES-CBC"): *Promise‹string›*

*Defined in [asymmetric/rsa.ts:64](https://github.com/very-amused/CS-crypto/blob/9a6363e/src/asymmetric/rsa.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`privateKey` | CryptoKey |
`passphrase` | string |
`PBKDF2salt` | Uint8Array |
`algorithm` | "AES-GCM" &#124; "AES-CBC" |

**Returns:** *Promise‹string›*
