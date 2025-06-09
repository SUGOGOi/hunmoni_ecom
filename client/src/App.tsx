import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import { Toaster } from "react-hot-toast";
import "./App.scss";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import AdminLogin from "./pages/admin/login/AdminLogin.tsx";
import AboutPage from "./pages/about/About.tsx";
import ContactPage from "./pages/contact/Contact.tsx";
import ProductSearchPage from "./pages/productsSearch/ProductSearch.tsx";
import ProfilePage from "./pages/profile/Profile.tsx";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/about-us", element: <AboutPage /> },
    { path: "/contact-us", element: <ContactPage /> },
    { path: "/admin-dashboard", element: <Dashboard /> },
    { path: "/admin-login", element: <AdminLogin /> },
    { path: "/search-product", element: <ProductSearchPage /> },
    { path: "/customer-profile", element: <ProfilePage /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
};

export default App;
