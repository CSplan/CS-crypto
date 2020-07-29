[cs-crypto](../README.md) › [Globals](../globals.md) › ["asymmetric/rsa"](_asymmetric_rsa_.md)

# Module: "asymmetric/rsa"

## Index

### Functions

* [generateKeypair](_asymmetric_rsa_.md#generatekeypair)
* [unwrapKey](_asymmetric_rsa_.md#unwrapkey)
* [unwrapPrivateKey](_asymmetric_rsa_.md#unwrapprivatekey)
* [wrapKey](_asymmetric_rsa_.md#wrapkey)
* [wrapPrivateKey](_asymmetric_rsa_.md#wrapprivatekey)

## Functions

###  generateKeypair

▸ **generateKeypair**(`keySize`: number): *PromiseLike‹CryptoKeyPair›*

*Defined in [asymmetric/rsa.ts:49](https://github.com/very-amused/CS-crypto/blob/a6f8797/src/asymmetric/rsa.ts#L49)*

Generate an RSA keypair of a specified keysize

**Parameters:**

Name | Type |
------ | ------ |
`keySize` | number |

**Returns:** *PromiseLike‹CryptoKeyPair›*

___

###  unwrapKey

▸ **unwrapKey**(`encodedKey`: string, `unwrappingKey`: CryptoKey): *PromiseLike‹CryptoKey›*

*Defined in [asymmetric/rsa.ts:151](https://github.com/very-amused/CS-crypto/blob/a6f8797/src/asymmetric/rsa.ts#L151)*

**Parameters:**

Name | Type |
------ | ------ |
`encodedKey` | string |
`unwrappingKey` | CryptoKey |

**Returns:** *PromiseLike‹CryptoKey›*

___

###  unwrapPrivateKey

▸ **unwrapPrivateKey**(`encodedPrivateKey`: string, `passphrase`: string, `PBKDF2salt`: Uint8Array): *Promise‹CryptoKey›*

*Defined in [asymmetric/rsa.ts:96](https://github.com/very-amused/CS-crypto/blob/a6f8797/src/asymmetric/rsa.ts#L96)*

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

*Defined in [asymmetric/rsa.ts:135](https://github.com/very-amused/CS-crypto/blob/a6f8797/src/asymmetric/rsa.ts#L135)*

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

*Defined in [asymmetric/rsa.ts:66](https://github.com/very-amused/CS-crypto/blob/a6f8797/src/asymmetric/rsa.ts#L66)*

Encrypt an RSA private key using an AES private key generated using a passphrase and salt

**Parameters:**

Name | Type |
------ | ------ |
`privateKey` | CryptoKey |
`passphrase` | string |
`PBKDF2salt` | Uint8Array |
`algorithm` | "AES-GCM" &#124; "AES-CBC" |

**Returns:** *Promise‹string›*
