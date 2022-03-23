import { Request } from 'express'
import {
    Arg,
    Authorized,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql'
import { updateUserProfile } from '../../../logic/userLogic'
import { getVehiclesOwnedByUser } from '../../../logic/vehicleLogic'
import { UpdateUserProfileInput } from '../../../schemas/graphql/userObjects'
import { User } from '../../../schemas/models/user'
import { Vehicle } from '../../../schemas/models/vehicle'

@Resolver(() => User)
export class UserResolver {
    @Query(() => User)
    @Authorized()
    async whoAmI(@Ctx() ctx: Request) {
        return ctx.appUser!
    }

    @FieldResolver(() => [Vehicle])
    async ownedVehicles(@Ctx() ctx: Express.Request, @Root() root: User) {
        const em = ctx.context.db.em.fork()
        return await getVehiclesOwnedByUser(em, root)
    }

    @Mutation(() => User)
    @Authorized()
    async updateProfile(
        @Ctx() ctx: Request,
        @Arg('input') input: UpdateUserProfileInput,
    ) {
        const user = ctx.appUser!
        const em = await ctx.context.db.em.fork()
        return await updateUserProfile(em, user, input)
    }
}
