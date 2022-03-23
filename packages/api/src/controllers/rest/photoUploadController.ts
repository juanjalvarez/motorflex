import { Controller, Post, Middleware } from '@overnightjs/core'
import { Request, Response } from 'express'
import { getUploadMiddleware } from './middleware/uploads'
import { uploadFileToS3 } from '../../logic/s3Logic'

@Controller('photos')
export class PhotoUploadController {
    @Post()
    @Middleware(getUploadMiddleware(multer => multer.single('photo') as any))
    public async handleGenerateSampleData(req: Request, res: Response) {
        if (!req.file) {
            return res.status(400).json({
                message: 'Missing photo file.',
            })
        }
        const photo = await uploadFileToS3(req.context, req.file, req.appUser)
        res.status(200).json(photo)
    }
}
