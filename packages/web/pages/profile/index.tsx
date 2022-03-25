import type { NextPage } from 'next'
import { ProfilePage } from '../../components/pageComponents/ProfilePage'
import { useAuth } from '../../hooks/useAuth'
import { LoadingPage } from '../../components/pageComponents/LoadingPage'

const MyProfilePage: NextPage = () => {
    const { whoAmI, isLoading } = useAuth()
    if (!whoAmI || isLoading) {
        return <LoadingPage />
    }
    return <ProfilePage slug={whoAmI.uniqueSlug} />
}

export default MyProfilePage
