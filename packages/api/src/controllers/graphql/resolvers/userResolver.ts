import { Request } from 'express'
import {
    Authorized,
    Ctx,
    FieldResolver,
    Query,
    Resolver,
    Root,
} from 'type-graphql'
import { getVehiclesOwnedByUser } from '../../../logic/vehicleLogic'
import { User } from '../../../schemas/models/user'
import { Vehicle } from '../../../schemas/models/vehicle'

@Resolver(() => User)
export class UserResolver {
    @Query(() => User)
    @Authorized()
    async whoAmI(@Ctx() ctx: Request) {
        return ctx.appUser
    }

    @FieldResolver(() => [Vehicle])
    async ownedVehicles(@Ctx() ctx: Express.Request, @Root() root: User) {
        const em = ctx.context.db.em.fork()
        return await getVehiclesOwnedByUser(em, root)
    }
}
