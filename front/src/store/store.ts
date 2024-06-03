import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { drimoAPI } from "../services/DrimoService";
import catalogSortReducer from './reducers/admin/CatalogSortSlice'
import managerSortReducer from './reducers/admin/ManagerSortSlice'
import modalReducer from './reducers/client/ModalSlice'
import orderReducer from './reducers/manager/OrderSlice'
import notificationsReducer from './reducers/NotificationsSlice'


const rootReducer = combineReducers({
  catalogSortReducer,
  modalReducer,
  managerSortReducer,
  orderReducer,
  notificationsReducer,
  [drimoAPI.reducerPath]: drimoAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(drimoAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']