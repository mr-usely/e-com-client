import { configureStore } from "@reduxjs/toolkit";
import api from "./middleware/api.js"
import reducer from "./reducer";

const customStore = () => {
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => [
            ...getDefaultMiddleware(),
            api
        ]
    })
}

export default customStore