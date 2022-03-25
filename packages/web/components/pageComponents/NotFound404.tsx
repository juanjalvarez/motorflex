import { Box, Card, CardContent, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import { RootPageBox } from './RootPageBox'

type Props = {
    message?: string
}

export const NotFound404: React.FC<Props> = ({ message }) => {
    return (
        <RootPageBox display="flex" justifyContent="center" alignItems="center">
            <Card
                sx={{
                    marginTop: 5,
                }}
            >
                <CardContent>
                    <Typography variant="h4" color={red[500]} align="center">
                        Error 404 - Not Found
                    </Typography>
                    {message && (
                        <Typography
                            variant="subtitle1"
                            align="center"
                            marginTop={3}
                        >
                            {message}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </RootPageBox>
    )
}
