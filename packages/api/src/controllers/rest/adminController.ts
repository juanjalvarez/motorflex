import { Controller, ClassMiddleware, Post, Get } from '@overnightjs/core'
import { Request, Response } from 'express'
import { adminSecretRequiredMiddleware } from './middleware/adminSecretRequiredMiddleware'
import {
    getAPIDelay,
    setAPIDelay,
} from './middleware/apiResponseDelayMiddleware'

@Controller('admin')
@ClassMiddleware(adminSecretRequiredMiddleware)
export class AdminController {
    @Get('api_delay')
    handleGetAPIDelay(_: Request, res: Response) {
        return res.json({
            apiDelay: getAPIDelay(),
        })
    }
    @Post('api_delay')
    handleSetAPIDelay(req: Request, res: Response) {
        let newDelay = req.body.delay
        if (typeof newDelay === 'string') {
            newDelay = parseInt(newDelay, 10)
        }
        setAPIDelay(newDelay)
        res.json({
            apiDelay: newDelay,
        })
    }
}
