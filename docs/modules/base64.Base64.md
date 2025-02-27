[cs-crypto](../README.md) / [Exports](../modules.md) / [base64](base64.md) / Base64

# Namespace: Base64

[base64](base64.md).Base64

## Table of contents

### Functions

- [decode](base64.Base64.md#decode)
- [encode](base64.Base64.md#encode)

## Functions

### decode

▸ **decode**(`encoded`): `Uint8Array`

Decode Base64 to a Uint8Array.

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoded` | `string` |

#### Returns

`Uint8Array`

#### Defined in

[base64.ts:148](https://github.com/very-amused/cs-crypto/blob/3fa857f/src/base64.ts#L148)

___

### encode

▸ **encode**(`data`, `padding?`): `string`

Encode a Uint8Array using Base64.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | `undefined` |
| `padding` | `boolean` | `true` |

#### Returns

`string`

#### Defined in

[base64.ts:103](https://github.com/very-amused/cs-crypto/blob/3fa857f/src/base64.ts#L103)
