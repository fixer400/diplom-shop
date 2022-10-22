import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductsState {
  value: Array<object>
  sum:number
}

const initialState: ProductsState = {
  value: localStorage.getItem("products")?(JSON.parse(localStorage.getItem("products") || '')):[] ,
  sum:0,
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
    deleteProductCart: (state, action: PayloadAction<object>) => {
      const data:any = action.payload
      const newState = state.value.filter((e:any) => (e.id !== data.id || e.size !== data.size))
      state.value = newState
      localStorage.setItem("products",JSON.stringify(state.value))
    },
    getSum: (state) => {
      state.sum = 0
      state.value.forEach((e:any) => {
        state.sum += e.price * e.amount
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProductCart, getSum, deleteProductCart } = productCart.actions

export default productCart.reducer