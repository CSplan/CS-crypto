[cs-crypto](../README.md) › [Globals](../globals.md) › ["aes"](_aes_.md)

# Module: "aes"

## Index

### Type aliases

* [DeepDecrypted](_aes_.md#deepdecrypted)
* [DeepEncryptable](_aes_.md#deepencryptable)
* [DeepEncrypted](_aes_.md#deepencrypted)

### Functions

* [decrypt](_aes_.md#decrypt)
* [deepDecrypt](_aes_.md#deepdecrypt)
* [deepEncrypt](_aes_.md#deepencrypt)
* [encrypt](_aes_.md#encrypt)
* [exportKey](_aes_.md#exportkey)
* [generateKey](_aes_.md#generatekey)
* [importKeyMaterial](_aes_.md#importkeymaterial)

## Type aliases

###  DeepDecrypted

Ƭ **DeepDecrypted**: *[DeepEncryptable](_aes_.md#deepencryptable)*

*Defined in [aes.ts:119](https://github.com/very-amused/CS-crypto/blob/7fe6b70/src/aes.ts#L119)*

Alias for encryptable data, used as a return type for deepDecrypt

___

###  DeepEncryptable

Ƭ **DeepEncryptable**: *[DeepEncryptable](_aes_.md#deepencryptable)[] | object | string | boolean*

*Defined in [aes.ts:111](https://github.com/very-amused/CS-crypto/blob/7fe6b70/src/aes.ts#L111)*

Any data that is valid for encryption

___

###  DeepEncrypted

Ƭ **DeepEncrypted**: *[DeepEncrypted](_aes_.md#deepencrypted)[] | object | string*

*Defined in [aes.ts:115](https://github.com/very-amused/CS-crypto/blob/7fe6b70/src/aes.ts#L115)*

A data structure of encrypted information

## Functions

###  decrypt

▸ **decrypt**(`ciphertext`: string, `key`: CryptoKey): *Promise‹string | boolean›*

*Defined in [aes.ts:69](https://github.com/very-amused/CS-crypto/blob/7fe6b70/src/aes.ts#L69)*

Decrypt text that was previously encrypted using the same AES key

**Parameters:**

Name | Type |
------ | ------ |
`ciphertext` | string |
`key` | CryptoKey |

**Returns:** *Promise‹string | boolean›*

___

###  deepDecrypt

▸ **deepDecrypt**(`data`: [DeepEncrypted](_aes_.md#deepencrypted), `cryptoKey`: CryptoKey): *Promise‹[DeepDecrypted](_aes_.md#deepdecrypted)›*

*Defined in [aes.ts:154](https://github.com/very-amused/CS-crypto/blob/7fe6b70/src/aes.ts#L154)*

Recursively decrypt an object or array while preserving its original structure

**Parameters:**

Name | Type |
------ | ------ |
`data` | [DeepEncrypted](_aes_.md#deepencrypted) |
`cryptoKey` | CryptoKey |

**Returns:** *Promise‹[DeepDecrypted](_aes_.md#deepdecrypted)›*

___

###  deepEncrypt

▸ **deepEncrypt**(`data`: [DeepEncryptable](_aes_.md#deepencryptable), `cryptoKey`: CryptoKey): *Promise‹[DeepEncrypted](_aes_.md#deepencrypted)›*

*Defined in [aes.ts:124](https://github.com/very-amused/CS-crypto/blob/7fe6b70/src/aes.ts#L124)*

Recursively encrypt an object or array while preserving its original structure

**Parameters:**

Name | Type |
------ | ------ |
`data` | [DeepEncryptable](_aes_.md#deepencryptable) |
`cryptoKey` | CryptoKey |

**Returns:** *Promise‹[DeepEncrypted](_aes_.md#deepencrypted)›*

___

###  encrypt

▸ **encrypt**(`text`: string, `key`: CryptoKey): *Promise‹string›*

*Defined in [aes.ts:36](https://github.com/very-amused/CS-crypto/blob/7fe6b70/src/aes.ts#L36)*

Encrypt text using AES-GCM or AES-CBC

**Parameters:**

Name | Type |
------ | ------ |
`text` | string |
`key` | CryptoKey |

**Returns:** *Promise‹string›*

___

###  exportKey

▸ **exportKey**(`key`: CryptoKey): *Promise‹string›*

*Defined in [aes.ts:181](https://github.com/very-amused/CS-crypto/blob/7fe6b70/src/aes.ts#L181)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | CryptoKey |

**Returns:** *Promise‹string›*

___

###  generateKey

▸ **generateKey**(`type`: "AES-GCM" | "AES-CBC"): *PromiseLike‹CryptoKey›*

*Defined in [aes.ts:22](https://github.com/very-amused/CS-crypto/blob/7fe6b70/src/aes.ts#L22)*

Generate a new 256 bit AES-GCM or AES-CBC key

**Parameters:**

Name | Type |
------ | ------ |
`type` | "AES-GCM" &#124; "AES-CBC" |

**Returns:** *PromiseLike‹CryptoKey›*

___

###  importKeyMaterial

▸ **importKeyMaterial**(`keyMaterial`: Uint8Array, `type`: [AES_GCM](../enums/_constants_.algorithms.md#aes_gcm) | [AES_CBC](../enums/_constants_.algorithms.md#aes_cbc)): *PromiseLike‹CryptoKey›*

*Defined in [aes.ts:9](https://github.com/very-amused/CS-crypto/blob/7fe6b70/src/aes.ts#L9)*

Import an AES key from raw key material

**Parameters:**

Name | Type |
------ | ------ |
`keyMaterial` | Uint8Array |
`type` | [AES_GCM](../enums/_constants_.algorithms.md#aes_gcm) &#124; [AES_CBC](../enums/_constants_.algorithms.md#aes_cbc) |

**Returns:** *PromiseLike‹CryptoKey›*
