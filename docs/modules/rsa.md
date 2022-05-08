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

[rsa.ts:84](https://github.com/very-amused/cs-crypto/blob/4e0103d/src/rsa.ts#L84)

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

[rsa.ts:9](https://github.com/very-amused/cs-crypto/blob/4e0103d/src/rsa.ts#L9)

___

### importPublicKey

▸ **importPublicKey**(`encoded`): `PromiseLike`<`CryptoKey`\>

Import an RSA public key from base64 encoded text

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoded` | `string` |

#### Returns

`PromiseLike`<`CryptoKey`\>

#### Defined in

[rsa.ts:95](https://github.com/very-amused/cs-crypto/blob/4e0103d/src/rsa.ts#L95)

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

[rsa.ts:130](https://github.com/very-amused/cs-crypto/blob/4e0103d/src/rsa.ts#L130)

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

[rsa.ts:52](https://github.com/very-amused/cs-crypto/blob/4e0103d/src/rsa.ts#L52)

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

[rsa.ts:111](https://github.com/very-amused/cs-crypto/blob/4e0103d/src/rsa.ts#L111)

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

#### Defined in

[rsa.ts:25](https://github.com/very-amused/cs-crypto/blob/4e0103d/src/rsa.ts#L25)
