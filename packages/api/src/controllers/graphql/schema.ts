import { makeExecutableSchema } from '@graphql-tools/schema'
import { buildTypeDefsAndResolvers } from 'type-graphql'
import { HealthResolver } from './resolvers/healthResolver'
import { PhotoResolver } from './resolvers/photoResolver'
import { UserResolver } from './resolvers/userResolver'
import { VehicleResolver } from './resolvers/vehicleResolver'

export const buildGraphQLSchema = async () => {
    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
        resolvers: [
            HealthResolver,
            PhotoResolver,
            UserResolver,
            VehicleResolver,
        ],
        authChecker: gql => {
            const req = gql.context as Express.Request
            return Boolean(req.appUser)
        },
    })
    return makeExecutableSchema({ typeDefs, resolvers })
}
