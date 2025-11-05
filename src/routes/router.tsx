import App from "@/App";
import { Home } from "@/pages/Home";
import { createBrowserRouter } from "react-router";

import { Contact } from "@/pages/Contact";
import { About } from "@/pages/About";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // ✅ use element here
        children: [
          { index: true, element: <Home /> },      // ✅ use element
          { path: "about", element: <About /> },   // ✅ relative path
          { path: "contact", element: <Contact /> } // ✅ relative path
        ],
      },
    
    // {
    //     path: "/admin",
    //     Component: AuthCheck(DashboardLayout, [IRole.SUPER_ADMIN, IRole.ADMIN]) ,
    //     children: [
    //         { index: true, element: <Navigate to="/admin/analaytics"/>}, // for default in admin dashboard
    //         ...generateSidebarRoutes(AdminSidebar)
    //     ]
    // },
    // {
    //     path: "/user",
    //     Component: AuthCheck(DashboardLayout, IRole.USER) ,
    //     children: [
    //         { index: true, element: <Navigate to="/user/booking"/>}, // for default in user dashboard

    //         ...generateSidebarRoutes(UserSidebar)
    //     ]
    // },

    // {
    //     path:"/login",
    //     Component: Login
    // },
    // {
    //     path:"/register",
    //     Component:Register
    // },
    // {
    //     path:"/verify",
    //     Component:Verify
    // },
    // {
    //     path:"/unauthorized",
    //     Component: Unauthorized
    // },
  

])