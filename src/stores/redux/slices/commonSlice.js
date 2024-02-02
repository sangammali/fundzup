import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducerName = "common";
const initialState = {
	auth: {
		isAuthenticated: false,
	},
};

const commonSlice = createSlice({
	name: reducerName,
	initialState,
	reducers: {
		setAuth: (state, action) => {
			console.log("common slice called",action)
			return {
				...state,
				auth: {
					isAuthenticated: action.payload.isAuthenticated,
				},
			};
		},
	},
});

export const commonActions = commonSlice.actions;
export const commonReducers = persistReducer(
	{ key: reducerName, storage, whitelist: [] },
	commonSlice.reducer
);
