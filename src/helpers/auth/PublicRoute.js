import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = ({ auth }) => {
	return auth.isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;
