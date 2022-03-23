import type { UserRecord } from 'firebase-admin/auth'
import type { RuntimeContext } from '../runtime/context'
import type { User } from '../schemas/models/user'

declare global {
    namespace Express {
        interface Request {
            context: RuntimeContext
            firebaseRecord?: UserRecord
            appUser?: User
            startTimestamp: Date
        }
    }
}
