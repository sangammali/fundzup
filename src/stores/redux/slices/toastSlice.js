import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
 
const reducerName = "toast";
const initialState = {
  toast: {
    open: false,
    message: "",
    variant: "",
  },
  auth: {
    isAuthenticated: false,
  },
  breadCrumbData: {
    name: "",
    user_id:'',
    plan_id:'',
    family_id:''
  },
  performanceSection: {
    isInvestmentType: false,
  },
  filterTableData: [],
};
 
const toastSlice = createSlice({
	name: reducerName,
	initialState,
	reducers: {
		setToastData: (state, action) => ({
			...state,
			toast: {
				open: true,
				message: action.payload.message,
				timeout: action.payload.timeout ?? 4000,
			},
		}),
		resetToastData: (state) => ({
			...state,
			toast: {
				...initialState.toast,
			},
		}),
		setAuth: (state, action) => {
			return {
				...state,
				auth: {
					isAuthenticated: action.payload.isAuthenticated,
				},
			};
		},
		logout: (state, action) => {
			return {
				...state,
				auth: {
					isAuthenticated: false,
				},
			};
		},
    setBreadCrumbData: (state, action) => {
      return {
        ...state,
        breadCrumbData:
         {
          name: action.payload.name,
          user_id: action.payload.user_id,
          plan_id: action.payload.plan_id,
          family_id: action.payload.family_id
         },
      };
    },
    setFilterTableData: (state, action) => {
      return {
        ...state,
        filterTableData: action.payload,
      };
    },
	},
});
 
export const toastActions = toastSlice.actions;
export const toastReducers = persistReducer(
	{ key: reducerName, storage, whitelist: [] },
	toastSlice.reducer
);
