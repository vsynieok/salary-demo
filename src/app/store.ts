import { configureStore } from "@reduxjs/toolkit";
import GlobalSlice from "../components/Global/GlobalSlice";
import LoggerSlice from "../components/Logger/LoggerSlice";

export const store = configureStore({
    reducer: {
        logger: LoggerSlice,
        global: GlobalSlice
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>