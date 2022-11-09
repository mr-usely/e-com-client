import { combineReducers } from "redux";
import entitiesReducer from './entities/index'

export default combineReducers({
    entities: entitiesReducer
})