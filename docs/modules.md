[cs-crypto](README.md) / Exports

# cs-crypto

## Table of contents

### Namespaces

- [aes](modules/aes.md)
- [rsa](modules/rsa.md)

### Enumerations

- [Algorithms](enums/algorithms.md)

### Functions

- [ABconcat](modules.md#abconcat)
- [decode](modules.md#decode)
- [encode](modules.md#encode)
- [makeSalt](modules.md#makesalt)

## Functions

### ABconcat

▸ **ABconcat**(`buf1`: Uint8Array \| ArrayBuffer, `buf2`: Uint8Array \| ArrayBuffer): Uint8Array

Concatenate two ArrayBuffers or Uint8Arrays

#### Parameters:

Name | Type |
:------ | :------ |
`buf1` | Uint8Array \| ArrayBuffer |
`buf2` | Uint8Array \| ArrayBuffer |

**Returns:** Uint8Array

Defined in: [base64.ts:189](https://github.com/very-amused/CS-crypto/blob/5c5d341/src/base64.ts#L189)

___

### decode

▸ **decode**(`encoded`: *string*): Uint8Array

Decode standard encoded Base64 to a Uint8Array.

#### Parameters:

Name | Type |
:------ | :------ |
`encoded` | *string* |

**Returns:** Uint8Array

Defined in: [base64.ts:143](https://github.com/very-amused/CS-crypto/blob/5c5d341/src/base64.ts#L143)

___

### encode

▸ **encode**(`data`: Uint8Array): *string*

Encode a Uint8Array using Base64 standard encoding

#### Parameters:

Name | Type |
:------ | :------ |
`data` | Uint8Array |

**Returns:** *string*

Defined in: [base64.ts:99](https://github.com/very-amused/CS-crypto/blob/5c5d341/src/base64.ts#L99)

___

### makeSalt

▸ **makeSalt**(`byteLength`: *number*): Uint8Array

Make a salt of a specified byte length

#### Parameters:

Name | Type |
:------ | :------ |
`byteLength` | *number* |

**Returns:** Uint8Array

Defined in: [random.ts:6](https://github.com/very-amused/CS-crypto/blob/5c5d341/src/random.ts#L6)
