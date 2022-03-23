import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'

@Controller('health')
export class HealthController {
    @Get()
    health(req: Request, res: Response) {
        res.send('ok')
    }
}
