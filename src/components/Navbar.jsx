import { faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const navigate = useNavigate();
    const pages = [
        { name: <FontAwesomeIcon icon={faHome} className='w-6 h-6'/>, route: '/home'},
        { name: 'View Demo', route: '/demo' },
    ];

     const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('user'); 
        
        navigate('/');
      };
    return (
        <AppBar position="static" className="!bg-gray-800">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                        </svg>
                    </div>
                   

                 
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <Link to={page.route} key={page.name} className="no-underline">
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" >{page.name}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                            
                        </Menu>
                    </Box>

                 
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                 

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link to={page.route} key={page.name} className="no-underline">
                                <button
                                    onClick={handleCloseNavMenu}
                                    className="text-gray-200 ml-5 font-medium text-base hover:text-gray-300 px-3 py- font-poppins"
                                >
                                    {page.name}
                                </button>
                            </Link>
                        ))}
                    </Box>

                 
                    <Box sx={{ flexGrow: 0 }} className="flex items-center gap-4">

                    
                        <Tooltip title="Logout">
                            <IconButton onClick={handleLogout} sx={{ p: 0 }}>
                                <FontAwesomeIcon icon={faRightFromBracket} className="text-gray-200 w-6 h-6" />
                            </IconButton>
                        </Tooltip>

                    </Box>

                  
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
