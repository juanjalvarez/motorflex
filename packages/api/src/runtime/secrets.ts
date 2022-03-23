import { Awaited } from '../types/helpers'
import fs from 'fs'

const parseDecInt = (str: string) => {
    const num = parseInt(str, 10)
    if (isNaN(num)) {
        throw new Error(`The string '${str}' is not a valid integer`)
    }
    return num
}

const noConvert = (str: any) => str

export const parseBool = (str: string) => {
    if (str === 'true') {
        return true
    }
    if (str === 'false') {
        return false
    }
    throw new Error(`Invalid boolean value '${str}'`)
}

export const loadNullableEnvVariable = <E = string>(
    key: string,
    convert: (val: string) => E = noConvert,
) => {
    const val = process.env[key]
    return val ? convert(val) : undefined
}

export const loadEnvVariable = <E = string>(
    key: string,
    convert: (val: string) => E = noConvert,
) => {
    const val = process.env[key]
    if (!val || !Object.keys(process.env).includes(key)) {
        throw new Error(`Secret '${key}' not found`)
    }
    return convert(val)
}

export const loadSecrets = async () => {
    const serviceAccountJsonPath = loadEnvVariable(
        'FIREBASE__SERVICE_ACCOUNT_JSON_PATH',
    )
    const serviceAccountJson = await fs.promises.readFile(
        serviceAccountJsonPath,
    )
    return {
        app: {
            adminSecret: loadEnvVariable('APP__ADMIN_SECRET'),
        },
        redis: {
            host: loadNullableEnvVariable('REDIS__HOST'),
            db: loadNullableEnvVariable('REDIS__DB', parseDecInt),
            port: loadNullableEnvVariable('REDIS__PORT', parseDecInt),
            password: loadNullableEnvVariable('REDIS__PASSWORD'),
            connectTimeout: loadNullableEnvVariable(
                'REDIS__CONNECT_TIMEOUT',
                parseDecInt,
            ),
            tls: loadNullableEnvVariable('REDIS__SSL', parseBool)
                ? {}
                : undefined,
        },
        s3: {
            endpoint: loadEnvVariable('S3__ENDPOINT'),
            keyId: loadEnvVariable('S3__KEY_ID'),
            secret: loadEnvVariable('S3__SECRET'),
            bucket: loadEnvVariable('S3__BUCKET'),
        },
        firebase: {
            serviceAccountJsonPath,
            serviceAccountJson: JSON.parse(serviceAccountJson.toString()),
            projectId: loadEnvVariable('FIREBASE__PROJECT_ID'),
        },
        postgres: {
            host: loadEnvVariable('POSTGRES_HOST'),
            port: loadEnvVariable('POSTGRES_PORT', parseInt),
            database: loadEnvVariable('POSTGRES_DATABASE'),
            username: loadEnvVariable('POSTGRES_USERNAME'),
            password: loadEnvVariable('POSTGRES_PASSWORD'),
        },
    }
}

export type SecretsObject = Awaited<ReturnType<typeof loadSecrets>>
