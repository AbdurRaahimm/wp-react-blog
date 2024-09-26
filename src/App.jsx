import { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const SinglePost = lazy(() => import("./pages/SinglePost"));
const EditPost = lazy(() => import("./pages/EditPost"));

import ProtectRoute from "./components/ProtectRoute"; 
import PublicRoute from "./components/PublicRoute";


const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProtectRoute> <Home /> </ProtectRoute>} />
        <Route path="post/:id" element={ <ProtectRoute><SinglePost /></ProtectRoute>} />
        <Route path="edit/:id" element={ <ProtectRoute><EditPost /></ProtectRoute> } />
      </Route>
      <Route path="/signin" element={ <PublicRoute><SignIn /></PublicRoute> } />
      <Route path="/signup" element={ <PublicRoute><SignUp /></PublicRoute> } />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </>
  )
)

export default function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <RouterProvider router={routes} />
    </Suspense>
  )
}
