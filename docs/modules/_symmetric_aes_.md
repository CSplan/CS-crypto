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

Defined in symmetric/aes.ts:49

**Parameters:**

Name | Type |
------ | ------ |
`ciphertext` | string |
`key` | CryptoKey |

**Returns:** *Promise‹string›*

___

###  encrypt

▸ **encrypt**(`text`: string, `key`: CryptoKey): *Promise‹string›*

Defined in symmetric/aes.ts:17

**Parameters:**

Name | Type |
------ | ------ |
`text` | string |
`key` | CryptoKey |

**Returns:** *Promise‹string›*

___

###  generateKey

▸ **generateKey**(`type`: "AES-GCM" | "AES-CBC"): *PromiseLike‹CryptoKey›*

Defined in symmetric/aes.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`type` | "AES-GCM" &#124; "AES-CBC" |

**Returns:** *PromiseLike‹CryptoKey›*
