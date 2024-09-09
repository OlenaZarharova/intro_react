import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductFormPage from "../pages/ProductFromPage/ProductFormPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SettingsPage from "../pages/Settings/Settings";
import SignUpPage from "../pages/SignupPage/SignupPage";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<ProductsPage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="products/:productId" element={<ProductDetailsPage />} />
      <Route path="me/products" element={<ProductFormPage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>

    <Route path="/account">
      <Route path="register" element={<SignUpPage />} />
      <Route path="login" element={<LoginPage />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </>
);

const router = createBrowserRouter(routes);

export default router;
