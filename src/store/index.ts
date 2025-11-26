import { configureStore, Tuple } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logger } from "redux-logger";
import { encryptTransform } from "redux-persist-transform-encrypt";
import reducers from "./reducers";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const persistConfig = {
  key: "@multazero-root",
  storage,
  whitelist: ["auth"],
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_REDUX_SECRET_KEY!,
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers as any);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: () => new Tuple(logger),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
