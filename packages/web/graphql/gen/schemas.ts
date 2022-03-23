export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
}

export type CreateVehicleInput = {
    description: Scalars['String']
    isElectric: Scalars['Boolean']
    isListed: Scalars['Boolean']
    isManual: Scalars['Boolean']
    make: Scalars['String']
    model: Scalars['String']
    name: Scalars['String']
    vin: Scalars['String']
    year: Scalars['Int']
}

export type Mutation = {
    __typename?: 'Mutation'
    createVehicle: Vehicle
    updateVehicle: Vehicle
}

export type MutationCreateVehicleArgs = {
    input: CreateVehicleInput
}

export type MutationUpdateVehicleArgs = {
    id: Scalars['Int']
    input: UpdateVehicleInput
}

export type Query = {
    __typename?: 'Query'
    health: Scalars['Float']
    whoAmI: User
}

export type UpdateVehicleInput = {
    description?: InputMaybe<Scalars['String']>
    isElectric?: InputMaybe<Scalars['Boolean']>
    isListed?: InputMaybe<Scalars['Boolean']>
    isManual?: InputMaybe<Scalars['Boolean']>
    make?: InputMaybe<Scalars['String']>
    model?: InputMaybe<Scalars['String']>
    name?: InputMaybe<Scalars['String']>
    year?: InputMaybe<Scalars['Int']>
}

export type User = {
    __typename?: 'User'
    createdAt: Scalars['String']
    displayName: Scalars['String']
    email: Scalars['String']
    firebaseUid: Scalars['ID']
    id: Scalars['Int']
    ownedVehicles: Array<Vehicle>
    profilePhotoURL?: Maybe<Scalars['String']>
    updatedAt: Scalars['String']
}

export type Vehicle = {
    __typename?: 'Vehicle'
    createdAt: Scalars['String']
    description: Scalars['String']
    id: Scalars['Int']
    isElectric: Scalars['Boolean']
    isListed: Scalars['Boolean']
    isManual: Scalars['Boolean']
    make: Scalars['String']
    model: Scalars['String']
    name: Scalars['String']
    ownerUser: User
    updatedAt: Scalars['String']
    vin: Scalars['String']
    year: Scalars['Int']
}
