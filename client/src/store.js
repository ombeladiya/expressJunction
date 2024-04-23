import { configureStore } from '@reduxjs/toolkit'

import userReducer from "./features/UserSlice";

const store = configureStore({
    reducer: {
        auth: userReducer,
    },
})

export default store;