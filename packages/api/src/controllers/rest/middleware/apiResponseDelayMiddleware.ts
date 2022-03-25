import { Middleware } from '@overnightjs/core/lib/decorators/types'

let apiDelay = 0

export const setAPIDelay = (delay: number) => {
    apiDelay = delay
}

export const getAPIDelay = () => apiDelay

export const apiResponseDelayMiddleware: Middleware = async (_, __, next) => {
    if (apiDelay === 0) {
        next()
    } else {
        setTimeout(next, apiDelay)
    }
}
