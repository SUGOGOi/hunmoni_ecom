import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.scss";
// import Dashboard from "./pages/dashboard/Dashboard";
import AdminLogin from "./pages/login/AdminLogin";
import React, { Suspense, useEffect, useState } from "react";

import { SERVER_URL, useStore } from "./store/store";
import axios from "axios";
import Loading from "./components/loading/Loading";
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));

const App = () => {
  const { isLogin, setIsLogin } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/admin-dashboard",
      element: isLogin ? (
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "/",
      element: isLogin ? (
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      ) : (
        <AdminLogin />
      ),
    },
  ]);

  //<==========================================================LOGIN CHECK================================================================>

  useEffect(() => {
    if (isLogin === null) {
      setIsLoading(true);
      const checkLogin = async () => {
        try {
          const response = await axios.get(
            `${SERVER_URL}/api/admin/auth/login-check`,
            {
              withCredentials: true,
            }
          );

          if (response.data.success === true) {
            console.log(`login : ${response.data.success}`);
            setIsLogin(true);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          setIsLogin(false);
          setIsLoading(false);
        }
      };
      checkLogin();
    } else {
      return;
    }
  }, [setIsLogin, isLogin]);

  return (
    <>
      {isLoading && <Loading />}
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
};

export default App;
