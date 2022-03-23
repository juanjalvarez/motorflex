import { Ctx, Float, Query, Resolver } from 'type-graphql'

@Resolver()
export class HealthResolver {
    @Query(() => Float)
    async health(@Ctx() ctx: Express.Request) {
        const now = new Date()
        const diff = now.getTime() - ctx.startTimestamp.getTime()
        return diff
    }
}
