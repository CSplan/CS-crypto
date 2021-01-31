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

*Defined in [rsa.ts:84](https://github.com/very-amused/CS-crypto/blob/abdac76/src/rsa.ts#L84)*

Export an RSA public key as base64 encoded text

**Parameters:**

Name | Type |
------ | ------ |
`publicKey` | CryptoKey |

**Returns:** *Promise‹string›*

___

###  generateKeypair

▸ **generateKeypair**(`keySize`: number): *PromiseLike‹CryptoKeyPair›*

*Defined in [rsa.ts:9](https://github.com/very-amused/CS-crypto/blob/abdac76/src/rsa.ts#L9)*

Generate an RSA keypair of a specified keysize

**Parameters:**

Name | Type |
------ | ------ |
`keySize` | number |

**Returns:** *PromiseLike‹CryptoKeyPair›*

___

###  importPublicKey

▸ **importPublicKey**(`encoded`: string): *PromiseLike‹CryptoKey›*

*Defined in [rsa.ts:95](https://github.com/very-amused/CS-crypto/blob/abdac76/src/rsa.ts#L95)*

Import an RSA public key from base64 encoded text

**Parameters:**

Name | Type |
------ | ------ |
`encoded` | string |

**Returns:** *PromiseLike‹CryptoKey›*

___

###  unwrapKey

▸ **unwrapKey**(`encodedKey`: string, `unwrappingKey`: CryptoKey, `algorithm`: "AES-GCM" | "AEC-CBC"): *PromiseLike‹CryptoKey›*

*Defined in [rsa.ts:130](https://github.com/very-amused/CS-crypto/blob/abdac76/src/rsa.ts#L130)*

Unwrap (decrypt) a CryptoKey using an RSA private key

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encodedKey` | string | - |
`unwrappingKey` | CryptoKey | - |
`algorithm` | "AES-GCM" &#124; "AEC-CBC" | "AES-GCM" |

**Returns:** *PromiseLike‹CryptoKey›*

___

###  unwrapPrivateKey

▸ **unwrapPrivateKey**(`encodedPrivateKey`: string, `unwrappingKey`: CryptoKey): *Promise‹CryptoKey›*

*Defined in [rsa.ts:53](https://github.com/very-amused/CS-crypto/blob/abdac76/src/rsa.ts#L53)*

Decrypt an RSA key using unwrappingKey (AES-GCM)

**Parameters:**

Name | Type |
------ | ------ |
`encodedPrivateKey` | string |
`unwrappingKey` | CryptoKey |

**Returns:** *Promise‹CryptoKey›*

___

###  wrapKey

▸ **wrapKey**(`key`: CryptoKey, `wrappingKey`: CryptoKey): *Promise‹string›*

*Defined in [rsa.ts:111](https://github.com/very-amused/CS-crypto/blob/abdac76/src/rsa.ts#L111)*

Wrap (encrypt) a CryptoKey using an RSA public key

**Parameters:**

Name | Type |
------ | ------ |
`key` | CryptoKey |
`wrappingKey` | CryptoKey |

**Returns:** *Promise‹string›*

___

###  wrapPrivateKey

▸ **wrapPrivateKey**(`privateKey`: CryptoKey, `wrappingKey`: CryptoKey): *Promise‹string›*

*Defined in [rsa.ts:26](https://github.com/very-amused/CS-crypto/blob/abdac76/src/rsa.ts#L26)*

Encrypt an RSA private key using an AES private key generated using a passphrase and salt

**Parameters:**

Name | Type |
------ | ------ |
`privateKey` | CryptoKey |
`wrappingKey` | CryptoKey |

**Returns:** *Promise‹string›*
