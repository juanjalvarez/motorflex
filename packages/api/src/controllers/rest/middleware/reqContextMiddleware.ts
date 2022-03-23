import { Middleware } from '@overnightjs/core/lib/decorators/types'
import { RuntimeContext } from '../../../runtime/context'

/**
 *
 * MAKE SURE THIS IS THE FIRST MIDDLEWARE LOADED
 */
export const getRequestContextMiddleware =
    (runtimeContext: RuntimeContext): Middleware =>
    (req, _, next) => {
        req.context = runtimeContext
        next()
    }
