import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"

type LoggerState = {
    messages: string[]
}

const initialState: LoggerState = {
    messages: []
}

export const loggerSlice = createSlice({
    name: 'logger',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<string>) => {
            let messages = [...state.messages]
            messages.push(action.payload)
            return {...state, messages}
        }
    }
})

export const { addMessage } = loggerSlice.actions;

export default loggerSlice.reducer