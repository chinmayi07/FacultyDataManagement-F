import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@material-ui/core";
import '../Styles/UploadStepperModal.css';
import SendIcon from '@material-ui/icons/Send';



export default function UploadStepperModal() {
    const [open, setOpen] = useState(true);
    const [fileData, setFileData] = useState({ preview: '', data: '' })
    const [fileName, setFileName] = useState('Select your file!');
    const [status, setStatus] = useState('')
    const [branch, setBranch] = useState(null);
    const [year, setYear] = useState(null);
    const isDisabled = fileName && branch && year;
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', fileData.data)
        formData.append('branch', branch)
        formData.append('year', year)
        formData.append('isPrev', branch + year)
        const response = await fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
        })
        if (response) setStatus(response.statusText)
    }
    const handleFileChange = (e) => {
        const fileInfo = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setFileName(e.target.files[0].name)
        setFileData(fileInfo)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open max-width dialog
            </Button>
            <Dialog
                fullScreen={false}
                fullWidth={true}
                maxWidth={'lg'}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Updata Student Data</DialogTitle>
                <DialogContent style={{ height: window.innerHeight - 300, backgroundColor: '#212121' }}>
                    <DialogContentText>
                        <form className="steps" acceptCharset="UTF-8" encType="multipart/form-data" noValidate="">
                            <div id="progressbar">
                                <li>Upload Student Details</li>
                                <li>Aquisition</li>
                                <li className="active">Cdivtivation</li>
                                <li >Cdivtivation2</li>
                                <li>Retention</li>
                            </div>
                            <fieldset style={{ minHeight: 300 }}>
                                <div className="fs-title">Class Details</div>
                                <div className="fs-subtitle">Upload an excel sheet and fill below details</div>
                                {status && <h4>{status}</h4>}
                                <div className="container">
                                    <form className="form">
                                        <div className="file-upload-wrapper" data-text={fileName}>
                                            <input type="file" accept='.xlsx, .xls, .csv' onChange={handleFileChange}></input>
                                        </div>
                                    </form>
                                </div>
                                <div className="container" style={{ marginTop: '10px' }}>
                                    <form className="form">
                                        <input className="file-upload-wrapper" style={{ border: '2px solid #7B1FA2', fontSize: 18 }} type="input" placeholder="BRANCH" onChange={(e) => { setBranch(e.target.value) }}></input>
                                    </form>
                                </div>
                                <div className="container">
                                    <form className="form">
                                        <input className="file-upload-wrapper" style={{ border: '2px solid #7B1FA2', paddingLeft: 15, paddingTop: 10, paddingBottom: 5, width: 380, fontSize: 18 }} type="number" placeholder="YEAR" onChange={(e) => { setYear(e.target.value) }}></input>
                                    </form>
                                </div>
                                <div className="fs-title"><Button disabled={!isDisabled} variant="contained" onClick={handleSubmit} style={{ backgroundColor: isDisabled ? '#7B1FA2' : '#eeeeee', color: '#FFFFFF', marginTop: 29 }} endIcon={<SendIcon />}>
                                    Submit
                                </Button></div>
                            </fieldset>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}
