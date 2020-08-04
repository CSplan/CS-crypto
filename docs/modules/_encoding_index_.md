[cs-crypto](../README.md) › [Globals](../globals.md) › ["encoding/index"](_encoding_index_.md)

# Module: "encoding/index"

## Index

### Functions

* [ABconcat](_encoding_index_.md#abconcat)
* [ABdecode](_encoding_index_.md#abdecode)
* [ABencode](_encoding_index_.md#abencode)

## Functions

###  ABconcat

▸ **ABconcat**(`buf1`: Uint8Array | ArrayBuffer, `buf2`: Uint8Array | ArrayBuffer): *Uint8Array*

Defined in encoding/index.ts:32

Concatenate two ArrayBuffers or Uint8Arrays

**Parameters:**

Name | Type |
------ | ------ |
`buf1` | Uint8Array &#124; ArrayBuffer |
`buf2` | Uint8Array &#124; ArrayBuffer |

**Returns:** *Uint8Array*

___

###  ABdecode

▸ **ABdecode**(`encoded`: string): *Uint8Array*

Defined in encoding/index.ts:15

Decode valid base64 as a Uint8Array

**Parameters:**

Name | Type |
------ | ------ |
`encoded` | string |

**Returns:** *Uint8Array*

___

###  ABencode

▸ **ABencode**(`buf`: Uint8Array | ArrayBuffer): *string*

Defined in encoding/index.ts:6

Encode an ArrayBuffer or Uint8Array to base64

**Parameters:**

Name | Type |
------ | ------ |
`buf` | Uint8Array &#124; ArrayBuffer |

**Returns:** *string*
