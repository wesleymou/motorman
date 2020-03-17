import React from "react";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";

// const api = () => {
//     if (process.env.NODE_ENV === "development")
//         return axios.create({ baseURL: "http://127.0.0.1:3333" });
//     else return axios.create();
// };

const api = axios.create({
    baseURL: "http://127.0.0.1:3333"
});

api.interceptors.request.use(async config => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
        config.headers.Token = `Bearer ${token}`;
    }
    return config;
});

export const authenticate = (login, password) => {
    //TODO
    localStorage.setItem(
        "TOKEN",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWxpZGl0eSI6dHJ1ZSwicGVybWlzc2lvbiI6MX0.Brm3XTqJfoHsE-z-CRoXd0XlzG_olGJtC1kvvDBXE4Q"
    );
    return true;
};

export const isValid = permission => {
    let token = localStorage.getItem("TOKEN");
    let decoded = jwt.decode(token);

    if (token && decoded.validity === true)
        if (permission >= Number.parseInt(decoded.permission)) return true;
        else return false;
    else return false;
};

export const logout = () => {
    localStorage.removeItem("TOKEN");
};

export default function IsAuthenticated({ permission }) {
    if (isValid(permission)) return "";
    else return <Redirect to={{ pathname: "/login/" }} />;
}
