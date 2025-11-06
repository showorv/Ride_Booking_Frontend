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
import { RideRquest } from "@/pages/Rider/RideRquest";
import { DashboardLayout } from "@/components/modules/dashboard/Dashboard";


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
      // element: <ProtectedRoute />, // protect all dashboard pages
      children: [
        {
          path: "/rider-dashboard",
          element: <DashboardLayout />,
          children: [
            { index: true, element: <RiderDashboard /> }, // /rider-dashboard default page
            { path: "request", element: <RideRquest /> }, // /rider-dashboard/request
            // { path: "history", element: <RideHistory /> }, // /rider-dashboard/history
          ],
        },
        // Similarly for admin and driver dashboards
      ],
    },
])