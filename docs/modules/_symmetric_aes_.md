[cs-crypto](../README.md) › [Globals](../globals.md) › ["symmetric/aes"](_symmetric_aes_.md)

# Module: "symmetric/aes"

## Index

### Functions

* [decrypt](_symmetric_aes_.md#decrypt)
* [encrypt](_symmetric_aes_.md#encrypt)
* [generateKey](_symmetric_aes_.md#generatekey)

## Functions

###  decrypt

▸ **decrypt**(`ciphertext`: string, `key`: CryptoKey): *Promise‹string›*

*Defined in [symmetric/aes.ts:58](https://github.com/very-amused/CS-crypto/blob/bc149ec/src/symmetric/aes.ts#L58)*

Decrypt text that was previously encrypted using the same AES key

**Parameters:**

Name | Type |
------ | ------ |
`ciphertext` | string |
`key` | CryptoKey |

**Returns:** *Promise‹string›*

___

###  encrypt

▸ **encrypt**(`text`: string, `key`: CryptoKey): *Promise‹string›*

*Defined in [symmetric/aes.ts:23](https://github.com/very-amused/CS-crypto/blob/bc149ec/src/symmetric/aes.ts#L23)*

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

*Defined in [symmetric/aes.ts:9](https://github.com/very-amused/CS-crypto/blob/bc149ec/src/symmetric/aes.ts#L9)*

Generate a new 256 bit AES-GCM or AES-CBC key

**Parameters:**

Name | Type |
------ | ------ |
`type` | "AES-GCM" &#124; "AES-CBC" |

**Returns:** *PromiseLike‹CryptoKey›*
