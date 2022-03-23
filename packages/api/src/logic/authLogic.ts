import { User } from '../schemas/models/user'
import { UserRecord } from 'firebase-admin/auth'
import { RuntimeContext } from '../runtime/context'
import { auth } from 'firebase-admin'
import { EntityManager } from '@mikro-orm/core'

export const getFirebaseRecordFromUid = async (
    context: RuntimeContext,
    uid: string,
) => {
    return await auth(context.firebaseApp).getUser(uid)
}

export const getUserFromFirebaseUid = async (
    em: EntityManager,
    uid: string,
) => {
    return await em.findOne(User, {
        firebaseUid: uid,
    })
}

export const getUserFromFirebaseRecord = async (
    em: EntityManager,
    record: UserRecord,
) => {
    return await getUserFromFirebaseUid(em, record.uid)
}

export const createUserFromFirebaseRecord = async (
    em: EntityManager,
    record: UserRecord,
) => {
    const user = new User()
    user.firebaseUid = record.uid
    user.displayName = record.displayName ?? record.email ?? 'New User'
    if (record.email) {
        user.email = record.email
    }
    user.uniqueSlug = record.uid
    await em.persistAndFlush(user)
    user.uniqueSlug = user.id.toString()
    await em.flush()
    return user
}

export const getOrCreateUserFromFirebaseRecord = async (
    em: EntityManager,
    record: UserRecord,
) => {
    const existingUser = await getUserFromFirebaseRecord(em, record)
    if (existingUser) {
        return existingUser
    }
    return await createUserFromFirebaseRecord(em, record)
}
