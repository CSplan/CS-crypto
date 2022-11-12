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

[rsa.ts:83](https://github.com/very-amused/cs-crypto/blob/995e074/src/rsa.ts#L83)

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

[rsa.ts:10](https://github.com/very-amused/cs-crypto/blob/995e074/src/rsa.ts#L10)

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

[rsa.ts:94](https://github.com/very-amused/cs-crypto/blob/995e074/src/rsa.ts#L94)

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

[rsa.ts:129](https://github.com/very-amused/cs-crypto/blob/995e074/src/rsa.ts#L129)

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

[rsa.ts:51](https://github.com/very-amused/cs-crypto/blob/995e074/src/rsa.ts#L51)

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

[rsa.ts:110](https://github.com/very-amused/cs-crypto/blob/995e074/src/rsa.ts#L110)

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

[rsa.ts:26](https://github.com/very-amused/cs-crypto/blob/995e074/src/rsa.ts#L26)
