import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_STATUS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_STATUS,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    LOGOUT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    SET_SIGN_STATE,
} from './types'
import { setAlert } from './alert';
import axios from 'axios'

export const check_authenticated = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch(err){
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Access-Control-Request-Method': 'POST',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        re_password
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        if (res.status === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
            dispatch({
                type: SIGNUP_STATUS,
                payload: true
            });
            dispatch(setAlert(true,'Te enviamos un correo, por favor activa tu cuenta. Revisa el correo de spam','#8bf282'))
            
        } else {
            dispatch({
                type: SIGNUP_FAIL
            });
            dispatch(setAlert(true,'Error al crear cuenta', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
};

export const load_user = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
        
            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: USER_LOADED_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
}

export const activate = (uid, token) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
    
        if (res.status === 204) {
            dispatch({
                type: ACTIVATION_SUCCESS
            });
            dispatch(setAlert(true,'Cuenta activada correctamente', '#8bf282'));
        } else {
            dispatch({
                type: ACTIVATION_FAIL
            });
            dispatch(setAlert(true,'Error activando cuenta', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    }
    catch(err){
        dispatch({
            type: ACTIVATION_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,'Error al conectar con el servidor, intenta mas tarde.', '#fcbfbf'));
    }
};

export const login = (email, password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email,
        password
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
    
        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch({
                type: LOGIN_STATUS,
                payload: true
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert(true, 'Error al iniciar sesion.', '#fcbfbf'));
        }
    }
    catch(err){
        dispatch({
            type: LOGIN_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true, 'Error al iniciar sesion. Intenta de nuevo', '#fcbfbf'));
    }
}

export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config);
            
            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: REFRESH_FAIL
                });
            }
        }catch(err){
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
}

export const reset_password = (email) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        
        if (res.status === 204) {
            dispatch({
                type: RESET_PASSWORD_SUCCESS
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert(true,'Password reset email sent', '#8bf282'));
        } else {
            dispatch({
                type: RESET_PASSWORD_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert(true,'Error sending password reset email', '#fcbfbf'));
        }
    }
    catch(err){
        dispatch({
            type: RESET_PASSWORD_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,'Error sending password reset email', '#fcbfbf'));
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password
    });

    if (new_password !== re_new_password) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true, 'Passwords do not match', '#fcbfbf'));
    } else {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
        
            if (res.status === 204) {
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_SUCCESS
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert(true,'Password has been reset successfully', '#8bf282'));
            } else {
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_FAIL
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert(true,'Error resetting your password', '#fcbfbf'));
            }
        } catch(err){
            dispatch({
                type: RESET_PASSWORD_CONFIRM_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert(true,'Error resetting your password', '#fcbfbf'));
        }
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(setAlert(true,'Succesfully logged out', '#8bf282'));
}

export const set_sign_state = (sign) => dispatch => {
    dispatch({
        type: SET_SIGN_STATE,
        payload:sign
    });
}

export const set_login_status = () => dispatch => {
    dispatch({
        type: LOGIN_STATUS,
        payload:false
    });
}

export const set_signup_status = () => dispatch => {
    dispatch({
        type: SIGNUP_STATUS,
        payload:false
    });
}
