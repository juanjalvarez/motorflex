import { getAuth } from 'firebase-admin/auth'
import { Middleware } from '@overnightjs/core/lib/decorators/types'
import { getOrCreateUserFromFirebaseRecord } from '../../../logic/authLogic'

export const authMiddleware: Middleware = async (req, _, next) => {
    const token = req.headers['authorization']
    if (token && !Array.isArray(token)) {
        const auth = getAuth(req.context.firebaseApp)
        const decoded = await auth.verifyIdToken(token, true)
        const record = await auth.getUser(decoded.uid)
        req.firebaseRecord = record
        const user = await getOrCreateUserFromFirebaseRecord(
            req.context.db.em.fork(),
            record,
        )
        req.appUser = user
    }
    next()
}
