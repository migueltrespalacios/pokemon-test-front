import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./register.css";
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const configuration = {
            method: "post",
            url: "http://localhost:3010/register",
            data: {
                email,
                password,
            },
        };


        // prevent the form from refreshing the whole page
        axios(configuration)
            .then((result) => {
                setRegister(true);
            })
            .catch((error) => {
                error = new Error();
            });

        // make a popup alert showing the "submitted" text
    }


    return (
        <>
            <div class="register-container">
                <div>
                    <Form>
                        <h2>Register</h2>
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
                                Registrar
                            </button>
                        </div>
                        <div class='container-button'>
                            <button class='buttonRegisterClass' onClick={() => { navigate('/') }}>
                                Ingresar
                            </button>
                        </div>
                        
                        {/* <a onClick={() => { navigate('/') }}>
                            Ingresar
                        </a> */}
                        {register ? (
                            <p className="text-success">You Are Registered Successfully</p>
                        ) : (
                            <p class="hiddenText">You Are Not Registered</p>
                        )}
                    </Form>

                </div>
            </div>

        </>
    )
}