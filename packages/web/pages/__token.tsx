import type { NextPage } from 'next'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

const TokenPage: NextPage = () => {
    const { firebaseUser } = useAuth()
    const [token, setToken] = useState<string | undefined>()
    useEffect(() => {
        firebaseUser?.getIdToken().then(token => {
            setToken(token)
        })
    }, [firebaseUser])
    return (
        <div>
            {!firebaseUser && <div>You are not signed in!</div>}
            {token && (
                <div>
                    <Button
                        onClick={() =>
                            window.navigator?.clipboard?.writeText(token)
                        }
                    >
                        Copy to clipboard
                    </Button>
                </div>
            )}
        </div>
    )
}

export default TokenPage
