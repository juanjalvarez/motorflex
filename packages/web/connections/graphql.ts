import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { appConfig } from '../config'
import { setContext } from '@apollo/client/link/context'
import { firebaseAuth } from './firebase'

export const apolloCache = new InMemoryCache()

const authLink = setContext(async (_, context) => {
    let jwt = ''
    const user = firebaseAuth.currentUser
    if (user) {
        jwt = await user.getIdToken()
    }
    return {
        headers: {
            ...context.headers,
            authorization: jwt ?? '',
        },
    }
})

export const apollo = new ApolloClient({
    cache: apolloCache,
    link: authLink.concat(
        new HttpLink({
            uri: `${appConfig.apiOrigin}/graphql`,
        }),
    ),
})
