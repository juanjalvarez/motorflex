import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ProfilePage } from '../../components/pageComponents/ProfilePage'

const SpecificProfilePage: NextPage = () => {
    const router = useRouter()
    const { slug } = router.query
    return <ProfilePage slug={slug as string} />
}

export default SpecificProfilePage
