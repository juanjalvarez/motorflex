import type { NextPage } from 'next'
import { ProfilePage } from '../../components/pageComponents/ProfilePage'
import { useAuth } from '../../hooks/useAuth'
import { CircularProgress } from '@mui/material'

const MyProfilePage: NextPage = () => {
    const { whoAmI, isLoading } = useAuth()
    if (!whoAmI || isLoading) {
        return <CircularProgress />
    }
    return <ProfilePage slug={whoAmI.uniqueSlug} />
}

export default MyProfilePage
