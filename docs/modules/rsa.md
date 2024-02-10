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

[rsa.ts:91](https://github.com/CSplan/CS-crypto/blob/07a90ef/src/rsa.ts#L91)

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

[rsa.ts:12](https://github.com/CSplan/CS-crypto/blob/07a90ef/src/rsa.ts#L12)

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

[rsa.ts:102](https://github.com/CSplan/CS-crypto/blob/07a90ef/src/rsa.ts#L102)

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

[rsa.ts:137](https://github.com/CSplan/CS-crypto/blob/07a90ef/src/rsa.ts#L137)

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

**`Deprecated`**

This function is being moved to the `aes` module for more consistent organization.
Use [aes.unwrapKey](aes.md#unwrapkey) instead.

#### Defined in

[rsa.ts:59](https://github.com/CSplan/CS-crypto/blob/07a90ef/src/rsa.ts#L59)

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

[rsa.ts:118](https://github.com/CSplan/CS-crypto/blob/07a90ef/src/rsa.ts#L118)

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

[rsa.ts:31](https://github.com/CSplan/CS-crypto/blob/07a90ef/src/rsa.ts#L31)
