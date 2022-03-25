import React from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import MUILink, { LinkProps as MUILinkProps } from '@mui/material/Link'

type Props = {
    href: string
    shallow?: boolean
    nextProps?: NextLinkProps
    muiProps?: MUILinkProps
}

export const Link: React.FC<Props> = ({
    children,
    href,
    shallow = true,
    nextProps,
    muiProps,
}) => {
    return (
        <NextLink href={href} shallow={shallow} {...nextProps}>
            <MUILink {...muiProps}>{children}</MUILink>
        </NextLink>
    )
}
