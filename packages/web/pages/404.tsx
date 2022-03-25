import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { NotFound404 } from '../components/pageComponents/NotFound404'

const MyProfilePage: NextPage = () => {
    const router = useRouter()
    return (
        <NotFound404 message={`The path "${router.asPath}" does not exist.`} />
    )
}

export default MyProfilePage
