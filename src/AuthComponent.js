import React, { useEffect, useState, } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function AuthComponent() {
    const [message, setMessage] = useState("");
    const token = cookies.get("TOKEN");
    useEffect(() => {
        // set configurations for the API call here
        const configuration = {
            method: "get",
            url: "http://localhost:3010/pokemon",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // make the API call
        axios(configuration)
            .then((result) => {
                // assign the message in our result to the message we initialized above
                setMessage(result.data.message);
            })
            .catch((error) => {
                error = new Error();
            });
    }, []);
    return (
        <div>
            <h1 className="text-center">Auth Component</h1>
            <h3 className="text-center text-danger">{message}</h3>
        </div>
    );
}
