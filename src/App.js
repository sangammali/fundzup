// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoutes from "helpers/auth/PrivateRoute";
import PublicRoutes from "helpers/auth/PublicRoute";
import PrimaryTheme from "theme/primaryTheme";
import RiskProfile from "pages/RiskProfile";
import DashBoardCardPages from "pages/Dashboard";
import DividendContainer from "containers/Dividend/DividendContainer";
import AddCustomer from "pages/AddCustomer";
import Trades from "pages/Trades";
import CustomerDetailPage from "customers/CustomerDetailPage";
import InvestmentType from "customers/InvestmentType";
import Customers from "pages/Customer";
import PlansDetailPage from "pages/plansPage/PlansDetailPage";
import CreateNewPlansPage from "pages/plansPage/CreateNewPlansPage";
import FamilyMembers from "pages/FamilyMembers";
import Profile from "pages/Profile";
// import Login from "pages/Login";
import CustomerLogin from "pages/Customer/CustomerLogin";
import CustomerSignUp from "pages/Customer/CustomerSignUp";
import CustomerRiskAssesment from "pages/Customer/CustomerRiskAssesment";
import CustomerDashboard from "pages/Customer/CustomerDashboard";
import CustomerPortfolio from "pages/Customer/CustomerPortfolio";
import CustomerReports from "pages/Customer/CustomerReports";
import CustomerProfile from "pages/Customer/CustomerProfile";
import LoginPage from "pages/LoginPage";
import Reports from "pages/Reports";
import Snackbar from "components/common/Snackbar";
import { toastActions } from "stores/redux/slices/toastSlice";

function App() {
  const auth = useSelector((state) => state.toast.auth);
  const toastData = useSelector((state) => state?.toast.toast);
  console.log("toastData : ", toastData);
  const dispatch = useDispatch();

  return (
    <>
      <Snackbar
        open={toastData?.open}
        onClose={() =>
          toastData.open && dispatch(toastActions.resetToastData())
        }
        message={toastData?.message}
        autoHideDuration={toastData?.timeout}
      />
      <PrimaryTheme>
        <Routes>
          <Route element={<PrivateRoutes auth={auth} />}>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route element={<DashBoardCardPages />} path="/dashboard" />
            <Route element={<AddCustomer />} path="/add-customer" />
            <Route element={<Customers />} path="/customers" />
            <Route element={<Trades />} path="/trades" />
            <Route element={<Reports />} path="/reports" />
            <Route element={<CustomerDetailPage />} path="/customer-detail" />
            <Route element={<InvestmentType />} path="/investment-summary" />
            <Route element={<RiskProfile />} path="/risk-profile" />
            <Route element={<PlansDetailPage />} path="/plans" />
            <Route element={<CreateNewPlansPage />} path="/newplans" />
            <Route element={<DividendContainer />} path="/dividend" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<FamilyMembers />} path="/family-members" />
          </Route>
          <Route element={<PublicRoutes auth={auth} />}>
            <Route element={<LoginPage />} path="/login" />
          </Route>
        </Routes>
      </PrimaryTheme>
    </>
  );
}

export default App;
