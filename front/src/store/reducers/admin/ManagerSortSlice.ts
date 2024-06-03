import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ISort {
  param: string
  order: string
}


const initialState: ISort = {
  param: '',
  order: '',
}

export const managerSortSlice = createSlice({
  name: 'managerSort',
  initialState,
  reducers: {
    changeManagerSort(state, action: PayloadAction<ISort>) {
      state.param = action.payload.param
      state.order = action.payload.order
    }
  }
})

export default managerSortSlice.reducer;