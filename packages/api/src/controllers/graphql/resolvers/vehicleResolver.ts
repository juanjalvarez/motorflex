import { Request } from 'express'
import {
    Arg,
    Authorized,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql'
import {
    createVehicle,
    getOwnerOfVehicle,
    getVehicleByID,
    updateVehicle,
} from '../../../logic/vehicleLogic'
import {
    CreateVehicleInput,
    UpdateVehicleInput,
} from '../../../schemas/graphql/vehicleObjects'
import { User } from '../../../schemas/models/user'
import { Vehicle } from '../../../schemas/models/vehicle'

@Resolver(() => Vehicle)
export class VehicleResolver {
    @Query(() => User)
    @Authorized()
    async whoAmI(@Ctx() ctx: Request) {
        return ctx.appUser
    }

    @FieldResolver(() => User)
    async ownerUser(@Ctx() ctx: Express.Request, @Root() root: Vehicle) {
        const em = ctx.context.db.em.fork()
        return await getOwnerOfVehicle(em, root)
    }

    @Mutation(() => Vehicle)
    @Authorized()
    async createVehicle(
        @Ctx() ctx: Express.Request,
        @Arg('input') input: CreateVehicleInput,
    ) {
        const em = ctx.context.db.em.fork()
        return await createVehicle(em, ctx.appUser!, input)
    }

    @Mutation(() => Vehicle)
    @Authorized()
    async updateVehicle(
        @Ctx() ctx: Express.Request,
        @Arg('id', () => Int) id: number,
        @Arg('input') input: UpdateVehicleInput,
    ) {
        const em = ctx.context.db.em.fork()
        const vehicle = await getVehicleByID(em, id)
        if (!vehicle) {
            throw new Error(`Vehicle with ID (${id}) does not exist.`)
        }
        return await updateVehicle(em, vehicle, input)
    }
}
