[cs-crypto](../README.md) / [Exports](../modules.md) / rsa

# Namespace: rsa

## Table of contents

### Functions

- [exportPublicKey](rsa.md#exportpublickey)
- [generateKeypair](rsa.md#generatekeypair)
- [importPublicKey](rsa.md#importpublickey)
- [unwrapKey](rsa.md#unwrapkey)
- [wrapKey](rsa.md#wrapkey)

## Functions

### exportPublicKey

▸ **exportPublicKey**(`publicKey`): `Promise`<`string`\>

Export an RSA public key as base64 encoded text

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `CryptoKey` |

#### Returns

`Promise`<`string`\>

#### Defined in

[rsa.ts:24](https://github.com/very-amused/cs-crypto/blob/3fa857f/src/rsa.ts#L24)

___

### generateKeypair

▸ **generateKeypair**(`keySize`): `Promise`<`Required`<`CryptoKeyPair`\>\>

Generate an RSA keypair of a specified keysize

#### Parameters

| Name | Type |
| :------ | :------ |
| `keySize` | `number` |

#### Returns

`Promise`<`Required`<`CryptoKeyPair`\>\>

#### Defined in

[rsa.ts:8](https://github.com/very-amused/cs-crypto/blob/3fa857f/src/rsa.ts#L8)

___

### importPublicKey

▸ **importPublicKey**(`encoded`): `Promise`<`CryptoKey`\>

Import an RSA public key from base64 encoded text

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoded` | `string` |

#### Returns

`Promise`<`CryptoKey`\>

#### Defined in

[rsa.ts:35](https://github.com/very-amused/cs-crypto/blob/3fa857f/src/rsa.ts#L35)

___

### unwrapKey

▸ **unwrapKey**(`encodedKey`, `unwrappingKey`, `algorithm?`): `PromiseLike`<`CryptoKey`\>

Unwrap (decrypt) a CryptoKey using an RSA private key

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `encodedKey` | `string` | `undefined` |
| `unwrappingKey` | `CryptoKey` | `undefined` |
| `algorithm` | ``"AES-GCM"`` \| ``"AEC-CBC"`` | `'AES-GCM'` |

#### Returns

`PromiseLike`<`CryptoKey`\>

#### Defined in

[rsa.ts:70](https://github.com/very-amused/cs-crypto/blob/3fa857f/src/rsa.ts#L70)

___

### wrapKey

▸ **wrapKey**(`key`, `wrappingKey`): `Promise`<`string`\>

Wrap (encrypt) a CryptoKey using an RSA public key

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `CryptoKey` |
| `wrappingKey` | `CryptoKey` |

#### Returns

`Promise`<`string`\>

#### Defined in

[rsa.ts:51](https://github.com/very-amused/cs-crypto/blob/3fa857f/src/rsa.ts#L51)
