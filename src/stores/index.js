
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import rootReducers from "./redux/rootReducer";
import { todoApiAction } from "./redux/apiSlices/todoApiSlice";
import { authApiAction } from "./redux/apiSlices/authApiSlice";
import { plansApiAction } from "./redux/apiSlices/plans/plansApiSlice";
import { modelPortFolioApiAction } from "./redux/apiSlices/modelPortfolio/modelPortfolio";
import { familyApiAction } from "./redux/apiSlices/familyMembers/familyApiSlice";
import { addCustomerApiAction } from "./redux/apiSlices/addCustomerApiSlice";
import { commonApiAction } from "./redux/apiSlices/commonApiSlice";
import { dividendApiAction } from "./redux/dividend/dividendApiSlice";
import { customersApiAction } from "./redux/apiSlices/customers/customersApiSlice";
import { dashboardApiAction } from "./redux/apiSlices/dashboard/dashboardApiSlice";
import { profileApiAction } from "./redux/riaProfile/riaProfileSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      todoApiAction.middleware,
      authApiAction.middleware,
      plansApiAction.middleware,
      familyApiAction.middleware,
      customersApiAction.middleware,
      dividendApiAction.middleware,
      dashboardApiAction.middleware,
      profileApiAction.middleware,
      modelPortFolioApiAction.middleware,
      addCustomerApiAction.middleware,
			commonApiAction.middleware,
    ]),
});

export const persistor = persistStore(store);