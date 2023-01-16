import { combineReducers } from "redux";
import authReducer from "./auth";
import usersReducer from "./users";
import productReducer from "./products"
import ordersReducer from "./orders"
import loansReducer from "./loans"

export default combineReducers({
    auth: authReducer,
    users: usersReducer,
    product: productReducer,
    orders: ordersReducer,
    loans: loansReducer
})