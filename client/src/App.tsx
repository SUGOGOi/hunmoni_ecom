import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import { Toaster } from "react-hot-toast";
import "./App.scss";
import Dashboard from "./pages/dashboard/Dashboard.tsx";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/admin", element: <Dashboard /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
};

export default App;
