import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authApi, useGetMeInfoQuery, useLogoutMutation } from "@/redux/features/auth/auth.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch } from "react-redux";


export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation()
  const { data: response} = useGetMeInfoQuery(undefined);
  const navigate = useNavigate()
  // console.log(data);
  
  const user = response?.data;
  console.log("user",user);
  
  console.log(user?.role);
  

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const handleLogout =async ()=>{
    await logout(undefined)
     dispatch(authApi.util.resetApiState())
     navigate("/login")
     
 
 
   }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-black/70 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight">
          Ride<span className="text-neutral-500">Wave</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}

          
          {user && (
            <Link
              to={`/${user?.role?.toLowerCase()}-dashboard`}
              className="text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          )}
        </nav>

      
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Your Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white dark:bg-black">
              <nav className="flex flex-col space-y-4 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="text-neutral-800 dark:text-neutral-200 text-lg font-medium hover:text-black dark:hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}

              
                {user && (
                  <Link
                    to={`/${user.role}-dashboard`}
                    onClick={() => setOpen(false)}
                    className="text-neutral-800 dark:text-neutral-200 text-lg font-medium hover:text-black dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                )}

                {!user ? (
                  <Button variant="outline" asChild>
                    <Link to="/login" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};
