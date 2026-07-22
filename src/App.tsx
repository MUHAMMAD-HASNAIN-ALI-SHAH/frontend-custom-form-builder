import { Navigate, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { Route } from "react-router-dom"
import useAuthStore from "./store/useAuthStore";
import Loader from "./components/Loader";
import { useEffect } from "react";

function App() {

  const { verify, isAuthenticatedLoading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticatedLoading ? <Loader /> : isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticatedLoading ? <Loader /> : !isAuthenticated ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
