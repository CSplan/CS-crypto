[cs-crypto](../README.md) / [Exports](../modules.md) / rsa

# Namespace: rsa

## Table of contents

### Functions

- [exportPublicKey](rsa.md#exportpublickey)
- [generateKeypair](rsa.md#generatekeypair)
- [importPublicKey](rsa.md#importpublickey)
- [unwrapKey](rsa.md#unwrapkey)
- [unwrapPrivateKey](rsa.md#unwrapprivatekey)
- [wrapKey](rsa.md#wrapkey)
- [wrapPrivateKey](rsa.md#wrapprivatekey)

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

[rsa.ts:88](https://github.com/CSplan/CS-crypto/blob/2d4ed3a/src/rsa.ts#L88)

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

[rsa.ts:12](https://github.com/CSplan/CS-crypto/blob/2d4ed3a/src/rsa.ts#L12)

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

[rsa.ts:99](https://github.com/CSplan/CS-crypto/blob/2d4ed3a/src/rsa.ts#L99)

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

[rsa.ts:134](https://github.com/CSplan/CS-crypto/blob/2d4ed3a/src/rsa.ts#L134)

___

### unwrapPrivateKey

▸ **unwrapPrivateKey**(`encodedPrivateKey`, `unwrappingKey`, `exportable?`): `Promise`<`CryptoKey`\>

Decrypt an RSA key using unwrappingKey (AES-GCM)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `encodedPrivateKey` | `string` | `undefined` |
| `unwrappingKey` | `CryptoKey` | `undefined` |
| `exportable` | `boolean` | `false` |

#### Returns

`Promise`<`CryptoKey`\>

#### Defined in

[rsa.ts:56](https://github.com/CSplan/CS-crypto/blob/2d4ed3a/src/rsa.ts#L56)

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

[rsa.ts:115](https://github.com/CSplan/CS-crypto/blob/2d4ed3a/src/rsa.ts#L115)

___

### wrapPrivateKey

▸ **wrapPrivateKey**(`privateKey`, `wrappingKey`): `Promise`<`string`\>

Encrypt an RSA private key using an AES private key generated using a passphrase and salt

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `CryptoKey` |
| `wrappingKey` | `CryptoKey` |

#### Returns

`Promise`<`string`\>

**`Deprecated`**

This function is being moved to the `aes` module for more consistent organization.
Use [aes.wrapKey](aes.md#wrapkey) instead.

#### Defined in

[rsa.ts:31](https://github.com/CSplan/CS-crypto/blob/2d4ed3a/src/rsa.ts#L31)
