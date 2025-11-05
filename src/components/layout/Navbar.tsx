

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-black/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
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
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
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
                <Button variant="outline" asChild>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
