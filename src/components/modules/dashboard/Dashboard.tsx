import {
    Sidebar,
    SidebarContent,
    SidebarMenuItem,
    SidebarFooter,
    SidebarProvider,
  } from "@/components/ui/sidebar";
  import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
  import { useGetMeInfoQuery } from "@/redux/features/auth/auth.api";
  import { Button } from "@/components/ui/button";

  
  export const DashboardLayout = () => {
    const { data } = useGetMeInfoQuery(undefined);
    const user = data?.data;
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleLogout = () => {
      navigate("/login");
    };
  
    const sidebarLinks = {
      ADMIN: [
        { name: "Dashboard", path: "/admin-dashboard" },
        { name: "Users", path: "/admin/users" },
        { name: "Rides", path: "/admin/rides" },
        { name: "Analytics", path: "/admin/analytics" },
      ],
      RIDER: [
        { name: "Dashboard", path: "/rider-dashboard" },
        { name: "Request Ride", path: "request" },
        { name: "Ride History", path: "/rider/history" },
      ],
      DRIVER: [
        { name: "Dashboard", path: "/driver-dashboard" },
        { name: "Active Rides", path: "/driver/active" },
        { name: "Earnings", path: "/driver/earnings" },
      ],
    };
  
    const links = user ? sidebarLinks[user.role] || [] : [];
  
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-white dark:bg-black text-neutral-800 dark:text-neutral-200">
          {/* Sidebar */}
          <Sidebar className="w-64 border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
            <SidebarContent className="pt-10 space-y-2">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <SidebarMenuItem key={link.path} asChild>
                    <Link
                      to={link.path}
                      className={`block w-full text-center py-3 rounded-lg transition-colors font-medium
                        ${isActive ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-neutral-100 dark:hover:bg-neutral-900"}`}
                    >
                      {link.name}
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarContent>
  
            <SidebarFooter className="p-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full py-3 rounded-lg text-center font-medium"
              >
                Logout
              </Button>
            </SidebarFooter>
          </Sidebar>
  
        
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    );
  };
  