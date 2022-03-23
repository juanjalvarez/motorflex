import { useCallback, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '../connections/firebase'
import { useWhoAmIQuery } from '../graphql/gen/hooks'
import { WhoAmIQuery } from '../graphql/gen/operations'

export const useAuth = () => {
    const [firebaseUser, isLoadingFirebase] = useAuthState(firebaseAuth)
    const [whoAmI, setWhoAmI] = useState<WhoAmIQuery['whoAmI'] | undefined>(
        undefined,
    )
    const signOut = useCallback(async () => {
        if (firebaseUser) {
            await firebaseAuth.signOut()
        }
        if (whoAmI) {
            setWhoAmI(undefined)
        }
    }, [firebaseUser])
    const { data: whoAmIData, loading } = useWhoAmIQuery({
        skip: !firebaseUser,
    })
    useEffect(() => {
        if (whoAmIData && firebaseUser) {
            setWhoAmI(whoAmIData.whoAmI)
        }
    }, [whoAmIData, firebaseUser])
    const isLoading = isLoadingFirebase || loading
    return {
        whoAmI,
        firebaseUser,
        signOut,
        isLoading,
    }
}
