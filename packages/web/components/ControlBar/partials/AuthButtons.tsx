import { signInWithRedirect } from 'firebase/auth'
import React from 'react'
import { GoogleLoginButton } from 'react-social-login-buttons'
import { authProviders, firebaseAuth } from '../../../connections/firebase'
import { useAuth } from '../../../hooks/useAuth'
import { ProfileMenu } from './ProfileMenu'

export const AuthButtons: React.FC = () => {
    const { firebaseUser } = useAuth()
    return (
        <>
            {firebaseUser ? (
                <ProfileMenu user={firebaseUser} />
            ) : (
                <GoogleLoginButton
                    onClick={() => {
                        signInWithRedirect(firebaseAuth, authProviders.google)
                    }}
                >
                    Sign in with Google
                </GoogleLoginButton>
            )}
        </>
    )
}
