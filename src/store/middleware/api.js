import http from '../../http/api'
import * as actions from "../api"

const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action)

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart })

    next(action)

    try {
        const response = await http.request({
            url,
            method,
            data
        })

        dispatch(actions.apiCallSuccess(response.data))

        if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
    } catch (err) {
        const { message } = err.response.data
        dispatch(actions.apiCallFailed(message))
        if (onError) dispatch({ type: onError, payload: message })
    }

}

export default api;