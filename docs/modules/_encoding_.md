[cs-crypto](../README.md) › [Globals](../globals.md) › ["encoding"](_encoding_.md)

# Module: "encoding"

## Index

### Functions

* [ABconcat](_encoding_.md#abconcat)
* [ABdecode](_encoding_.md#abdecode)
* [ABencode](_encoding_.md#abencode)

## Functions

###  ABconcat

▸ **ABconcat**(`buf1`: Uint8Array | ArrayBuffer, `buf2`: Uint8Array | ArrayBuffer): *Uint8Array*

*Defined in [encoding.ts:32](https://github.com/very-amused/CS-crypto/blob/b15ee1f/src/encoding.ts#L32)*

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

*Defined in [encoding.ts:15](https://github.com/very-amused/CS-crypto/blob/b15ee1f/src/encoding.ts#L15)*

Decode valid base64 as a Uint8Array

**Parameters:**

Name | Type |
------ | ------ |
`encoded` | string |

**Returns:** *Uint8Array*

___

###  ABencode

▸ **ABencode**(`buf`: Uint8Array | ArrayBuffer): *string*

*Defined in [encoding.ts:6](https://github.com/very-amused/CS-crypto/blob/b15ee1f/src/encoding.ts#L6)*

Encode an ArrayBuffer or Uint8Array to base64

**Parameters:**

Name | Type |
------ | ------ |
`buf` | Uint8Array &#124; ArrayBuffer |

**Returns:** *string*
