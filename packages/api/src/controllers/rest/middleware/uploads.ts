import multer from 'multer'
import { Middleware } from '@overnightjs/core/lib/decorators/types'
import { RequestHandler } from 'express'
import { DATA_SIZE_IN_BYTES } from '../../../constants/dataSize'
import path from 'path'
import { tmpDir } from '../../../connections/fs'

const createMulter = async () => {
    const tmpPath = await tmpDir
    return multer({
        dest: path.join(tmpPath.path, 'photos'),
        limits: {
            fileSize: 10 * DATA_SIZE_IN_BYTES.MB,
        },
    })
}

type MulterManipulatorFunction = (m: multer.Multer) => RequestHandler

export const getUploadMiddleware =
    (func: MulterManipulatorFunction): Middleware =>
    async (req, res, next) => {
        const multerGenerator = await createMulter()
        const middleware = func(multerGenerator)
        middleware(req, res, next)
    }
