import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// receives component and any other props represented by ...rest
/* export default function ProtectedRoutes({ component, ...rest }) {
    const token = cookies.get("TOKEN");
    let location = useLocation();
    if (token) {
        <Route element={component} />
    }
    <Route
        element={<Navigate
            replace
            to="/"
            state={{
                // sets the location a user was about to access before being redirected to login
                from: location,
            }}
        />}
    />

} */

function Protected({ isSignedIn, children }) {
    if (!isSignedIn) {
        return <Navigate to="/" replace />
    }
    return children
}
export default Protected