[cs-crypto](../README.md) / [Exports](../modules.md) / rsa

# Namespace: rsa

## Table of contents

### Functions

- [exportPublicKey](rsa.md#exportpublickey)
- [generateKeypair](rsa.md#generatekeypair)
- [importPublicKey](rsa.md#importpublickey)
- [unwrapKey](rsa.md#unwrapkey)
- [unwrapPrivateKey](rsa.md#unwrapprivatekey)
- [wrapKey](rsa.md#wrapkey)
- [wrapPrivateKey](rsa.md#wrapprivatekey)

## Functions

### exportPublicKey

▸ **exportPublicKey**(`publicKey`: CryptoKey): *Promise*<string\>

Export an RSA public key as base64 encoded text

#### Parameters:

Name | Type |
:------ | :------ |
`publicKey` | CryptoKey |

**Returns:** *Promise*<string\>

Defined in: [rsa.ts:84](https://github.com/very-amused/CS-crypto/blob/0ceb37a/src/rsa.ts#L84)

___

### generateKeypair

▸ **generateKeypair**(`keySize`: *number*): *PromiseLike*<CryptoKeyPair\>

Generate an RSA keypair of a specified keysize

#### Parameters:

Name | Type |
:------ | :------ |
`keySize` | *number* |

**Returns:** *PromiseLike*<CryptoKeyPair\>

Defined in: [rsa.ts:9](https://github.com/very-amused/CS-crypto/blob/0ceb37a/src/rsa.ts#L9)

___

### importPublicKey

▸ **importPublicKey**(`encoded`: *string*): *PromiseLike*<CryptoKey\>

Import an RSA public key from base64 encoded text

#### Parameters:

Name | Type |
:------ | :------ |
`encoded` | *string* |

**Returns:** *PromiseLike*<CryptoKey\>

Defined in: [rsa.ts:95](https://github.com/very-amused/CS-crypto/blob/0ceb37a/src/rsa.ts#L95)

___

### unwrapKey

▸ **unwrapKey**(`encodedKey`: *string*, `unwrappingKey`: CryptoKey, `algorithm?`: *AES-GCM* \| *AEC-CBC*): *PromiseLike*<CryptoKey\>

Unwrap (decrypt) a CryptoKey using an RSA private key

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`encodedKey` | *string* | - |
`unwrappingKey` | CryptoKey | - |
`algorithm` | *AES-GCM* \| *AEC-CBC* | 'AES-GCM' |

**Returns:** *PromiseLike*<CryptoKey\>

Defined in: [rsa.ts:130](https://github.com/very-amused/CS-crypto/blob/0ceb37a/src/rsa.ts#L130)

___

### unwrapPrivateKey

▸ **unwrapPrivateKey**(`encodedPrivateKey`: *string*, `unwrappingKey`: CryptoKey): *Promise*<CryptoKey\>

Decrypt an RSA key using unwrappingKey (AES-GCM)

#### Parameters:

Name | Type |
:------ | :------ |
`encodedPrivateKey` | *string* |
`unwrappingKey` | CryptoKey |

**Returns:** *Promise*<CryptoKey\>

Defined in: [rsa.ts:53](https://github.com/very-amused/CS-crypto/blob/0ceb37a/src/rsa.ts#L53)

___

### wrapKey

▸ **wrapKey**(`key`: CryptoKey, `wrappingKey`: CryptoKey): *Promise*<string\>

Wrap (encrypt) a CryptoKey using an RSA public key

#### Parameters:

Name | Type |
:------ | :------ |
`key` | CryptoKey |
`wrappingKey` | CryptoKey |

**Returns:** *Promise*<string\>

Defined in: [rsa.ts:111](https://github.com/very-amused/CS-crypto/blob/0ceb37a/src/rsa.ts#L111)

___

### wrapPrivateKey

▸ **wrapPrivateKey**(`privateKey`: CryptoKey, `wrappingKey`: CryptoKey): *Promise*<string\>

Encrypt an RSA private key using an AES private key generated using a passphrase and salt

#### Parameters:

Name | Type |
:------ | :------ |
`privateKey` | CryptoKey |
`wrappingKey` | CryptoKey |

**Returns:** *Promise*<string\>

Defined in: [rsa.ts:26](https://github.com/very-amused/CS-crypto/blob/0ceb37a/src/rsa.ts#L26)
