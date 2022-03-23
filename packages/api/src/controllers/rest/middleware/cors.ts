import cors from 'cors'
import { logger } from '../../../connections/logger'
import { runtimeConfig } from '../../../runtime/config'
import { getInternalIP } from '../../../utils/localNetwork'

export const corsMiddleware = cors({
    origin: (origin, cb) => {
        const validOrigins = new Set([
            runtimeConfig.apiOrigin,
            runtimeConfig.webOrigin,
            'null',
        ])
        if (runtimeConfig.debug) {
            const ip = getInternalIP()
            if (ip) {
                validOrigins.add(`http://${ip}:3000`)
                validOrigins.add(`http://${ip}:3001`)
            }
        }
        const origins = Array.from(validOrigins)
        if (!origin || origins.indexOf(origin) !== -1) {
            cb(null, true)
        } else {
            logger.info(`CORS blocked origin '${origin}'`)
        }
    },
})
