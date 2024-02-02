import ProfileContainer from "containers/Profile/ProfileContainer";
import ErrorBoundary from "components/ErrorBoundary";

const Profile = () => {
	return (
		<ErrorBoundary>
			<ProfileContainer />
		</ErrorBoundary>
	);
};

export default Profile;
