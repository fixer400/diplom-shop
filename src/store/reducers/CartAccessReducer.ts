import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartAccessState {
  value: boolean
}

const initialState: CartAccessState = {
  value: false,
}

export const CartAccess = createSlice({
  name: 'cartAccess',
  initialState,
  reducers: {
    setAccess: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAccess } = CartAccess.actions

export default CartAccess.reducer