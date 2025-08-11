import {
  faHome,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutDialog from "./LogoutDialog";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false); // <-- new

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const navigate = useNavigate();

  const pages = [
    { name: <FontAwesomeIcon icon={faHome} className="w-6 h-6" />, route: "/home" },
    { name: "View Demo", route: "/demo" }
  ];

  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  React.useEffect(() => {
    if (openLogoutDialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  
    // Clean up on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openLogoutDialog]);
  return (
    <>
      <AppBar position="static" className="!bg-gray-800">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo Icon */}
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>

            {/* Mobile menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                {pages.map((page) => (
                  <Link to={page.route} key={page.name} className="no-underline">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            {/* Desktop menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
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

            {/* Right side: logout */}
            <Box sx={{ flexGrow: 0 }} className="flex items-center gap-4">
              <Tooltip title="Logout">
                <IconButton onClick={() => setOpenLogoutDialog(true)} sx={{ p: 0 }}>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="text-gray-200 w-6 h-6"
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>


      <LogoutDialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        onConfirm={() => {
          handleLogout();
          setOpenLogoutDialog(false);
        }}
      />
    </>
  );
}

export default Navbar;
