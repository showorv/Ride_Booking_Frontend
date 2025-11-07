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
  import { Menu } from "lucide-react";
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
  import { useState } from "react";
  
  export const DashboardLayout = () => {
    const { data } = useGetMeInfoQuery(undefined);
    const user = data?.data;
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
  
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
        { name: "Ride History", path: "history" },
        
      ],
      DRIVER: [
        { name: "Dashboard", path: "/driver-dashboard" },
        { name: "Available Ride", path: "rides" },
        { name: "Active Ride Control", path: "active-ride" },
        { name: "Ride History", path: "ride-history" },
      ],
    };
  
    const links = user ? sidebarLinks[user.role] || [] : [];
  
    return (
      <SidebarProvider>
        <div className="w-full flex min-h-screen bg-white dark:bg-black text-neutral-800 dark:text-neutral-200">
          {/* Desktop Sidebar */}
          <Sidebar className="hidden md:flex w-64 border-r border-neutral-200 dark:border-neutral-800 flex-col justify-between">
            <SidebarContent className="pt-10 space-y-2">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <SidebarMenuItem key={link.path} asChild>
                    <Link
                      to={link.path}
                      className={`block w-full text-center py-3 rounded-lg transition-colors font-medium
                        ${isActive
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        }`}
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
  
          {/* Mobile Sidebar Sheet */}
          <div className="md:hidden fixed top-4 left-4 z-50">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
  
              <SheetContent
                side="left"
                className="p-0 w-64 bg-white dark:bg-black flex flex-col justify-between h-full"
              >
                <div className="pt-10 space-y-2">
                  {links.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setOpen(false)}
                        className={`block w-full text-center py-3 rounded-lg font-medium transition-colors
                          ${isActive
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
                          }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
  
                <div className="p-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full py-3 rounded-lg text-center font-medium"
                  >
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
  
          <main className="flex-1 p-6 min-h-screen bg-white dark:bg-black">
  <div className="w-full flex justify-center">
    <div className="w-full max-w-2xl">
      <Outlet />
    </div>
  </div>
</main>



        </div>
      </SidebarProvider>
    );
  };
  