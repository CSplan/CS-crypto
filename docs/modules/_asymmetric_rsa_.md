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

Generate an RSA keypair of a specified keysize

**Parameters:**

Name | Type |
------ | ------ |
`keySize` | number |

**Returns:** *PromiseLike‹CryptoKeyPair›*

___

###  passphraseToKey

▸ **passphraseToKey**(`passphrase`: string): *PromiseLike‹CryptoKey›*

Get key material from a passphrase to be used in PBKDF2

**Parameters:**

Name | Type |
------ | ------ |
`passphrase` | string |

**Returns:** *PromiseLike‹CryptoKey›*

___

###  unwrapPrivateKey

▸ **unwrapPrivateKey**(`encodedPrivateKey`: string, `passphrase`: string, `PBKDF2salt`: Uint8Array): *Promise‹CryptoKey›*

Decrypt an RSA private key using the same passphrase and salt that were passed to wrapPrivateKey

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

Encrypt an RSA private key using an AES private key generated using a passphrase and salt

**Parameters:**

Name | Type |
------ | ------ |
`privateKey` | CryptoKey |
`passphrase` | string |
`PBKDF2salt` | Uint8Array |
`algorithm` | "AES-GCM" &#124; "AES-CBC" |

**Returns:** *Promise‹string›*
