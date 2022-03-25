import { CircularProgress } from '@mui/material'
import React from 'react'
import { RootPageBox } from './RootPageBox'

type Props = {
    message?: string
}

export const LoadingPage: React.FC<Props> = ({ message }) => {
    return (
        <RootPageBox display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
        </RootPageBox>
    )
}
