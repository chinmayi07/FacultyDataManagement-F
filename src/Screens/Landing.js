import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Container, useScrollTrigger, CssBaseline, Typography, Toolbar, Slide } from '@material-ui/core';
import '../Styles/TopNavbar.css'
import TopNavbar from '../Components/TopNavbar';
import { useNavigate } from 'react-router-dom';

export default function Landing(props) {
    return (
        <>
            <TopNavbar />
            <Container>
                <Box sx={{ my: 2 }}>
                    {[...new Array(92)]
                        .map(
                            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                        )
                        .join('\n')}
                </Box>
            </Container>
        </>
    );
}
