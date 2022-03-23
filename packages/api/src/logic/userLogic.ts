import { EntityManager } from '@mikro-orm/core'
import { UpdateUserProfileInput } from '../schemas/graphql/userObjects'
import { User } from '../schemas/models/user'
import { getUserBySlug } from './vehicleLogic'

export const updateUserProfile = async (
    em: EntityManager,
    user: User,
    payload: UpdateUserProfileInput,
) => {
    if (payload.uniqueSlug) {
        const existingSlugUser = await getUserBySlug(em, payload.uniqueSlug)
        if (existingSlugUser) {
            throw new Error('Unique slug already in use')
        }
        user.uniqueSlug = payload.uniqueSlug
    }
    await em.flush()
    return user
}
