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

*Defined in [base64.ts:182](https://github.com/very-amused/CS-crypto/blob/abdac76/src/base64.ts#L182)*

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

*Defined in [base64.ts:138](https://github.com/very-amused/CS-crypto/blob/abdac76/src/base64.ts#L138)*

Decode standard encoded Base64 to a Uint8Array.

**Parameters:**

Name | Type |
------ | ------ |
`encoded` | string |

**Returns:** *Uint8Array*

___

###  encode

▸ **encode**(`data`: Uint8Array): *string*

*Defined in [base64.ts:94](https://github.com/very-amused/CS-crypto/blob/abdac76/src/base64.ts#L94)*

Encode a Uint8Array using Base64 standard encoding

**Parameters:**

Name | Type |
------ | ------ |
`data` | Uint8Array |

**Returns:** *string*
