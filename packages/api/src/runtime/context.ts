import { createS3Instance } from '../connections/s3'
import { createRedisInstance } from '../connections/redis'
import { Awaited } from '../types/helpers'
import { loadSecrets } from './secrets'
import { createFirebaseApp } from '../connections/firebase'
import { createDb } from '../connections/db'

let globalRuntimeContext: RuntimeContext | null = null

export const createRuntimeContext = async () => {
    const secrets = await loadSecrets()
    const context = {
        secrets,
        firebaseApp: await createFirebaseApp(secrets),
        redis: await createRedisInstance(secrets),
        s3: await createS3Instance(secrets),
        db: await createDb(secrets),
    }
    globalRuntimeContext = context
    return context
}

export const getGlobalRuntimeContext = () => {
    if (!globalRuntimeContext) {
        throw new Error('Global runtime context has not been loaded yet')
    }
    return globalRuntimeContext
}

export type RuntimeContext = Awaited<ReturnType<typeof createRuntimeContext>>
