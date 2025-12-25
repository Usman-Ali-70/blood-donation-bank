import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setTheme, getTheme } from "../utils/theme";
import { motion } from "framer-motion";
import { Sun, Moon, LogOut, Search, LayoutDashboard, LogIn, UserPlus, Droplet } from "lucide-react";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [theme, setCurrentTheme] = useState(getTheme());

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setCurrentTheme(theme === "dark" ? "light" : "dark");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-pink-600 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="p-2 bg-white/20 rounded-full backdrop-blur"
          >
            <Droplet className="w-7 h-7 text-white fill-current" />
          </motion.div>
          <span className="text-2xl font-bold tracking-tight">Blood Bank</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/search"
            className="flex items-center gap-2 hover:text-pink-200 transition"
          >
            <Search className="w-5 h-5" />
            Search Donors
          </Link>

          {token ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 hover:text-pink-200 transition"
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2 rounded-xl transition backdrop-blur"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 hover:text-pink-200 transition"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2 rounded-xl transition backdrop-blur"
              >
                <UserPlus className="w-5 h-5" />
                Register
              </Link>
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition backdrop-blur"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Link to="/search">
            <Search className="w-6 h-6" />
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 bg-white/10 rounded-full backdrop-blur"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}