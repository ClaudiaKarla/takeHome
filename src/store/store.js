import { configureStore } from '@reduxjs/toolkit';
import { marvelSlice } from './marvel/marvelSlice'
import { thunk } from 'redux-thunk';

    export const store = configureStore({
        reducer: {
            marvel: marvelSlice.reducer
        },
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(thunk)
});