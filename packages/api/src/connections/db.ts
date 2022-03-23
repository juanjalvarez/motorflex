import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { AnyEntity, EntityClass, MikroORM, Options } from '@mikro-orm/core'
import { SecretsObject } from '../runtime/secrets'
import { logger } from './logger'
import { User } from '../schemas/models/user'
import { Photo } from '../schemas/models/photo'
import { Vehicle } from '../schemas/models/vehicle'

export const entities: EntityClass<AnyEntity>[] = [User, Photo, Vehicle]

export const createDbOptions = async (
    secrets: SecretsObject,
): Promise<Options> => {
    return {
        metadataProvider: TsMorphMetadataProvider,
        type: 'postgresql',
        entities,
        host: secrets.postgres.host,
        port: secrets.postgres.port,
        dbName: secrets.postgres.database,
        user: secrets.postgres.username,
        password: secrets.postgres.password,
        baseDir: process.cwd(),
        migrations: {
            path: './src/migrations',
        },
        debug: true,
    }
}

export const createDb = async (secrets: SecretsObject) => {
    const dbOptions = await createDbOptions(secrets)
    const orm = await MikroORM.init(dbOptions)
    logger.info('Connected to PostgreSQL')
    return orm
}
