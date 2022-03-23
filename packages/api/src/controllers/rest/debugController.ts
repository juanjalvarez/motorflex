import { Controller, Middleware, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import faker from '@faker-js/faker'
import { EntityManager } from '@mikro-orm/core'
import { createUserFromFirebaseRecord } from '../../logic/authLogic'
import { RuntimeContext } from '../../runtime/context'
import { getAuth } from 'firebase-admin/auth'
import { getUploadMiddleware } from './middleware/uploads'
import { logger } from '../../connections/logger'
import { uploadFileToS3 } from '../../logic/s3Logic'

const UNIVERSAL_USER_PASSWORD = '123$qweR'

const generateUser = async (
    context: RuntimeContext,
    em: EntityManager,
    emailNumber?: number,
) => {
    const displayName = `${faker.name.firstName()} ${faker.name.lastName()}`
    const phoneNumber = `+${faker.phone.phoneNumberFormat(2).replace('-', '')}`
    const email = `${displayName.toLowerCase().replace(' ', '')}${
        emailNumber ?? faker.random.alphaNumeric(5)
    }@motorflex.com`
    const firebaseAuth = getAuth(context.firebaseApp)
    const record = await firebaseAuth.createUser({
        email,
        password: UNIVERSAL_USER_PASSWORD,
    })
    const user = await createUserFromFirebaseRecord(em, record)
    user.displayName = displayName
    await em.persist(user)
    return user
}

@Controller('debug')
export class DebugController {
    @Post('sample_data')
    @Middleware(getUploadMiddleware(multer => multer.single('photo') as any))
    public async handleGenerateSampleData(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: 'Missing photo file.',
                })
            }
            const photo = await uploadFileToS3(
                req.context,
                req.file,
                req.appUser,
            )
            return res.json(photo)
        } catch (e) {
            logger.error(e)
            return res.status(500).json(e)
        }
    }
}
