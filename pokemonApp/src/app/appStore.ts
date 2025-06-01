import { configureStore } from '@reduxjs/toolkit'
import personagensReducer from '../features/personagens/personagensSlice'

export const appStore = configureStore({
    reducer: {
        personagens: personagensReducer,
    },
})

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
