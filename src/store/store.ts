import { configureStore } from '@reduxjs/toolkit'
import  CartAccessReducer  from './reducers/CartAccessReducer';
import ProductReducer from './reducers/ProductReducer';


export const store = configureStore({
  reducer: {
    product: ProductReducer,
    access: CartAccessReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch