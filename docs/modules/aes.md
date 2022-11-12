[cs-crypto](../README.md) / [Exports](../modules.md) / aes

# Namespace: aes

## Table of contents

### Type aliases

- [StringLike](aes.md#stringlike)

### Functions

- [ABdecrypt](aes.md#abdecrypt)
- [ABencrypt](aes.md#abencrypt)
- [binaryDecrypt](aes.md#binarydecrypt)
- [binaryEncrypt](aes.md#binaryencrypt)
- [blobDecrypt](aes.md#blobdecrypt)
- [decrypt](aes.md#decrypt)
- [deepDecrypt](aes.md#deepdecrypt)
- [deepEncrypt](aes.md#deepencrypt)
- [encrypt](aes.md#encrypt)
- [exportKey](aes.md#exportkey)
- [generateKey](aes.md#generatekey)
- [importKeyMaterial](aes.md#importkeymaterial)

## Type aliases

### StringLike

Ƭ **StringLike**: `Object`

Any data that is valid for encryption

#### Type declaration

| Name | Type |
| :------ | :------ |
| `toString` | () => `string` |

#### Defined in

[aes.ts:114](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L114)

## Functions

### ABdecrypt

▸ **ABdecrypt**(`cipherbuf`, `key`): `Promise`<`Uint8Array`\>

**`deprecated`** - Use binaryDecrypt
Decrypt an ArrayBuffer

#### Parameters

| Name | Type |
| :------ | :------ |
| `cipherbuf` | `Uint8Array` |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[aes.ts:166](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L166)

___

### ABencrypt

▸ **ABencrypt**(`plainbuf`, `key`): `Promise`<`Uint8Array`\>

**`deprecated`** - Use aes.binaryEncrypt
Encrypt an ArrayBuffer, used for encrypting non-text data such as images

#### Parameters

| Name | Type |
| :------ | :------ |
| `plainbuf` | `Uint8Array` \| `ArrayBuffer` |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[aes.ts:158](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L158)

___

### binaryDecrypt

▸ **binaryDecrypt**(`ciphertext`, `key`): `Promise`<`Uint8Array`\>

Decrypt a Uint8Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `ciphertext` | `Uint8Array` |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[aes.ts:138](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L138)

___

### binaryEncrypt

▸ **binaryEncrypt**(`plaintext`, `key`): `Promise`<`Uint8Array`\>

Encrypt a Uint8Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `plaintext` | `Uint8Array` |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[aes.ts:121](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L121)

___

### blobDecrypt

▸ **blobDecrypt**(`ciphertext`, `key`, `encoding`): `Promise`<`Blob`\>

Decrypt an ArrayBuffer as a blob with a specified encoding

#### Parameters

| Name | Type |
| :------ | :------ |
| `ciphertext` | `Uint8Array` |
| `key` | `CryptoKey` |
| `encoding` | `string` |

#### Returns

`Promise`<`Blob`\>

#### Defined in

[aes.ts:174](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L174)

___

### decrypt

▸ **decrypt**(`ciphertext`, `key`): `Promise`<`string`\>

Decrypt text that was previously encrypted using the same AES key

#### Parameters

| Name | Type |
| :------ | :------ |
| `ciphertext` | `string` |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`string`\>

#### Defined in

[aes.ts:87](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L87)

___

### deepDecrypt

▸ **deepDecrypt**<`T`\>(`data`, `cryptoKey`): `Promise`<`T`\>

Recursively decrypt an object or array while preserving its original structure

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `cryptoKey` | `CryptoKey` |

#### Returns

`Promise`<`T`\>

#### Defined in

[aes.ts:215](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L215)

___

### deepEncrypt

▸ **deepEncrypt**<`T`\>(`data`, `cryptoKey`): `Promise`<`T`\>

Recursively encrypt an object or array while preserving its original structure

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `cryptoKey` | `CryptoKey` |

#### Returns

`Promise`<`T`\>

#### Defined in

[aes.ts:184](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L184)

___

### encrypt

▸ **encrypt**(`text`, `key`): `Promise`<`string`\>

Encrypt text using AES-GCM or AES-CBC

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`string`\>

#### Defined in

[aes.ts:47](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L47)

___

### exportKey

▸ **exportKey**(`key`): `Promise`<`string`\>

Export an AES key using base64 encoding

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`string`\>

#### Defined in

[aes.ts:245](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L245)

___

### generateKey

▸ **generateKey**(`type`): `PromiseLike`<`CryptoKey`\>

Generate a new 256 bit AES-GCM or AES-CBC key

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"AES-GCM"`` \| ``"AES-CBC"`` |

#### Returns

`PromiseLike`<`CryptoKey`\>

#### Defined in

[aes.ts:28](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L28)

___

### importKeyMaterial

▸ **importKeyMaterial**(`keyMaterial`, `type`): `PromiseLike`<`CryptoKey`\>

Import an AES key from raw key material

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyMaterial` | `Uint8Array` |
| `type` | [`AES_GCM`](../enums/Algorithms.md#aes_gcm) \| [`AES_CBC`](../enums/Algorithms.md#aes_cbc) |

#### Returns

`PromiseLike`<`CryptoKey`\>

#### Defined in

[aes.ts:15](https://github.com/very-amused/cs-crypto/blob/4e95e0e/src/aes.ts#L15)
