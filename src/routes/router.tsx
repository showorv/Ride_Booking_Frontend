import App from "@/App";
import { Home } from "@/pages/Home";
import { createBrowserRouter } from "react-router";

import { Contact } from "@/pages/Contact";
import { About } from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Verify } from "@/pages/Verify";
import AccountStatus from "@/pages/AccountStatus";

import { lazy } from "react";

import { DashboardLayout } from "@/components/modules/dashboard/Dashboard";
import { ProtectedRoute } from "@/components/modules/authentication/ProtectedRoute";
import { RideRequestForm } from "@/pages/Rider/RideRquest";
import { RideHistory } from "@/pages/Rider/RideHistory";



// const AdminDashboard = lazy(() => import("@/pages/dashboards/AdminDashboard"));
const RiderDashboard = lazy(() => import("@/components/modules/dashboard/RiderDashboard"));
// const DriverDashboard = lazy(() => import("@/pages/dashboards/DriverDashboard"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, 
        children: [
          { index: true, element: <Home /> },      
          { path: "about", element: <About /> },   
          { path: "contact", element: <Contact /> } 
        ],
      },
    


    {
        path:"/login",
        Component: Login
    },
    {
        path:"/register",
        Component: Register
    },
    {
        path:"/verify",
        Component:Verify
    },
    {
        path:"/account-status",
        Component: AccountStatus
    },
    // {
    //     path:"/unauthorized",
    //     Component: Unauthorized
    // },
  
    {
      element: <ProtectedRoute />, 
      children: [
        {
          path: "/rider-dashboard",
          element: <DashboardLayout />,
          children: [
            { index: true, element: <RiderDashboard /> }, 
            { path: "request", element: <RideRequestForm /> },
            { path: "history", element: <RideHistory /> }, 
          ],
        },
        // Similarly for admin and driver dashboards
      ],
    },
])