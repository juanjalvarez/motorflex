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

export type UserBySlugQueryVariables = Types.Exact<{
    slug: Types.Scalars['String']
}>

export type UserBySlugQuery = {
    __typename?: 'Query'
    getUserBySlug?: {
        __typename?: 'User'
        id: number
        displayName: string
        profilePhotoURL?: string | null
        ownedVehicles: Array<{
            __typename?: 'Vehicle'
            id: number
            name: string
            description: string
            vin: string
            year: number
            make: string
            model: string
            isManual: boolean
            isElectric: boolean
        }>
    } | null
}
