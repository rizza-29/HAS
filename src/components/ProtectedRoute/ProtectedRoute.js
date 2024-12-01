import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isPatientLoggedIn = localStorage.getItem("isPatientLoggedIn") === "true";

  if (!isPatientLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;