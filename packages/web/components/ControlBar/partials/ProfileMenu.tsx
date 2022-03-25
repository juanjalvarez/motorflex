import { ExitToApp, AccountBox } from '@mui/icons-material'
import {
    Avatar,
    Box,
    CardActionArea,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Typography,
} from '@mui/material'
import { User } from 'firebase/auth'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../../hooks/useAuth'

type Props = {
    user: User
}

export const ProfileMenu: React.FC<Props> = ({ user }) => {
    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const closeMenu = useCallback(() => setAnchorEl(null), [setAnchorEl])
    const { signOut } = useAuth()
    const isMenuOpen = Boolean(anchorEl)
    return (
        <>
            <CardActionArea
                style={{ borderRadius: 10 }}
                onClick={e => {
                    setAnchorEl(e.currentTarget)
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    paddingX={1}
                    paddingY={0.5}
                >
                    <Typography marginRight={2}>{user.displayName}</Typography>
                    <Avatar
                        alt={user.displayName ?? undefined}
                        src={user.photoURL ?? undefined}
                    />
                </Box>
            </CardActionArea>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={closeMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem
                    onClick={async () => {
                        router.push('/profile')
                        closeMenu()
                    }}
                >
                    <ListItemIcon>
                        <AccountBox />
                    </ListItemIcon>
                    <Typography>My Profile</Typography>
                </MenuItem>
                <Divider />
                <MenuList>
                    <MenuItem
                        onClick={async () => {
                            router.push('/')
                            closeMenu()
                            await signOut()
                        }}
                    >
                        <ListItemIcon>
                            <ExitToApp />
                        </ListItemIcon>
                        <Typography>Sign Out</Typography>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}
