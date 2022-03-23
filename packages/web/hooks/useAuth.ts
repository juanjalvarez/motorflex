import { useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '../connections/firebase'

export const useAuth = () => {
    const [firebaseUser] = useAuthState(firebaseAuth)
    const signOut = useCallback(async () => {
        if (firebaseUser) {
            await firebaseAuth.signOut()
        }
    }, [firebaseUser])
    return {
        firebaseUser,
        signOut,
    }
}
