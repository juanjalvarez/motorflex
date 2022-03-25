import React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { AuthButtons } from './partials/AuthButtons'
import { Link } from '../Link'

export const ControlBar: React.FC = () => {
    return (
        <AppBar position="static" sx={{ flexGrow: 0 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link
                        href="/"
                        muiProps={{
                            variant: 'h5',
                            style: {
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            },
                        }}
                    >
                        MotorFlex
                    </Link>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <AuthButtons />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
