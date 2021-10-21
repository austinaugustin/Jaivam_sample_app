import apiContants from '../../../common/apiConstants';
import Api from '../../../common';

export const getuserLogin = (params) => {
    return function (dispatch) {
        dispatch({ type: "USER_LOGIN_FETCHING" });
        Api('post', apiContants.loginUrl, params)
            .then((response) => {
                console.log('response', response)
                if (response.status == 'success') {
                    dispatch({ type: "USER_LOGIN_SUCCESS", response: response });
                }
                else {
                    dispatch({ type: "USER_LOGIN_FAILED", response: response, });
                }
            })
    }
};