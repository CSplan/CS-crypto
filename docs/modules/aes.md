[cs-crypto](../README.md) / [Exports](../modules.md) / aes

# Namespace: aes

## Table of contents

### Type aliases

- [DeepDecrypted](aes.md#deepdecrypted)
- [DeepEncryptable](aes.md#deepencryptable)
- [DeepEncrypted](aes.md#deepencrypted)

### Functions

- [decrypt](aes.md#decrypt)
- [deepDecrypt](aes.md#deepdecrypt)
- [deepEncrypt](aes.md#deepencrypt)
- [encrypt](aes.md#encrypt)
- [exportKey](aes.md#exportkey)
- [generateKey](aes.md#generatekey)
- [importKeyMaterial](aes.md#importkeymaterial)

## Type aliases

### DeepDecrypted

Ƭ **DeepDecrypted**: [*DeepEncryptable*](aes.md#deepencryptable)

Alias for encryptable data, used as a return type for deepDecrypt

Defined in: [aes.ts:120](https://github.com/very-amused/CS-crypto/blob/4e04ae3/src/aes.ts#L120)

___

### DeepEncryptable

Ƭ **DeepEncryptable**: [*DeepEncryptable*](aes.md#deepencryptable)[] \| { [index: string]: [*DeepEncryptable*](aes.md#deepencryptable);  } \| *string* \| *boolean*

Any data that is valid for encryption

Defined in: [aes.ts:112](https://github.com/very-amused/CS-crypto/blob/4e04ae3/src/aes.ts#L112)

___

### DeepEncrypted

Ƭ **DeepEncrypted**: [*DeepEncrypted*](aes.md#deepencrypted)[] \| { [index: string]: [*DeepEncrypted*](aes.md#deepencrypted);  } \| *string*

A data structure of encrypted information

Defined in: [aes.ts:116](https://github.com/very-amused/CS-crypto/blob/4e04ae3/src/aes.ts#L116)

## Functions

### decrypt

▸ **decrypt**(`ciphertext`: *string*, `key`: CryptoKey): *Promise*<string \| boolean\>

Decrypt text that was previously encrypted using the same AES key

#### Parameters:

Name | Type |
:------ | :------ |
`ciphertext` | *string* |
`key` | CryptoKey |

**Returns:** *Promise*<string \| boolean\>

Defined in: [aes.ts:70](https://github.com/very-amused/CS-crypto/blob/4e04ae3/src/aes.ts#L70)

___

### deepDecrypt

▸ **deepDecrypt**(`data`: [*DeepEncrypted*](aes.md#deepencrypted), `cryptoKey`: CryptoKey): *Promise*<[*DeepDecrypted*](aes.md#deepdecrypted)\>

Recursively decrypt an object or array while preserving its original structure

#### Parameters:

Name | Type |
:------ | :------ |
`data` | [*DeepEncrypted*](aes.md#deepencrypted) |
`cryptoKey` | CryptoKey |

**Returns:** *Promise*<[*DeepDecrypted*](aes.md#deepdecrypted)\>

Defined in: [aes.ts:155](https://github.com/very-amused/CS-crypto/blob/4e04ae3/src/aes.ts#L155)

___

### deepEncrypt

▸ **deepEncrypt**(`data`: [*DeepEncryptable*](aes.md#deepencryptable), `cryptoKey`: CryptoKey): *Promise*<[*DeepEncrypted*](aes.md#deepencrypted)\>

Recursively encrypt an object or array while preserving its original structure

#### Parameters:

Name | Type |
:------ | :------ |
`data` | [*DeepEncryptable*](aes.md#deepencryptable) |
`cryptoKey` | CryptoKey |

**Returns:** *Promise*<[*DeepEncrypted*](aes.md#deepencrypted)\>

Defined in: [aes.ts:125](https://github.com/very-amused/CS-crypto/blob/4e04ae3/src/aes.ts#L125)

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

Defined in: [aes.ts:48](https://github.com/very-amused/CS-crypto/blob/4e04ae3/src/aes.ts#L48)

___

### exportKey

▸ **exportKey**(`key`: CryptoKey): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`key` | CryptoKey |

**Returns:** *Promise*<string\>

Defined in: [aes.ts:182](https://github.com/very-amused/CS-crypto/blob/4e04ae3/src/aes.ts#L182)

___

### generateKey

▸ **generateKey**(`type`: *AES-GCM* \| *AES-CBC*): *PromiseLike*<CryptoKey\>

Generate a new 256 bit AES-GCM or AES-CBC key

#### Parameters:

Name | Type |
:------ | :------ |
`type` | *AES-GCM* \| *AES-CBC* |

**Returns:** *PromiseLike*<CryptoKey\>

Defined in: [aes.ts:22](https://github.com/very-amused/CS-crypto/blob/4e04ae3/src/aes.ts#L22)

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

Defined in: [aes.ts:9](https://github.com/very-amused/CS-crypto/blob/4e04ae3/src/aes.ts#L9)
