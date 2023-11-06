import {
    STAFF_REGISTER_REQUEST,
    STAFF_REGISTER_FAIL,
    STAFF_REGISTER_SUCCESS,

    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,

    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
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

} from "../constants/userConstants";

export const staffRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case STAFF_REGISTER_REQUEST:
            return {loading: true};
        case STAFF_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case STAFF_REGISTER_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload};
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
};