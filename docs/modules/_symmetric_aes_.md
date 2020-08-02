[cs-crypto](../README.md) › [Globals](../globals.md) › ["symmetric/aes"](_symmetric_aes_.md)

# Module: "symmetric/aes"

## Index

### Type aliases

* [DeepDecrypted](_symmetric_aes_.md#deepdecrypted)
* [DeepEncryptable](_symmetric_aes_.md#deepencryptable)
* [DeepEncrypted](_symmetric_aes_.md#deepencrypted)

### Functions

* [decrypt](_symmetric_aes_.md#decrypt)
* [deepDecrypt](_symmetric_aes_.md#deepdecrypt)
* [deepEncrypt](_symmetric_aes_.md#deepencrypt)
* [encrypt](_symmetric_aes_.md#encrypt)
* [generateKey](_symmetric_aes_.md#generatekey)

## Type aliases

###  DeepDecrypted

Ƭ **DeepDecrypted**: *[DeepEncryptable](_symmetric_aes_.md#deepencryptable)*

*Defined in [symmetric/aes.ts:107](https://github.com/very-amused/CS-crypto/blob/70df232/src/symmetric/aes.ts#L107)*

Alias for encryptable data, used as a return type for deepDecrypt

___

###  DeepEncryptable

Ƭ **DeepEncryptable**: *[DeepEncryptable](_symmetric_aes_.md#deepencryptable)[] | object | string | boolean*

*Defined in [symmetric/aes.ts:99](https://github.com/very-amused/CS-crypto/blob/70df232/src/symmetric/aes.ts#L99)*

Any data that is valid for encryption

___

###  DeepEncrypted

Ƭ **DeepEncrypted**: *[DeepEncrypted](_symmetric_aes_.md#deepencrypted)[] | object | string*

*Defined in [symmetric/aes.ts:103](https://github.com/very-amused/CS-crypto/blob/70df232/src/symmetric/aes.ts#L103)*

A data structure of encrypted information

## Functions

###  decrypt

▸ **decrypt**(`ciphertext`: string, `key`: CryptoKey): *Promise‹string | boolean›*

*Defined in [symmetric/aes.ts:57](https://github.com/very-amused/CS-crypto/blob/70df232/src/symmetric/aes.ts#L57)*

Decrypt text that was previously encrypted using the same AES key

**Parameters:**

Name | Type |
------ | ------ |
`ciphertext` | string |
`key` | CryptoKey |

**Returns:** *Promise‹string | boolean›*

___

###  deepDecrypt

▸ **deepDecrypt**(`data`: [DeepEncrypted](_symmetric_aes_.md#deepencrypted), `cryptoKey`: CryptoKey): *Promise‹[DeepDecrypted](_symmetric_aes_.md#deepdecrypted)›*

*Defined in [symmetric/aes.ts:142](https://github.com/very-amused/CS-crypto/blob/70df232/src/symmetric/aes.ts#L142)*

Recursively decrypt an object or array while preserving its original structure

**Parameters:**

Name | Type |
------ | ------ |
`data` | [DeepEncrypted](_symmetric_aes_.md#deepencrypted) |
`cryptoKey` | CryptoKey |

**Returns:** *Promise‹[DeepDecrypted](_symmetric_aes_.md#deepdecrypted)›*

___

###  deepEncrypt

▸ **deepEncrypt**(`data`: [DeepEncryptable](_symmetric_aes_.md#deepencryptable), `cryptoKey`: CryptoKey): *Promise‹[DeepEncrypted](_symmetric_aes_.md#deepencrypted)›*

*Defined in [symmetric/aes.ts:112](https://github.com/very-amused/CS-crypto/blob/70df232/src/symmetric/aes.ts#L112)*

Recursively encrypt an object or array while preserving its original structure

**Parameters:**

Name | Type |
------ | ------ |
`data` | [DeepEncryptable](_symmetric_aes_.md#deepencryptable) |
`cryptoKey` | CryptoKey |

**Returns:** *Promise‹[DeepEncrypted](_symmetric_aes_.md#deepencrypted)›*

___

###  encrypt

▸ **encrypt**(`text`: string, `key`: CryptoKey): *Promise‹string›*

*Defined in [symmetric/aes.ts:23](https://github.com/very-amused/CS-crypto/blob/70df232/src/symmetric/aes.ts#L23)*

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

*Defined in [symmetric/aes.ts:9](https://github.com/very-amused/CS-crypto/blob/70df232/src/symmetric/aes.ts#L9)*

Generate a new 256 bit AES-GCM or AES-CBC key

**Parameters:**

Name | Type |
------ | ------ |
`type` | "AES-GCM" &#124; "AES-CBC" |

**Returns:** *PromiseLike‹CryptoKey›*
