let initialStage = {
    isLoading: false,
    errorMessage: null,
    user: null,
    token: null
};

const userReducer = (state = initialStage, actions) => {
    switch (actions.type) {
        case "USER_LOGIN_FETCHING":
            return { ...state, isLoading: true, };
            break;
        case "USER_LOGIN_SUCCESS":
            return { ...state, isLoading: false, errorMessage: null, token: actions.response.token, user: actions.response.data };
            break;
        case "USER_LOGIN_FAILED":
            return { ...state, isLoading: false, errorMessage: actions.response.errors[0] };
            break;
        case "USER_LOGIN_RESET":
            return { ...state, isLoading: false, user: null, errorMessage: null, token: null };
            break;
        default:
            return state;
    }
};

export default userReducer;
