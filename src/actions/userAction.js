import axios, {Axios} from "axios";
import {baseurl} from "../ApiEndpoint/Api";
import {
    STAFF_REGISTER_REQUEST,
    STAFF_REGISTER_FAIL,
    STAFF_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_TOPSELLERS_LIST_REQUEST,
    USER_TOPSELLERS_LIST_SUCCESS,
    USER_TOPSELLERS_LIST_FAIL,
    USER_DETAILS_RESET,
}
    from "../constants/userConstants";
import {useSelector} from "react-redux";

export const register = (username, email, phone, password, is_active, is_admin, is_staff, is_verified) => async (dispatch) => {
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo} = userSignin
    const config = {
        headers: {
            Authorization: 'Bearer ' + userInfo.token
        }
    }


    dispatch({type: STAFF_REGISTER_REQUEST, payload: {email, password}});
    try {
        const {data} = await axios.post(`${baseurl}/api/addstuff`, {
            username, email, phone, password, is_active, is_admin, is_staff, is_verified
        }, config);
        dispatch({type: STAFF_REGISTER_SUCCESS, payload: data});

    } catch (error) {
        dispatch({
            type: STAFF_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const signin = (phone, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const {data} = await axios.post(
            `${baseurl}/api/login`,
            {"phone":phone,"password": password},
            config
        )

        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        document.location.href = '/dashboard'
        // if (data.is_superuser===true){
        //     document.location.href = '/dashboard'
        // }else {
        //     document.location.href = '/userprofile'
        // }
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

    //
}

export const signout = () => (dispatch, getState) => {
    document.location.href = '/signin'
    localStorage.removeItem('userInfo')

    dispatch({type: USER_SIGNOUT})
    dispatch({type: USER_DETAILS_RESET})

}
