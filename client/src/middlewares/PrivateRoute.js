import React from "react";
import { Route } from "react-router-dom";
import IsAuthenticated from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <div>
            <IsAuthenticated permission={1} />
            <Route {...rest} render={props => <Component {...props} />} />
        </div>
    );
};

export default PrivateRoute;
