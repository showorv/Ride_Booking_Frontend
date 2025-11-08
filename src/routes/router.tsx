import App from "@/App";
import { Home } from "@/pages/Home";
import { createBrowserRouter } from "react-router";



import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Verify } from "@/pages/Verify";
import AccountStatus from "@/pages/AccountStatus";

import { lazy } from "react";

import { DashboardLayout } from "@/components/modules/dashboard/Dashboard";
import { ProtectedRoute } from "@/components/modules/authentication/ProtectedRoute";
import { RideRequestForm } from "@/pages/Rider/RideRquest";
import { RideHistory } from "@/pages/Rider/RideHistory";
import { RideDetails } from "@/pages/Rider/RideDetails";
import { Profile } from "@/pages/user/Profile";
import { DriverDashboard } from "@/components/modules/dashboard/DriverDashboard";
import { AvailableRides } from "@/pages/driver/Ride";
import { ActiveRide } from "@/pages/driver/ActiveRide";
import { DriverRideHistory } from "@/pages/driver/RideHistory";
import { AdminDashboard } from "@/components/modules/dashboard/AdminDashboard";
import { UserManagement } from "@/pages/Admin/User";
import { DriverManagement } from "@/pages/Admin/Driver";
import { RideOversight } from "@/pages/Admin/Rides";
import { AboutPage } from "@/pages/About";
import { FeaturesPage } from "@/pages/Feature";
import { FAQPage } from "@/pages/FAQ";
import BeADriverPage from "@/pages/user/BecomeDriver";
import ContactPage from "@/pages/Contact";
import RiderDashboard from "@/components/modules/dashboard/RiderDashboard";



// const AdminDashboard = lazy(() => import("@/pages/dashboards/AdminDashboard"));
// const RiderDashboard = lazy(() => import("@/components/modules/dashboard/RiderDashboard"));
// const DriverDashboard = lazy(() => import("@/pages/dashboards/DriverDashboard"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, 
        children: [
          { index: true, element: <Home /> },      
          { path: "about", element: <AboutPage /> },   
          { path: "contact", element: <ContactPage /> } ,
          { path: "feature", element: <FeaturesPage /> } ,
          { path: "faq", element: <FAQPage /> } 
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
    {
        path:"/profile",
        Component: Profile
    },
    {
        path:"/become-driver",
        Component: BeADriverPage
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
            { path: "ride/:id", element: <RideDetails /> }, 

          ],
        },
        {
          path: "/driver-dashboard",
          element: <DashboardLayout />,
          children: [
            { index: true, element: <DriverDashboard /> }, 
            { path: "rides", element: <AvailableRides /> },
            { path: "active-ride", element: <ActiveRide /> },
            { path: "ride-history", element: <DriverRideHistory /> },
            

          ],
        },

        {
          path: "/superadmin-dashboard",
          element: <DashboardLayout />,
          children: [
            { index: true, element: <AdminDashboard /> }, 
            { path: "users", element: <UserManagement /> },
            { path: "drivers", element: <DriverManagement /> },
            { path: "rides", element: <RideOversight /> },
           
            

          ],
        },
       
      ],
    },
])