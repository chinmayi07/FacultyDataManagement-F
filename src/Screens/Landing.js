import React, { useState } from 'react';
import '../Styles/TopNavbar.css'
import TopNavbar from '../Components/TopNavbar';

export default function Landing(props) {
    const [fileData, setFileData] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', fileData.data)
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
        setFileData(fileInfo)
    }
    return (
        <>
            <TopNavbar />
            <div className='App'>
                <h1>Upload to server</h1>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <input type='file' name='file' onChange={handleFileChange}></input>
                    <button type='submit'>Submit</button>
                </form>
                {status && <h4>{status}</h4>}
            </div>
        </>
    );
}
