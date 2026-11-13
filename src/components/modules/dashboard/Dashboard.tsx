import { useState, type ComponentType } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Activity,
  Car,
  CarFront,
  ChevronsLeft,
  ChevronsRight,
  History,
  Home,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Route,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { authApi, useGetMeInfoQuery, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";

type UserRole = "SUPERADMIN" | "RIDER" | "DRIVER";

interface NavItem {
  name: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
  end?: boolean;
}

const sidebarLinks: Record<UserRole, NavItem[]> = {
  SUPERADMIN: [
    { name: "Overview", path: "/superadmin-dashboard", icon: LayoutDashboard, end: true },
    { name: "Users", path: "/superadmin-dashboard/users", icon: Users },
    { name: "Drivers", path: "/superadmin-dashboard/drivers", icon: CarFront },
    { name: "Ride Oversight", path: "/superadmin-dashboard/rides", icon: ShieldCheck },
  ],
  RIDER: [
    { name: "Overview", path: "/rider-dashboard", icon: LayoutDashboard, end: true },
    { name: "Request Ride", path: "/rider-dashboard/request", icon: MapPin },
    { name: "Ride History", path: "/rider-dashboard/history", icon: History },
  ],
  DRIVER: [
    { name: "Overview", path: "/driver-dashboard", icon: LayoutDashboard, end: true },
    { name: "Available Rides", path: "/driver-dashboard/rides", icon: Route },
    { name: "Active Ride", path: "/driver-dashboard/active-ride", icon: Activity },
    { name: "Ride History", path: "/driver-dashboard/ride-history", icon: History },
  ],
};

const roleLabel: Record<UserRole, string> = {
  SUPERADMIN: "Administrator",
  RIDER: "Rider",
  DRIVER: "Driver",
};

const Logo = ({ collapsed = false }: { collapsed?: boolean }) => (
  <Link to="/" className="flex items-center gap-2.5 min-w-0">
    <span className="grid place-items-center size-9 shrink-0 rounded-xl bg-black text-white dark:bg-white dark:text-black">
      <Car className="size-5" />
    </span>
    {!collapsed && (
      <span className="text-lg font-bold tracking-tight truncate">
        Ride<span className="text-neutral-500">Wave</span>
      </span>
    )}
  </Link>
);

interface SidebarBodyProps {
  links: NavItem[];
  collapsed?: boolean;
  onNavigate?: () => void;
  onLogout: () => void;
  user?: { name?: string; email?: string; profile?: string; role?: UserRole };
}

const SidebarBody = ({ links, collapsed = false, onNavigate, onLogout, user }: SidebarBodyProps) => (
  <div className="flex h-full flex-col">
    <div className={cn("flex h-16 items-center border-b border-neutral-200 dark:border-neutral-800", collapsed ? "justify-center px-2" : "px-5")}>
      <Logo collapsed={collapsed} />
    </div>

    <nav className="flex-1 overflow-y-auto px-3 py-5">
      {!collapsed && (
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
          Menu
        </p>
      )}
      <ul className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.end}
                onClick={onNavigate}
                title={collapsed ? link.name : undefined}
                className={({ isActive }) =>
                  cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "bg-black text-white shadow-sm dark:bg-white dark:text-black"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
                  )
                }
              >
                <Icon className="size-[18px] shrink-0" />
                {!collapsed && <span className="truncate">{link.name}</span>}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {!collapsed && (
        <p className="px-3 pb-2 pt-6 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
          General
        </p>
      )}
      {collapsed && <div className="my-4 border-t border-neutral-200 dark:border-neutral-800" />}
      <ul className="space-y-1">
        {[
          { name: "Back to Home", path: "/", icon: Home },
          { name: "My Profile", path: "/profile", icon: User },
        ].map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={onNavigate}
                title={collapsed ? link.name : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 transition-all hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white",
                  collapsed && "justify-center px-0"
                )}
              >
                <Icon className="size-[18px] shrink-0" />
                {!collapsed && <span>{link.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>

    <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
      {!collapsed ? (
        <div className="flex items-center gap-3 rounded-xl bg-neutral-50 p-3 dark:bg-neutral-900">
          <Avatar className="size-9">
            <AvatarImage src={user?.profile} alt={user?.name} />
            <AvatarFallback className="bg-black text-white dark:bg-white dark:text-black text-sm">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user?.name || "User"}</p>
            <p className="truncate text-xs text-neutral-500">{user?.role ? roleLabel[user.role] : ""}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="size-8 shrink-0 text-neutral-500 hover:text-red-500"
            aria-label="Logout"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={onLogout}
          className="mx-auto flex text-neutral-500 hover:text-red-500"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut className="size-4" />
        </Button>
      )}
    </div>
  </div>
);

export const DashboardLayout = () => {
  const { data } = useGetMeInfoQuery(undefined);
  const user = data?.data?.user as
    | { name?: string; email?: string; profile?: string; role?: UserRole }
    | undefined;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    setMobileOpen(false);
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    navigate("/login");
  };

  const links = user?.role ? sidebarLinks[user.role] ?? [] : [];

  const current =
    [...links]
      .sort((a, b) => b.path.length - a.path.length)
      .find((l) => (l.end ? location.pathname === l.path : location.pathname.startsWith(l.path))) ?? null;
  const pageTitle = current?.name ?? (location.pathname.includes("/ride/") ? "Ride Details" : "Dashboard");

  return (
    <div className="min-h-screen w-full bg-neutral-50 text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-neutral-200 bg-white transition-[width] duration-300 dark:border-neutral-800 dark:bg-black lg:block",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <SidebarBody links={links} collapsed={collapsed} onLogout={handleLogout} user={user} />
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-20 grid size-6 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-colors hover:text-black dark:border-neutral-800 dark:bg-black dark:hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight className="size-3.5" /> : <ChevronsLeft className="size-3.5" />}
        </button>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-white dark:bg-black [&>button]:top-5">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarBody
            links={links}
            onNavigate={() => setMobileOpen(false)}
            onLogout={handleLogout}
            user={user}
          />
        </SheetContent>
      </Sheet>

      <div className={cn("flex min-h-screen flex-col transition-[padding] duration-300", collapsed ? "lg:pl-20" : "lg:pl-64")}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-neutral-200 bg-white/80 px-4 backdrop-blur-md dark:border-neutral-800 dark:bg-black/80 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>

          <div className="min-w-0 flex-1">
            <p className="hidden text-xs text-neutral-500 sm:block">
              {user?.role ? roleLabel[user.role] : "Dashboard"} / {pageTitle}
            </p>
            <h1 className="truncate text-base font-semibold sm:text-lg">{pageTitle}</h1>
          </div>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-neutral-400">
                <Avatar className="size-9 cursor-pointer border border-neutral-200 dark:border-neutral-800">
                  <AvatarImage src={user?.profile} alt={user?.name} />
                  <AvatarFallback className="bg-black text-white dark:bg-white dark:text-black text-sm">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-black">
              <DropdownMenuLabel className="font-normal">
                <p className="truncate text-sm font-semibold">{user?.name}</p>
                <p className="truncate text-xs text-neutral-500">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <User className="size-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/">
                  <Home className="size-4" /> Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                <LogOut className="size-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      {links.length > 0 && (
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-black/90 lg:hidden">
          <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.path} className="flex-1">
                  <NavLink
                    to={link.path}
                    end={link.end}
                    className={({ isActive }) =>
                      cn(
                        "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                        isActive ? "text-black dark:text-white" : "text-neutral-400"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={cn(
                            "grid h-7 w-12 place-items-center rounded-full transition-colors",
                            isActive && "bg-black text-white dark:bg-white dark:text-black"
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="truncate max-w-[72px]">{link.name}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
};
