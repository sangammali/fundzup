import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducerName = "addCustomerSlice";
const initialState = {
	customerDetails: {
		userId: "",
		riskProfile: {},
	},
};

const addCustomerSlice = createSlice({
	name: reducerName,
	initialState,
	reducers: {
		setCustomerUserId: (state, action) => ({
			...state,
			customerDetails: {
				...state.customerDetails,
				userId: action.payload.userId,
			},
		}),
		setCustomerRiskProfile: (state, action) => ({
			...state,
			customerDetails: {
				...state.customerDetails,
				riskProfile: action.payload,
			},
		}),
	},
});

export const addCustomerActions = addCustomerSlice.actions;
export const addCustomerReducers = persistReducer(
	{ key: addCustomerSlice, storage, whitelist: [] },
	addCustomerSlice.reducer
);
