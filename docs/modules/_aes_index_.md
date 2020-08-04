[cs-crypto](../README.md) › [Globals](../globals.md) › ["aes/index"](_aes_index_.md)

# Module: "aes/index"

## Index

### Type aliases

* [DeepDecrypted](_aes_index_.md#deepdecrypted)
* [DeepEncryptable](_aes_index_.md#deepencryptable)
* [DeepEncrypted](_aes_index_.md#deepencrypted)

### Functions

* [decrypt](_aes_index_.md#decrypt)
* [deepDecrypt](_aes_index_.md#deepdecrypt)
* [deepEncrypt](_aes_index_.md#deepencrypt)
* [encrypt](_aes_index_.md#encrypt)
* [generateKey](_aes_index_.md#generatekey)

## Type aliases

###  DeepDecrypted

Ƭ **DeepDecrypted**: *[DeepEncryptable](_aes_index_.md#deepencryptable)*

Defined in aes/index.ts:107

Alias for encryptable data, used as a return type for deepDecrypt

___

###  DeepEncryptable

Ƭ **DeepEncryptable**: *[DeepEncryptable](_aes_index_.md#deepencryptable)[] | object | string | boolean*

Defined in aes/index.ts:99

Any data that is valid for encryption

___

###  DeepEncrypted

Ƭ **DeepEncrypted**: *[DeepEncrypted](_aes_index_.md#deepencrypted)[] | object | string*

Defined in aes/index.ts:103

A data structure of encrypted information

## Functions

###  decrypt

▸ **decrypt**(`ciphertext`: string, `key`: CryptoKey): *Promise‹string | boolean›*

Defined in aes/index.ts:57

Decrypt text that was previously encrypted using the same AES key

**Parameters:**

Name | Type |
------ | ------ |
`ciphertext` | string |
`key` | CryptoKey |

**Returns:** *Promise‹string | boolean›*

___

###  deepDecrypt

▸ **deepDecrypt**(`data`: [DeepEncrypted](_aes_index_.md#deepencrypted), `cryptoKey`: CryptoKey): *Promise‹[DeepDecrypted](_aes_index_.md#deepdecrypted)›*

Defined in aes/index.ts:142

Recursively decrypt an object or array while preserving its original structure

**Parameters:**

Name | Type |
------ | ------ |
`data` | [DeepEncrypted](_aes_index_.md#deepencrypted) |
`cryptoKey` | CryptoKey |

**Returns:** *Promise‹[DeepDecrypted](_aes_index_.md#deepdecrypted)›*

___

###  deepEncrypt

▸ **deepEncrypt**(`data`: [DeepEncryptable](_aes_index_.md#deepencryptable), `cryptoKey`: CryptoKey): *Promise‹[DeepEncrypted](_aes_index_.md#deepencrypted)›*

Defined in aes/index.ts:112

Recursively encrypt an object or array while preserving its original structure

**Parameters:**

Name | Type |
------ | ------ |
`data` | [DeepEncryptable](_aes_index_.md#deepencryptable) |
`cryptoKey` | CryptoKey |

**Returns:** *Promise‹[DeepEncrypted](_aes_index_.md#deepencrypted)›*

___

###  encrypt

▸ **encrypt**(`text`: string, `key`: CryptoKey): *Promise‹string›*

Defined in aes/index.ts:23

Encrypt text using AES-GCM or AES-CBC

**Parameters:**

Name | Type |
------ | ------ |
`text` | string |
`key` | CryptoKey |

**Returns:** *Promise‹string›*

___

###  generateKey

▸ **generateKey**(`type`: "AES-GCM" | "AES-CBC"): *PromiseLike‹CryptoKey›*

Defined in aes/index.ts:9

Generate a new 256 bit AES-GCM or AES-CBC key

**Parameters:**

Name | Type |
------ | ------ |
`type` | "AES-GCM" &#124; "AES-CBC" |

**Returns:** *PromiseLike‹CryptoKey›*
