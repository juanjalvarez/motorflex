import { Middleware } from '@overnightjs/core/lib/decorators/types'

export const adminSecretRequiredMiddleware: Middleware = async (
    req,
    res,
    next,
) => {
    const token = req.headers['admin_secret']
    if (token && token === req.context.secrets.app.adminSecret) {
        return next()
    }
    return res.status(401).send()
}
