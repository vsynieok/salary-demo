import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"

type GlobalState = {
    invoiceSumsTotal: number
    invoicesCount: number
}

const initialState: GlobalState = {
    invoiceSumsTotal: 0,
    invoicesCount: 0
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        issueInvoice: (state, action: PayloadAction<number>) => {
            return {...state, invoiceSumsTotal: state.invoiceSumsTotal + action.payload, invoicesCount: state.invoicesCount + 1}
        },
        resetCounter: (state) => {
            return {...state, invoiceSumsTotal: 0, invoicesCount: 0}
        }
    }
})

export const { issueInvoice, resetCounter } = globalSlice.actions;

export default globalSlice.reducer