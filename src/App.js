import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import WelcomePage from "./pages/WelcomePage";
import DetectPage from "./pages/DetectPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

const App = () => {
  const { isAuthenticated, isRegistered, user } = useSelector(
    (state) => state.auth
  );

  const PrivateRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/auth/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate
                to={user && user.role === "invigilator" ? "/dashboard" : "/"}
              />
            )
          }
        />

        <Route
          path="/auth/register"
          element={
            !isRegistered ? (
              <RegisterPage />
            ) : (
              <Navigate
                to={user && user.role === "invigilator" ? "/auth/login" : "/"}
              />
            )
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              {user && user.role === "examinee" ? (
                <WelcomePage />
              ) : (
                <Navigate to="/dashboard" />
              )}
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {user && user.role === "invigilator" ? (
                <DashboardPage />
              ) : (
                <Navigate to="/" />
              )}
            </PrivateRoute>
          }
        />

        <Route
          path="/detect"
          element={
            <PrivateRoute>
              <DetectPage />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <PrivateRoute>
              <Navigate
                to={user && user.role === "invigilator" ? "/dashboard" : "/"}
              />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
