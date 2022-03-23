import { S3 } from 'aws-sdk'
import { TIME_IN_MILLISECONDS } from '../constants/time'

import { SecretsObject } from '../runtime/secrets'

export const createS3Instance = async (secrets: SecretsObject) => {
    return new S3({
        endpoint: secrets.s3.endpoint,
        accessKeyId: secrets.s3.keyId,
        secretAccessKey: secrets.s3.secret,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
    })
}

export const getFileS3Path = (fileName: string) => {
    return `photos/${fileName}`
}

export const generateS3SignedURL = async (
    secrets: SecretsObject,
    s3: S3,
    path: string,
) => {
    return await s3.getSignedUrlPromise('getObject', {
        Bucket: secrets.s3.bucket,
        Key: path,
        Expires: 2 * TIME_IN_MILLISECONDS.DAY,
    })
}
