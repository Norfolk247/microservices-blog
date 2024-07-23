import * as React from 'react'
import {Link} from 'react-router-dom'
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, MenuItem} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {useState} from "react"
import {useLogto} from "@logto/react"

const pages = [
    {
        name: 'News',
        path: 'posts'
    },
    {
        name: 'Service 2',
        path: 'service2'
    }
]
const signInCallbackURL = `http://localhost:3000/callback`
const signOutRedirectURL = 'http://localhost:3000'

const MyAppBar: React.FC = () => {
    const { signIn, signOut, isAuthenticated } = useLogto()

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map(({name,path}) => (
                                <MenuItem component={Link} to={path} key={path} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        {name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map(({name,path}) => (
                            <Button
                                key={path}
                                component={Link}
                                to={path}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {name}
                            </Button>
                        ))}
                    </Box>
                    {isAuthenticated ?
                        <Box sx={{flexGrow: 0}}>
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={()=>signOut(signOutRedirectURL)}>
                                    <Typography textAlign="center">Sign Out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        :
                        <Box sx={{flexGrow: 0}}>
                            <Button
                                onClick={()=>signIn(signInCallbackURL)}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                LOGIN
                            </Button>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default MyAppBar