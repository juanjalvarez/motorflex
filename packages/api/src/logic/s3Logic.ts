import { User } from '../schemas/models/user'
import { RuntimeContext } from '../runtime/context'
import { v4 as uuid } from 'uuid'
import { Photo } from '../schemas/models/photo'
import fs from 'fs'

export const uploadFileToS3 = async (
    ctx: RuntimeContext,
    file: Express.Multer.File,
    uploader?: User,
) => {
    const s3 = ctx.s3
    const s3Filename = `${uuid()}-${file.originalname}`
    const s3Path = `/photos/${s3Filename}`
    const stream = fs.createReadStream(file.path)
    await s3
        .upload({
            Bucket: ctx.secrets.s3.bucket,
            Key: s3Path,
            Body: stream,
            ContentType: file.mimetype,
            ACL: 'public-read',
        })
        .promise()
    const em = ctx.db.em.fork()
    const photo = new Photo()
    photo.originalFileName = file.originalname
    photo.s3Path = s3Path
    photo.mimeType = file.mimetype
    photo.size = file.size
    photo.uploadUser = uploader
    await em.persistAndFlush(photo)
    return photo
}
