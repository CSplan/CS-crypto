[cs-crypto](../README.md) / [Exports](../modules.md) / aes

# Namespace: aes

## Table of contents

### Type aliases

- [StringLike](aes.md#stringlike)

### Functions

- [ABdecrypt](aes.md#abdecrypt)
- [ABencrypt](aes.md#abencrypt)
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

[aes.ts:115](https://github.com/very-amused/cs-crypto/blob/a3e327c/src/aes.ts#L115)

## Functions

### ABdecrypt

▸ **ABdecrypt**(`cipherbuf`, `key`): `Promise`<`Uint8Array`\>

Decrypt an ArrayBuffer

#### Parameters

| Name | Type |
| :------ | :------ |
| `cipherbuf` | `Uint8Array` |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[aes.ts:140](https://github.com/very-amused/cs-crypto/blob/a3e327c/src/aes.ts#L140)

___

### ABencrypt

▸ **ABencrypt**(`plainbuf`, `key`): `Promise`<`Uint8Array`\>

Encrypt an ArrayBuffer, used for encrypting non-text data such as images

#### Parameters

| Name | Type |
| :------ | :------ |
| `plainbuf` | `Uint8Array` \| `ArrayBuffer` |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[aes.ts:122](https://github.com/very-amused/cs-crypto/blob/a3e327c/src/aes.ts#L122)

___

### blobDecrypt

▸ **blobDecrypt**(`cipherbuf`, `key`, `encoding`): `Promise`<`Blob`\>

Decrypt an ArrayBuffer as a blob with a specified encoding

#### Parameters

| Name | Type |
| :------ | :------ |
| `cipherbuf` | `Uint8Array` |
| `key` | `CryptoKey` |
| `encoding` | `string` |

#### Returns

`Promise`<`Blob`\>

#### Defined in

[aes.ts:162](https://github.com/very-amused/cs-crypto/blob/a3e327c/src/aes.ts#L162)

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

[aes.ts:88](https://github.com/very-amused/cs-crypto/blob/a3e327c/src/aes.ts#L88)

___

### deepDecrypt

▸ **deepDecrypt**<`T`\>(`data`, `cryptoKey`): `Promise`<`T`\>

Recursively decrypt an object or array while preserving its original structure

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `cryptoKey` | `CryptoKey` |

#### Returns

`Promise`<`T`\>

#### Defined in

[aes.ts:204](https://github.com/very-amused/cs-crypto/blob/a3e327c/src/aes.ts#L204)

___

### deepEncrypt

▸ **deepEncrypt**<`T`\>(`data`, `cryptoKey`): `Promise`<`T`\>

Recursively encrypt an object or array while preserving its original structure

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `cryptoKey` | `CryptoKey` |

#### Returns

`Promise`<`T`\>

#### Defined in

[aes.ts:172](https://github.com/very-amused/cs-crypto/blob/a3e327c/src/aes.ts#L172)

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

[aes.ts:47](https://github.com/very-amused/cs-crypto/blob/a3e327c/src/aes.ts#L47)

___

### exportKey

▸ **exportKey**(`key`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`string`\>

#### Defined in

[aes.ts:232](https://github.com/very-amused/cs-crypto/blob/a3e327c/src/aes.ts#L232)

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

[aes.ts:28](https://github.com/very-amused/cs-crypto/blob/a3e327c/src/aes.ts#L28)

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

[aes.ts:15](https://github.com/very-amused/cs-crypto/blob/a3e327c/src/aes.ts#L15)
