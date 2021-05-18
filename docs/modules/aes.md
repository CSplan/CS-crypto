[cs-crypto](../README.md) / [Exports](../modules.md) / aes

# Namespace: aes

## Table of contents

### Type aliases

- [StringLike](aes.md#stringlike)

### Functions

- [decrypt](aes.md#decrypt)
- [deepDecrypt](aes.md#deepdecrypt)
- [deepEncrypt](aes.md#deepencrypt)
- [encrypt](aes.md#encrypt)
- [exportKey](aes.md#exportkey)
- [generateKey](aes.md#generatekey)
- [importKeyMaterial](aes.md#importkeymaterial)

## Type aliases

### StringLike

Ƭ **StringLike**: *object*

Any data that is valid for encryption

#### Type declaration:

Name | Type |
:------ | :------ |
`toString` | () => *string* |

Defined in: [aes.ts:111](https://github.com/very-amused/CS-crypto/blob/5c5d341/src/aes.ts#L111)

## Functions

### decrypt

▸ **decrypt**(`ciphertext`: *string*, `key`: CryptoKey): *Promise*<string\>

Decrypt text that was previously encrypted using the same AES key

#### Parameters:

Name | Type |
:------ | :------ |
`ciphertext` | *string* |
`key` | CryptoKey |

**Returns:** *Promise*<string\>

Defined in: [aes.ts:76](https://github.com/very-amused/CS-crypto/blob/5c5d341/src/aes.ts#L76)

___

### deepDecrypt

▸ **deepDecrypt**<T\>(`data`: T, `cryptoKey`: CryptoKey): *Promise*<T\>

Recursively decrypt an object or array while preserving its original structure

#### Type parameters:

Name | Type |
:------ | :------ |
`T` | *unknown* |

#### Parameters:

Name | Type |
:------ | :------ |
`data` | T |
`cryptoKey` | CryptoKey |

**Returns:** *Promise*<T\>

Defined in: [aes.ts:150](https://github.com/very-amused/CS-crypto/blob/5c5d341/src/aes.ts#L150)

___

### deepEncrypt

▸ **deepEncrypt**<T\>(`data`: T, `cryptoKey`: CryptoKey): *Promise*<T\>

Recursively encrypt an object or array while preserving its original structure

#### Type parameters:

Name | Type |
:------ | :------ |
`T` | *unknown* |

#### Parameters:

Name | Type |
:------ | :------ |
`data` | T |
`cryptoKey` | CryptoKey |

**Returns:** *Promise*<T\>

Defined in: [aes.ts:118](https://github.com/very-amused/CS-crypto/blob/5c5d341/src/aes.ts#L118)

___

### encrypt

▸ **encrypt**(`text`: *string*, `key`: CryptoKey): *Promise*<string\>

Encrypt text using AES-GCM or AES-CBC

#### Parameters:

Name | Type |
:------ | :------ |
`text` | *string* |
`key` | CryptoKey |

**Returns:** *Promise*<string\>

Defined in: [aes.ts:54](https://github.com/very-amused/CS-crypto/blob/5c5d341/src/aes.ts#L54)

___

### exportKey

▸ **exportKey**(`key`: CryptoKey): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`key` | CryptoKey |

**Returns:** *Promise*<string\>

Defined in: [aes.ts:178](https://github.com/very-amused/CS-crypto/blob/5c5d341/src/aes.ts#L178)

___

### generateKey

▸ **generateKey**(`type`: *AES-GCM* \| *AES-CBC*): *PromiseLike*<CryptoKey\>

Generate a new 256 bit AES-GCM or AES-CBC key

#### Parameters:

Name | Type |
:------ | :------ |
`type` | *AES-GCM* \| *AES-CBC* |

**Returns:** *PromiseLike*<CryptoKey\>

Defined in: [aes.ts:28](https://github.com/very-amused/CS-crypto/blob/5c5d341/src/aes.ts#L28)

___

### importKeyMaterial

▸ **importKeyMaterial**(`keyMaterial`: Uint8Array, `type`: [*AES\_GCM*](../enums/algorithms.md#aes_gcm) \| [*AES\_CBC*](../enums/algorithms.md#aes_cbc)): *PromiseLike*<CryptoKey\>

Import an AES key from raw key material

#### Parameters:

Name | Type |
:------ | :------ |
`keyMaterial` | Uint8Array |
`type` | [*AES\_GCM*](../enums/algorithms.md#aes_gcm) \| [*AES\_CBC*](../enums/algorithms.md#aes_cbc) |

**Returns:** *PromiseLike*<CryptoKey\>

Defined in: [aes.ts:15](https://github.com/very-amused/CS-crypto/blob/5c5d341/src/aes.ts#L15)
