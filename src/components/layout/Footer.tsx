import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-800 dark:text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">RideWave</h3>
          <p className="text-sm">
            Simplifying rides for everyone. Reliable, fast, and secure.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/features" className="hover:underline">
                Features
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-lg">
            <Link to="#" aria-label="Facebook" className="hover:text-neutral-500 transition-colors">🌐</Link>
            <Link to="#" aria-label="Twitter" className="hover:text-neutral-500 transition-colors">🐦</Link>
            <Link to="#" aria-label="LinkedIn" className="hover:text-neutral-500 transition-colors">💼</Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 text-center py-4 text-sm">
        © {new Date().getFullYear()} RideWave. All rights reserved.
      </div>
    </footer>
  );
};
