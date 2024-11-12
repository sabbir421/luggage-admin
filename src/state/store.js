// store.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { logInReducer } from "./login/index";
import { signupReducer } from "./signup/index";
import { adminDetailsReducer, adminListReducer } from "./admin";
import { vendorRequestReducer } from "./vendor";
import { UserReducer } from "./User";
import { facilityReducer } from "./facility";
import { withrowRequestReducer } from "./withrow";
import { bookingReducer } from "./order";
import { countryAndCityReducer } from "./countryAndCity";
import { activeVendorReducer } from "./activeVendor";
import { createStorePriceReducer } from "./storePrice";
import { moneyDetailsReducer } from "./moneySlice";
import { storeReducer } from "./storeSlice";
import { offerReducer } from "./offer";
import { categoryReducer } from "./category";
import { companyReducer } from "./company";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userReducher: logInReducer,
  adminSignup: signupReducer,
  adminList: adminListReducer,
  singleAdmin: adminDetailsReducer,
  vendorRequestList: vendorRequestReducer,
  userData: UserReducer,
  facilityList: facilityReducer,
  withrowRequest: withrowRequestReducer,
  orderList: bookingReducer,
  countryCity: countryAndCityReducer,
  activeVendorList: activeVendorReducer,
  storePrice: createStorePriceReducer,
  moneyDetails: moneyDetailsReducer,
  storeReducer: storeReducer,
  offerReducer: offerReducer,
  categoryReducer: categoryReducer,
  companyReducer: companyReducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);
