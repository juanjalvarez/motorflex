import React from 'react'

type Props = {
    slug: string
}

export const ProfilePage: React.FC<Props> = ({ slug }) => {
    return <div>{slug}</div>
}
