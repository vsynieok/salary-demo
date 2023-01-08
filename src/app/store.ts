import { configureStore } from "@reduxjs/toolkit";
import LoggerSlice from "../components/Logger/LoggerSlice";

export const store = configureStore({
    reducer: {
        logger: LoggerSlice
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>