import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate();
    const [loginData, setLoginData] = useState(null);
    useEffect(() => {
        setLoginData(
            localStorage.getItem("loginData")
                ? JSON.parse(localStorage.getItem("loginData")) : null);
    }, []);
    const handleGoogleSuccessResponse = async (googleData) => {
        const data = {
            googleData: googleData
        }
        axios.post('http://localhost:3001/api/google-login', { data }).then(
            function (res) {
                if (res.data) {
                    setLoginData(res.data);
                    localStorage.setItem("loginData", JSON.stringify(res.data));
                }
            }
        )
    }
    const handleGoogleFailureResponse = async (googleData) => {
        console.log('-----------', JSON.stringify(googleData));
    }
    return (
        <div className="App">
            <h1>React Google Login App</h1>
            <div>
                hhhhhhhhhhh
                {loginData ? navigate('/landing')
                    : <GoogleLogin
                        clientId="472472243625-v0ap7jnko2e6d21qpu1s6a05o6u4qlkj.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={handleGoogleSuccessResponse}
                        onFailure={handleGoogleFailureResponse}
                        cookiePolicy={'single_host_origin'}
                    />}
            </div>
        </div>
    )
}

export default Login