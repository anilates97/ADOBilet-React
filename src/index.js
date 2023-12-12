import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from "./pages/Details";
import PastEvents from "./pages/PastEvents";
import Events from "./pages/Events";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Forms from "./components/SignUp/Forms";
import Tickets from "./pages/Tickets.jsx";
import SuccessBuyTicket from "./pages/SuccessBuyTicket.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import ProtectedRouteAdmin from "./pages/admin/ProtectedRouteAdmin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Forms />,
  },
  {
    path: "/register",
    element: <Forms />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
    path: "/pastevents",
    element: <PastEvents />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/events/:categoryName",
    element: <Events />,
  },

  {
    path: "/event/tickets/:id",
    element: (
      <ProtectedRouteAdmin>
        <Tickets />
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "/event/ticket/success",
    element: <SuccessBuyTicket />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout />
      </ProtectedRouteAdmin>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
