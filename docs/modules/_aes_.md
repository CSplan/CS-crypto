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
* [deriveKey](_aes_.md#derivekey)
* [encrypt](_aes_.md#encrypt)
* [exportKey](_aes_.md#exportkey)
* [generateKey](_aes_.md#generatekey)

## Type aliases

###  DeepDecrypted

Ƭ **DeepDecrypted**: *[DeepEncryptable](_aes_.md#deepencryptable)*

Defined in aes.ts:147

Alias for encryptable data, used as a return type for deepDecrypt

___

###  DeepEncryptable

Ƭ **DeepEncryptable**: *[DeepEncryptable](_aes_.md#deepencryptable)[] | object | string | boolean*

Defined in aes.ts:139

Any data that is valid for encryption

___

###  DeepEncrypted

Ƭ **DeepEncrypted**: *[DeepEncrypted](_aes_.md#deepencrypted)[] | object | string*

Defined in aes.ts:143

A data structure of encrypted information

## Functions

###  decrypt

▸ **decrypt**(`ciphertext`: string, `key`: CryptoKey): *Promise‹string | boolean›*

Defined in aes.ts:97

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

Defined in aes.ts:182

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

Defined in aes.ts:152

Recursively encrypt an object or array while preserving its original structure

**Parameters:**

Name | Type |
------ | ------ |
`data` | [DeepEncryptable](_aes_.md#deepencryptable) |
`cryptoKey` | CryptoKey |

**Returns:** *Promise‹[DeepEncrypted](_aes_.md#deepencrypted)›*

___

###  deriveKey

▸ **deriveKey**(`type`: "AES-GCM" | "AES-CBC", `passphrase`: string, `salt`: Uint8Array): *Promise‹CryptoKey›*

Defined in aes.ts:23

Derive an 256-bit AES key of a specified type from a salt and passphrase using PBKDF2

**Parameters:**

Name | Type |
------ | ------ |
`type` | "AES-GCM" &#124; "AES-CBC" |
`passphrase` | string |
`salt` | Uint8Array |

**Returns:** *Promise‹CryptoKey›*

___

###  encrypt

▸ **encrypt**(`text`: string, `key`: CryptoKey): *Promise‹string›*

Defined in aes.ts:63

Encrypt text using AES-GCM or AES-CBC

**Parameters:**

Name | Type |
------ | ------ |
`text` | string |
`key` | CryptoKey |

**Returns:** *Promise‹string›*

___

###  exportKey

▸ **exportKey**(`key`: CryptoKey, `PBKDF2salt`: Uint8Array): *Promise‹string›*

Defined in aes.ts:209

**Parameters:**

Name | Type |
------ | ------ |
`key` | CryptoKey |
`PBKDF2salt` | Uint8Array |

**Returns:** *Promise‹string›*

___

###  generateKey

▸ **generateKey**(`type`: "AES-GCM" | "AES-CBC"): *PromiseLike‹CryptoKey›*

Defined in aes.ts:49

Generate a new 256 bit AES-GCM or AES-CBC key

**Parameters:**

Name | Type |
------ | ------ |
`type` | "AES-GCM" &#124; "AES-CBC" |

**Returns:** *PromiseLike‹CryptoKey›*