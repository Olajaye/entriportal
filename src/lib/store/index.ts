import {
  configureStore,
  combineReducers,
  Reducer,
  UnknownAction,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REGISTER,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "../features/api/userApi";
import { tenantApi } from "../features/api/tenantApi";
import tenantReducer from "../slice/tenantSlice";
import userReducer from "../slice/userSlice";
import { estateApi } from "../features/api/estateApi";
import { authApi } from "../features/api/authApi";
import { accessCodeApi } from "../features/api/accessCode";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const combinedReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  [tenantApi.reducerPath]: tenantApi.reducer,
  [estateApi.reducerPath]: estateApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [accessCodeApi.reducerPath]: accessCodeApi.reducer,
  tenant: tenantReducer,
  user: userReducer,
});

const rootReducer: Reducer = (state, action: UnknownAction) => {
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }).concat(
      usersApi.middleware,
      tenantApi.middleware,
      estateApi.middleware,
      authApi.middleware,
      accessCodeApi.middleware
    ),
  enhancers: (gDE) => gDE({ autoBatch: { type: "timer", timeout: 100 } }),
});

export type RootStoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
export const persistor = persistStore(store);
