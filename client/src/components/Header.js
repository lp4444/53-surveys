import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PollIcon from "@mui/icons-material/Poll";
import { connect } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import CssBaseline from "@mui/material/CssBaseline";

const settings = [{ text: "Logout", path: "/api/logout" }];

function ScrollTop(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className="fixed bottom-2 right-3 z-20"
      >
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
};

const Header = ({ auth }) => {
  const pages = [
    { text: "all surveys", link: "/surveys", isShow: true },
    { text: "my surveys", link: `/surveys/${auth?._id}`, isShow: auth },
  ];

  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    if (auth) setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (link = "") => {
    setAnchorElNav(null);
    link && navigate(link);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  React.useEffect(() => {}, []);
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <PollIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Survey-easy
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu()}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map(
                  (page) =>
                    page.isShow && (
                      <MenuItem
                        key={page.text}
                        onClick={() => handleCloseNavMenu(page.link)}
                      >
                        <Typography textAlign="center">{page.text}</Typography>
                      </MenuItem>
                    )
                )}
              </Menu>
            </Box>
            <PollIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Survey-easy
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(
                (page) =>
                  page.isShow && (
                    <Button
                      key={page.text}
                      onClick={() => handleCloseNavMenu(page.link)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.text}
                    </Button>
                  )
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={auth ? "Logout" : "Login with Google"}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {auth ? (
                    <Avatar alt="auth info" src={auth.photo} />
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      href="/auth/google"
                    >
                      login
                    </Button>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                    <Link underline="none" href={setting.path}>
                      {setting.text}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps, null)(Header);
