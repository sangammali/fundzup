import { combineReducers } from "redux";

import { toastReducers } from "./slices/toastSlice";
import { addCustomerReducers } from "./slices/addCustomerSlice";

// RTK Query API slice
import { todoApiAction, todoApiReducer } from "./apiSlices/todoApiSlice";

import { authApiAction, authApiReducer } from "./apiSlices/authApiSlice";
import {
  PlansApiReducer,
  plansApiAction,
} from "./apiSlices/plans/plansApiSlice";
import {
  FamilyApiReducer,
  familyApiAction,
} from "./apiSlices/familyMembers/familyApiSlice";
import {
  DividendApiReducer,
  dividendApiAction,
} from "./dividend/dividendApiSlice";
import {
  ModelPortFolioApiReducer,
  modelPortFolioApiAction,
} from "./apiSlices/modelPortfolio/modelPortfolio";

import {
  customersApiAction,
  customersApiReducer,
} from "./apiSlices/customers/customersApiSlice";
import {
  dashboardApiAction,
  dashboardApiReducer,
} from "./apiSlices/dashboard/dashboardApiSlice";
import {
  ProfileApiReducer,
  profileApiAction,
} from "./riaProfile/riaProfileSlice";

import {
  addCustomerApiReducer,
  addCustomerApiAction,
} from "./apiSlices/addCustomerApiSlice";
import { commonApiAction, commonApiReducer } from "./apiSlices/commonApiSlice";

const rootReducers = combineReducers({
  toast: toastReducers,
  addCustomerSlice: addCustomerReducers,
  [todoApiAction.reducerPath]: todoApiReducer,
  [authApiAction.reducerPath]: authApiReducer,
  [plansApiAction.reducerPath]: PlansApiReducer,
  [familyApiAction.reducerPath]: FamilyApiReducer,
  [dividendApiAction.reducerPath]: DividendApiReducer,
  [customersApiAction.reducerPath]: customersApiReducer,
  [dividendApiAction.reducerPath]: DividendApiReducer,
  [dashboardApiAction.reducerPath]: dashboardApiReducer,
  [profileApiAction.reducerPath]: ProfileApiReducer,
  [addCustomerApiAction.reducerPath]: addCustomerApiReducer,
  [commonApiAction.reducerPath]: commonApiReducer,
  [modelPortFolioApiAction.reducerPath]: ModelPortFolioApiReducer,
});

export default rootReducers;
