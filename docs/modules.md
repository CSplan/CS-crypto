[cs-crypto](README.md) / Exports

# cs-crypto

## Table of contents

### Namespaces

- [aes](modules/aes.md)
- [base64](modules/base64.md)
- [rsa](modules/rsa.md)

### Enumerations

- [Algorithms](enums/Algorithms.md)

### Functions

- [binaryConcat](modules.md#binaryconcat)
- [makeSalt](modules.md#makesalt)

## Functions

### binaryConcat

▸ **binaryConcat**(`...data`): `Uint8Array`

Concatenate multiple Uint8Arrays into a result buffer

#### Parameters

| Name | Type |
| :------ | :------ |
| `...data` | `Uint8Array`[] |

#### Returns

`Uint8Array`

#### Defined in

[binary.ts:2](https://github.com/very-amused/cs-crypto/blob/3fa857f/src/binary.ts#L2)

___

### makeSalt

▸ **makeSalt**(`byteLength`): `Uint8Array`

Make a salt of a specified byte length

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteLength` | `number` |

#### Returns

`Uint8Array`

#### Defined in

[random.ts:6](https://github.com/very-amused/cs-crypto/blob/3fa857f/src/random.ts#L6)
