import * as Types from './schemas'

export type HealthQueryVariables = Types.Exact<{ [key: string]: never }>

export type HealthQuery = { __typename?: 'Query'; health: number }

export type WhoAmIQueryVariables = Types.Exact<{ [key: string]: never }>

export type WhoAmIQuery = {
    __typename?: 'Query'
    whoAmI: {
        __typename?: 'User'
        id: number
        firebaseUid: string
        displayName: string
        email: string
        uniqueSlug: string
    }
}
