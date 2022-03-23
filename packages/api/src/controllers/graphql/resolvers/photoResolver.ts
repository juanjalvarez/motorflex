import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql'
import { Photo } from '../../../schemas/models/photo'
import { User } from '../../../schemas/models/user'

@Resolver(() => Photo)
export class PhotoResolver {
    @FieldResolver(() => User, {
        nullable: true,
    })
    async uploadUser(@Ctx() ctx: Express.Request, @Root() photo: Photo) {
        const em = ctx.context.db.em.fork()
        return await em.findOne(User, {
            id: photo.uploadUser?.id,
        })
    }
}
