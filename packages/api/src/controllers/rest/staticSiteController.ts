import { runtimeConfig } from '../../runtime/config'
import { Controller, Get } from '@overnightjs/core'
import fs from 'fs'
import path from 'path'
import { Request, Response } from 'express'

@Controller('*')
export class StaticSiteController {
    @Get('*')
    public async handleGetSite(_: Request, res: Response) {
        try {
            const html = await new Promise((resolve, reject) => {
                fs.readFile(
                    path.join(runtimeConfig.staticSitePath, 'index.html'),
                    (err, data) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(data.toString())
                        }
                    },
                )
            })
            return res.send(html)
        } catch (e) {
            return res.json(e)
        }
    }
}
