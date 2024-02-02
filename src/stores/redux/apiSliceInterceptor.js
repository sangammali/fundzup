// Import necessary functions and modules
import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { appConstants } from "helpers/constants/appConstants";
import { localStore } from "stores/localStore";
import { toastActions } from "./slices/toastSlice";

// Create an object named apiSliceInterceptor
const apiSliceInterceptor = {};

// Configure the base query for API requests
apiSliceInterceptor.baseQuery = fetchBaseQuery({
	baseUrl: appConstants.apiBaseURL,
	prepareHeaders: (headers) => {
		const token = localStore.getToken();
		if (token) {
			headers.set("Authorization", `${token}`);
		}
		return headers;
	},
});

apiSliceInterceptor.baseQueryWithRetry = retry(apiSliceInterceptor.baseQueryWithInterceptor, {
	maxRetries: 3,
});

apiSliceInterceptor.baseQueryWithInterceptor = async (args, api, extraOptions) => {
	try {
		const result = await apiSliceInterceptor.baseQuery(args, api, extraOptions);

		if (result.error) {
			let toastMessage = "Oops, Something went wrong. Please try again later";

			if (result.error.status === 401) {
				api.dispatch(toastActions.logout());
			}

			if (result.error?.data?.message) {
				toastMessage = result.error.data.message;
			}

			api.dispatch(
				toastActions.setToastData({
					message: toastMessage,
				})
			);
		}

		console.log("result", result);
		return result;
	} catch (error) {
		console.log("error ============", error);
		// let toastMessage = "Oops, Something went wrong. Please try again later";

		// 	if (result.error.status === 401) {
		// 		api.dispatch(toastActions.logout());
		// 	}

		// 	if (result.error?.data?.message) {
		// 		toastMessage = result.error.data.message;
		// 	}

		// 	api.dispatch(
		// 		toastActions.setToastData({
		// 			message: toastMessage,
		// 			variant: "error",
		// 		})
		// 	);
		toastActions.setToastData({
			message: "Oops, Something went wrong. Please try again later",
		});
		return error;
	}
};

// Export the configured apiSliceInterceptor object
export { apiSliceInterceptor };
