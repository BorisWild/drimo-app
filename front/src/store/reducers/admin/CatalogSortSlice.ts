import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ISort {
  param: string
  order: string
}


const initialState: ISort = {
  param: '',
  order: '',
}

export const catalogSortSlice = createSlice({
  name: 'catalogSort',
  initialState,
  reducers: {
    changeSort(state, action: PayloadAction<ISort>) {
      state.param = action.payload.param;
      state.order = action.payload.order;
    }
  }
})

export default catalogSortSlice.reducer;