import axios from 'axios';
import React, { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css'

function Login({ history }) {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
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
                    navigate('/landing');
                }
            }
        )
    }
    const handleGoogleFailureResponse = async (googleData) => {
        console.log('-----------', JSON.stringify(googleData));
    }
    return (
        <div>
            <nav className="glass login">
                <section class="login">
                    <form action="javascript:void(0);" id="form">
                        <label for="username" value={username} onChange={event => setusername(event.target.value)}>
                            Username
                            <input id="username" type="text"></input>
                        </label>
                        <label for="password" value={password} onChange={event => setpassword(event.target.value)}>
                            Password
                            <input id="password" type="password"></input>
                        </label>
                        <button type="submit">Login</button>
                        <div style={{ paddingTop: '10px' }}>
                            <GoogleLogin
                                render={renderProps => (
                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}><div class="google-btn">
                                        <div class="google-icon-wrapper">
                                            <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                                        </div>
                                        <p class="btn-text"><b>Sign in with google</b></p>
                                    </div></button>
                                )}
                                buttonText="Login"
                                onSuccess={handleGoogleSuccessResponse}
                                onFailure={handleGoogleFailureResponse}
                                clientId="472472243625-v0ap7jnko2e6d21qpu1s6a05o6u4qlkj.apps.googleusercontent.com"
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </form>
                </section>
            </nav>
        </div>
    );
}

export default Login