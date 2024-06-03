import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../../models/INotification";


interface NotificationsState {
  notification: INotification | undefined;
}

const initialState: NotificationsState = {
  notification: undefined
}


export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificate(state, action: PayloadAction<INotification>) {
      state.notification = action.payload
    },
  }
})

export default notificationsSlice.reducer;