import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModal {
  loginOpened: boolean,
  codeOpened: boolean,
  deleteOpened: boolean,
  deleteType: string,
  phoneLogin: string,
  loginToken: string,
  backLink: string,
  deleteId: number,
}

const initialState: IModal = {
  loginOpened: false,
  codeOpened: false,
  phoneLogin: '',
  loginToken: '',
  deleteOpened: false,
  deleteType: '',
  backLink: '',
  deleteId: 0,

}


export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeLogin(state, action: PayloadAction<boolean>) {
      state.loginOpened = action.payload;
    },
    changeCode(state, action: PayloadAction<boolean>) {
      state.codeOpened = action.payload;
    },
    toggleDelete(state, action: PayloadAction<boolean>) {
      state.deleteOpened = action.payload;

    },
    changeDelete(state, action: PayloadAction<any>) {
      console.log(action.payload)
      state.deleteOpened = action.payload.isOpened;
      state.deleteType = action.payload.type;
      state.backLink = action.payload.backLink;
      state.deleteId = action.payload.id;
      
    },
    changePhone(state, action: PayloadAction<string>) {
      state.phoneLogin = action.payload
    },
    changeToken(state, action: PayloadAction<string>) {
      state.loginToken = action.payload
    },
    changeModal(state, action: PayloadAction<any>) {
      state.loginOpened = action.payload.loginOpened;
      state.codeOpened = action.payload.codeOpened;
      state.loginToken = action.payload.loginToken
    }
  }
})

export default modalSlice.reducer;