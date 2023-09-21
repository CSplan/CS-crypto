[cs-crypto](../README.md) / [Exports](../modules.md) / aes

# Namespace: aes

## Table of contents

### Type Aliases

- [ImportKeyMaterialOpts](aes.md#importkeymaterialopts)
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
- [unwrapKey](aes.md#unwrapkey)
- [wrapKey](aes.md#wrapkey)

## Type Aliases

### ImportKeyMaterialOpts

Ƭ **ImportKeyMaterialOpts**: `Object`

Advanced options for [importKeyMaterial](aes.md#importkeymaterial) and [unwrapKey](aes.md#unwrapkey)

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `extractable?` | `boolean` | Whether the key can be exported via [rsa.wrapKey](rsa.md#wrapkey) {@defaultValue false} |
| `keyUsages?` | `KeyUsage`[] | Supported key usages {@defaultValue ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']} |

#### Defined in

[aes.ts:17](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L17)

___

### StringLike

Ƭ **StringLike**: `Object`

Any data that is valid for encryption

#### Type declaration

| Name | Type |
| :------ | :------ |
| `toString` | () => `string` |

#### Defined in

[aes.ts:126](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L126)

## Functions

### ABdecrypt

▸ **ABdecrypt**(`cipherbuf`, `key`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cipherbuf` | `Uint8Array` |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`Uint8Array`\>

**`Deprecated`**

- Use binaryDecrypt
Decrypt an ArrayBuffer

#### Defined in

[aes.ts:178](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L178)

___

### ABencrypt

▸ **ABencrypt**(`plainbuf`, `key`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `plainbuf` | `Uint8Array` \| `ArrayBuffer` |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`Uint8Array`\>

**`Deprecated`**

- Use aes.binaryEncrypt
Encrypt an ArrayBuffer, used for encrypting non-text data such as images

#### Defined in

[aes.ts:170](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L170)

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

[aes.ts:150](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L150)

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

[aes.ts:133](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L133)

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

[aes.ts:186](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L186)

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

[aes.ts:99](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L99)

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

[aes.ts:227](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L227)

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

[aes.ts:196](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L196)

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

[aes.ts:59](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L59)

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

[aes.ts:257](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L257)

___

### generateKey

▸ **generateKey**(`type`): `Promise`<`CryptoKey`\>

Generate a new 256 bit AES-GCM or AES-CBC key

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"AES-GCM"`` \| ``"AES-CBC"`` |

#### Returns

`Promise`<`CryptoKey`\>

#### Defined in

[aes.ts:40](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L40)

___

### importKeyMaterial

▸ **importKeyMaterial**(`keyMaterial`, `type`, `opts?`): `PromiseLike`<`CryptoKey`\>

Import an AES key from raw key material

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyMaterial` | `Uint8Array` |
| `type` | [`AES_GCM`](../enums/Algorithms.md#aes_gcm) \| [`AES_CBC`](../enums/Algorithms.md#aes_cbc) |
| `opts?` | [`ImportKeyMaterialOpts`](aes.md#importkeymaterialopts) |

#### Returns

`PromiseLike`<`CryptoKey`\>

#### Defined in

[aes.ts:27](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L27)

___

### unwrapKey

▸ **unwrapKey**(`keyCiphertext`, `unwrappingKey`, `opts?`): `Promise`<`CryptoKey`\>

Unwrap (decrypt) an asymmetric key using an AES key. Currently only RSA private keys are supposed to be unwrapped.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyCiphertext` | `string` | Ciphertext of key to be decrypted |
| `unwrappingKey` | `CryptoKey` | AES key used to unwrap keyCiphertext |
| `opts?` | [`ImportKeyMaterialOpts`](aes.md#importkeymaterialopts) | Optional key import options (note for transitioning from the deprecated `rsa.unwrapPrivateKey`: the `exportable` arg is superseded by `opts.extractable`) |

#### Returns

`Promise`<`CryptoKey`\>

#### Defined in

[aes.ts:303](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L303)

___

### wrapKey

▸ **wrapKey**(`key`, `wrappingKey`): `Promise`<`string`\>

Wrap (encrypt) an asymmetric key using an AES key. Currently only RSA private keys are supported to be wrapped.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `CryptoKey` | Key to be encrypted |
| `wrappingKey` | `CryptoKey` | AES key used to wrap key |

#### Returns

`Promise`<`string`\>

#### Defined in

[aes.ts:273](https://github.com/CSplan/CS-crypto/blob/87cde4c/src/aes.ts#L273)
