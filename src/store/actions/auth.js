// Enzyme API: http://airbnb.io/enzyme/docs/api/
// Jest Docs: https://facebook.github.io/jest/
import axios from 'axios';
import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiresTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        }, expiresTime);
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
            } else {
                dispatch(logout());
            }
        }
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const auth = (email, password, isSignup) => {
    const apiKey = "AIzaSyAcl1o4ECdJPruK20ZWiVpwszOH3b6OIIc";
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+apiKey;

        if(!isSignup){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+apiKey;
        }

        axios.post(url, authData)
            .then(resp => {
                const expirationData = new Date(new Date().getTime() + (resp.data.expiresIn * 1000));
                 localStorage.setItem('token', resp.data.idToken);
                 localStorage.setItem('expirationDate', expirationData);
                 localStorage.setItem('userId', resp.data.localId);
                dispatch(authSuccess(resp.data.idToken, resp.data.localId));
                dispatch(checkAuthTimeout(resp.data.expiresIn * 1000));
            })
            .catch(err => {
                console.error("sign up or in falied: ", err);
                dispatch(authFail(err.response.data.error));
            })
    }
}
