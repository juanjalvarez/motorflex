import Redis from 'ioredis'

import { SecretsObject } from '../runtime/secrets'
import { logger } from './logger'

export const createRedisInstance = async (secrets: SecretsObject) => {
    const redis = new Redis(secrets.redis)
    redis.on('connect', () => {
        logger.info('Connected to Redis')
    })
    redis.on('error', err => {
        logger.error(`Redis error: ${JSON.stringify(err)}`)
    })
    return redis
}
