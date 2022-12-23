import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface ProductsState {
  value: Array<object>
}

const initialState: ProductsState = {
  value: localStorage.getItem("products")?(JSON.parse(localStorage.getItem("products") || '')):[] ,
}

export const productCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProductCart: (state, action: PayloadAction<object>) => {
      const data:any = action.payload
      if(state.value.find( (e:any) => e.id === data.id && e.size === data.size)){
        state.value.map((current:any) => {
          if(current.id === data.id && current.size === data.size){
            let mutatedObject = current
            mutatedObject.amount += data.amount
            return(mutatedObject)
          }
        })
      }
      else{
        state.value.push(action.payload)
      }
      localStorage.setItem("products",JSON.stringify(state.value))
    },
    deleteFromProductCart: (state, action: PayloadAction<object>) => {
      const data:any = action.payload
      const newState = state.value.filter((e:any) => (e.id !== data.id || e.size !== data.size))
      state.value = newState
      localStorage.setItem("products",JSON.stringify(state.value))
    },
  },
})

// Action creators are generated for each case reducer function
export const selectProductCart = (state:RootState) => state.product.value
export const sumOfProducts = (state:RootState) => {
  let sum = 0
  state.product.value.forEach((e:any) => {
    sum += e.price * e.amount
  })
  return(sum)
}
export const { setProductCart, deleteFromProductCart } = productCart.actions

export default productCart.reducer