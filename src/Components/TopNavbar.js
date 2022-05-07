import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem,
    Avatar,
    makeStyles,
    CssBaseline,
    useScrollTrigger,
    Slide,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import '../Styles/TopNavbar.css';
import vishnuLogo from '../../src/Assets/logo.png';
import PropTypes from 'prop-types';


function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
const headersData = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Info",
        href: "/",
    },
    {
        label: "About",
        href: "/",
    },
    {
        label: "Log Out",
        href: "/",
    },
];
const useStyles = makeStyles({
    flexGrow: {
        flex: '1',
    },
    button: {
        color: '#fff',
        '&:hover': {
            backgroundColor: '#fff',
            color: '#000',
        },
    }
})
export default function TopNavbar(props) {
    const classes = useStyles()
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });
    const { mobileView, drawerOpen } = state;
    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        };
    }, []);

    const displayDesktop = () => {
        return (
            <Toolbar className="toolbar">
                {logoRender}
                <div>{getMenuButtons()}</div>
            </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar className="navbarContent">
                <IconButton
                    {...{
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className="drawerContainer">{getDrawerChoices()}</div>
                </Drawer>

                <div>{logoRender}</div>
            </Toolbar>
        );
    };

    const getDrawerChoices = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Link
                    {...{
                        component: RouterLink,
                        to: href,
                        color: "inherit",
                        style: { textDecoration: "none" },
                        key: label,
                    }}
                >
                    <MenuItem>{label}</MenuItem>
                </Link>
            );
        });
    };

    const logoRender = (
        <Avatar alt="Remy Sharp" src={vishnuLogo} style={{ width: 70, height: 70 }} />
    );
    const logoutAction = () => {
        localStorage.removeItem('loginData');
    }
    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Button style={{ marginRight: 60, }}
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        onClick: logoutAction,
                        className: classes.button
                    }}
                >
                    {label}
                </Button>
            );
        });
    };

    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar className="header">
                    {mobileView ? displayMobile() : displayDesktop()}
                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
}