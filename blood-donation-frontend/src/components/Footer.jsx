import React from "react";
import { Link } from "react-router-dom"; 
import { Heart, Droplet, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-700 to-pink-700 dark:from-gray-900 dark:to-gray-800 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Droplet className="w-8 h-8 fill-current" />
            <h3 className="text-2xl font-bold">Blood Bank</h3>
          </div>
          <p className="text-red-100 dark:text-gray-300">
            Connecting donors with those in need. Every drop counts.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Heart className="w-6 h-6 text-red-300 fill-current animate-pulse" />
            <span className="text-sm">Save lives today</span>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-red-100 dark:text-gray-300">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-white transition">
                Find Donors
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white transition">
                Become a Donor
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-red-100 dark:text-gray-300">
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span>help@bloodbank.org</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <span>+1 (800) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span>Emergency Hotline: 108</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Emergency?</h4>
          <p className="text-red-100 dark:text-gray-300 mb-4">
            In case of urgent blood requirement, call your local emergency services immediately.
          </p>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">Call 108</p>
            <p className="text-sm mt-1">National Emergency Number</p>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-white/20 text-center text-red-100 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Blood Bank Donation System. Made with ❤️ for saving lives.</p>
      </div>
    </footer>
  );
}
