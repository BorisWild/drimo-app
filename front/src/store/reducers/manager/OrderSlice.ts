import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../../models/IOrder";

interface OrderState {
  order: IOrder;
}

const initialState: OrderState = {
  order: {
    address: {
      building: '',
      city: '',
      flat: '',
      street: '',
    },
    comment: '',
    created_at: '',
    delivery_method_name: '',
    id: 0,
    payment_method_name: '',
    price: 0,
    solution_id: 0,
    solution_name: '',
    status: '0',
    updated_at: '',
  }
}


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    changeOrder(state, action: PayloadAction<IOrder>) {
      state.order = action.payload;
    },
  }
})

export default orderSlice.reducer;