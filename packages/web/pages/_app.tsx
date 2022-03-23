import '../polyfills'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { ControlBar } from '../components/ControlBar/ControlBar'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { primaryTheme } from '../themes/primaryTheme'
import { ApolloProvider } from '@apollo/react-hooks'
import { apollo } from '../connections/graphql'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <React.StrictMode>
            <ApolloProvider client={apollo}>
                <ThemeProvider theme={primaryTheme}>
                    <CssBaseline>
                        <ControlBar />
                        <Box sx={{ minHeight: '80vh' }}>
                            <Component {...pageProps} />
                        </Box>
                    </CssBaseline>
                </ThemeProvider>
            </ApolloProvider>
        </React.StrictMode>
    )
}

export default MyApp
