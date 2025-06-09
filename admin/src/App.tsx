import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminLogin from "./pages/login/AdminLogin";

const App = () => {
  const router = createBrowserRouter([
    { path: "/admin-dashboard", element: <Dashboard /> },
    { path: "/", element: <AdminLogin /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
};

export default App;
