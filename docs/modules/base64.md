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

**`deprecated`** - Use binaryConcat instead
Concatenate two ArrayBuffers or Uint8Arrays

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf1` | `Uint8Array` \| `ArrayBuffer` |
| `buf2` | `Uint8Array` \| `ArrayBuffer` |

#### Returns

`Uint8Array`

#### Defined in

[base64.ts:192](https://github.com/very-amused/cs-crypto/blob/b2c9997/src/base64.ts#L192)

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

[base64.ts:145](https://github.com/very-amused/cs-crypto/blob/b2c9997/src/base64.ts#L145)

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

[base64.ts:101](https://github.com/very-amused/cs-crypto/blob/b2c9997/src/base64.ts#L101)