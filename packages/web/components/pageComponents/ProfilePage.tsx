import React from 'react'
import { useUserBySlugQuery } from '../../graphql/gen/hooks'
import { LoadingPage } from './LoadingPage'
import { NotFound404 } from './NotFound404'
import { RootPageBox } from './RootPageBox'

type Props = {
    slug: string
}

export const ProfilePage: React.FC<Props> = ({ slug }) => {
    const { data, loading } = useUserBySlugQuery({
        variables: {
            slug,
        },
    })
    if (loading || !data) {
        return <LoadingPage />
    }
    if (!data.getUserBySlug) {
        return <NotFound404 message={`Profile "${slug}" does not exist.`} />
    }
    return <RootPageBox>{data.getUserBySlug.displayName}</RootPageBox>
}
