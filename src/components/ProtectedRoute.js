import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
        return isAuthenticated ? (
                <Component {...rest} />
            ) : (
             <Navigate to  ={{
             pathname: "/signin",
             state: {from: rest.location }
             }}
             />
    );
}

export default ProtectedRoute;