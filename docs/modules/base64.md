[cs-crypto](../README.md) / [Exports](../modules.md) / base64

# Namespace: base64

## Table of contents

### Functions

- [ABconcat](base64.md#abconcat)
- [decode](base64.md#decode)
- [encode](base64.md#encode)

## Functions

### ABconcat

▸ **ABconcat**(`buf1`, `buf2`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf1` | `Uint8Array` \| `ArrayBuffer` |
| `buf2` | `Uint8Array` \| `ArrayBuffer` |

#### Returns

`Uint8Array`

**`Deprecated`**

- Use binaryConcat instead
Concatenate two ArrayBuffers or Uint8Arrays

#### Defined in

[base64.ts:187](https://github.com/CSplan/CS-crypto/blob/097988c/src/base64.ts#L187)

___

### decode

▸ **decode**(`encoded`): `Uint8Array`

Decode standard encoded Base64 to a Uint8Array.

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoded` | `string` |

#### Returns

`Uint8Array`

#### Defined in

[base64.ts:140](https://github.com/CSplan/CS-crypto/blob/097988c/src/base64.ts#L140)

___

### encode

▸ **encode**(`data`): `string`

Encode a Uint8Array using Base64 standard encoding

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |

#### Returns

`string`

#### Defined in

[base64.ts:96](https://github.com/CSplan/CS-crypto/blob/097988c/src/base64.ts#L96)
