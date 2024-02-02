import { Outlet, Navigate } from "react-router-dom";
import LayoutContainer from "containers/LayoutContainer";

const PrivateRoutes = ({ auth }) => {
	return auth.isAuthenticated ? (
		<LayoutContainer>
			<Outlet />
		</LayoutContainer>
	) : (
		<Navigate to="/login" />
	);
};

export default PrivateRoutes;
