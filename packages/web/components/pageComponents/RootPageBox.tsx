import Box, { BoxProps } from '@mui/material/Box'
import React from 'react'

export const RootPageBox: React.FC<BoxProps> = ({
    children,
    ...otherProps
}) => {
    return (
        <Box
            {...otherProps}
            sx={{
                minHeight: '75vh',
            }}
        >
            {children}
        </Box>
    )
}
