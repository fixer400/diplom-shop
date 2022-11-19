import { configureStore } from '@reduxjs/toolkit'
import  CartAccessReducer  from './reducers/CartAccessReducer';
import ProductReducer from './reducers/ProductReducer';
import CatalogReducer from './reducers/CatalogReducer';


export const store = configureStore({
  reducer: {
    product: ProductReducer,
    access: CartAccessReducer,
    catalog: CatalogReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch