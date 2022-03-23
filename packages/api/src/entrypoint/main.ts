import 'reflect-metadata'
import { logger } from '../connections/logger'
import { createRuntimeContext } from '../runtime/context'

import APIServer from '../runtime/server'

const main = async () => {
    const runtimeContext = await createRuntimeContext()
    const server = new APIServer(runtimeContext)
    await server.start(3001)
}

main()

process.on('SIGINT', () => {
    logger.info('Shutdown requested')
    process.exit(0)
})
