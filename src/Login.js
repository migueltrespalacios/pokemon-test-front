import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import './login.css';
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';
const cookies = new Cookies();

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:3010/login",
            data: {
                email,
                password,
            },
        };

        axios(configuration)
            .then((result) => {
                setLogin(true);
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });
                window.location.href = "/pokemon";
            })
            .catch((error) => {
                error = new Error();
            });
    }


    return (
        <>
            <div class="login-container">
                <div>
                    
                    <Form>
                        <h2>Login</h2>
                        {/* email */}
                        {/* email */}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </Form.Group>

                        {/* password */}
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </Form.Group>
                        <br />

                        {/* submit button */}
                        <div class='container-button'>
                            <button
                                class='buttonClass'
                                variant="primary"
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Login
                            </button>
                        </div>
                        <div  class='textClass'>
                            <a onClick={() => { navigate('/register') }}>
                                Registrate
                            </a>
                        </div>
                        
                        {login ? (
                            <p className="text-success">You Are Logged in Successfully</p>
                        ) : (
                            <p class="hiddenText">You Are Not Logged in</p>
                        )}
                    </Form>
                </div>
            </div>

        </>
    )
}