[cs-crypto](../README.md) › [Globals](../globals.md) › ["base64"](_base64_.md)

# Module: "base64"

## Index

### Functions

* [ABconcat](_base64_.md#abconcat)
* [decode](_base64_.md#decode)
* [encode](_base64_.md#encode)

## Functions

###  ABconcat

▸ **ABconcat**(`buf1`: Uint8Array | ArrayBuffer, `buf2`: Uint8Array | ArrayBuffer): *Uint8Array*

*Defined in [base64.ts:170](https://github.com/very-amused/CS-crypto/blob/f347297/src/base64.ts#L170)*

Concatenate two ArrayBuffers or Uint8Arrays

**Parameters:**

Name | Type |
------ | ------ |
`buf1` | Uint8Array &#124; ArrayBuffer |
`buf2` | Uint8Array &#124; ArrayBuffer |

**Returns:** *Uint8Array*

___

###  decode

▸ **decode**(`encoded`: string): *Uint8Array*

*Defined in [base64.ts:126](https://github.com/very-amused/CS-crypto/blob/f347297/src/base64.ts#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`encoded` | string |

**Returns:** *Uint8Array*

___

###  encode

▸ **encode**(`data`: Uint8Array): *string*

*Defined in [base64.ts:85](https://github.com/very-amused/CS-crypto/blob/f347297/src/base64.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Uint8Array |

**Returns:** *string*
