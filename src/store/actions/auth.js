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
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthtimeout = (expiresTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        }, expiresTime * 1000);
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
                console.log("authenitcation response: ", resp);
                dispatch(authSuccess(resp.data.idToken, resp.data.localId));
                dispatch(checkAuthtimeout(resp.data.expiresIn));
            })
            .catch(err => {
                console.error("sign up or in falied: ", err);
                dispatch(authFail(err.response.data.error));
            })
    }
}