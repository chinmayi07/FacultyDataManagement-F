import React, { useState } from 'react';
import '../Styles/TopNavbar.css'
import TopNavbar from '../Components/TopNavbar';
import UploadStepperModal from '../Components/UploadStepperModal';

export default function Landing(props) {
    return (
        <>
            <TopNavbar />
            <UploadStepperModal />
        </>
    );
}
