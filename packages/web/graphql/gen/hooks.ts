import * as Types from './operations'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const

export const HealthDocument = gql`
    query Health {
        health
    }
`

/**
 * __useHealthQuery__
 *
 * To run a query within a React component, call `useHealthQuery` and pass it any options that fit your needs.
 * When your component renders, `useHealthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHealthQuery({
 *   variables: {
 *   },
 * });
 */
export function useHealthQuery(
    baseOptions?: Apollo.QueryHookOptions<
        Types.HealthQuery,
        Types.HealthQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<Types.HealthQuery, Types.HealthQueryVariables>(
        HealthDocument,
        options,
    )
}
export function useHealthLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        Types.HealthQuery,
        Types.HealthQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<Types.HealthQuery, Types.HealthQueryVariables>(
        HealthDocument,
        options,
    )
}
export type HealthQueryHookResult = ReturnType<typeof useHealthQuery>
export type HealthLazyQueryHookResult = ReturnType<typeof useHealthLazyQuery>
export type HealthQueryResult = Apollo.QueryResult<
    Types.HealthQuery,
    Types.HealthQueryVariables
>
export const WhoAmIDocument = gql`
    query WhoAmI {
        whoAmI {
            id
            firebaseUid
            displayName
            email
        }
    }
`

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a React component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAmIQuery(
    baseOptions?: Apollo.QueryHookOptions<
        Types.WhoAmIQuery,
        Types.WhoAmIQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<Types.WhoAmIQuery, Types.WhoAmIQueryVariables>(
        WhoAmIDocument,
        options,
    )
}
export function useWhoAmILazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        Types.WhoAmIQuery,
        Types.WhoAmIQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<Types.WhoAmIQuery, Types.WhoAmIQueryVariables>(
        WhoAmIDocument,
        options,
    )
}
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>
export type WhoAmIQueryResult = Apollo.QueryResult<
    Types.WhoAmIQuery,
    Types.WhoAmIQueryVariables
>
