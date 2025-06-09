import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import { Toaster } from "react-hot-toast";
import "./App.scss";

import AboutPage from "./pages/about/About.tsx";
import ContactPage from "./pages/contact/Contact.tsx";
import ProductSearchPage from "./pages/productsSearch/ProductSearch.tsx";
import ProfilePage from "./pages/profile/Profile.tsx";
import Loading from "./components/loading/Loading.tsx";
import NotFoundPage from "./pages/404Page/404Page.tsx";
import ProductDetailPage from "./pages/product/ProductDetailPage.tsx";
import AuthPage from "./pages/auth/AuthPage.tsx";
import EmailVerificationPage from "./pages/emailVerification/EmailVerification.tsx";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/about-us", element: <AboutPage /> },
    { path: "/contact-us", element: <ContactPage /> },
    { path: "/search-product", element: <ProductSearchPage /> },
    { path: "/customer-profile", element: <ProfilePage /> },
    { path: "/loading", element: <Loading /> },
    { path: "/page-not-found", element: <NotFoundPage /> },
    { path: "/product-detail", element: <ProductDetailPage /> },
    { path: "/auth", element: <AuthPage /> },
    { path: "/email-verification", element: <EmailVerificationPage /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
};

export default App;
