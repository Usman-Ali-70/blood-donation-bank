import React, { useEffect, useState } from "react";
import axiosInstance from "../services/api.js";
import { motion } from "framer-motion";
import { Droplet, Calendar, Phone, MapPin, Heart, LogOut, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/donors/me");
      setDonor(res.data.donor);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    if (!donor) return;
    setUpdating(true);
    try {
      const res = await axiosInstance.put("/donors/update", {
        availability: !donor.availability,
      });
      setDonor(res.data.donor);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update availability");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-8 border-red-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-xl text-gray-700 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchProfile}
            className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Droplet className="w-10 h-10 text-red-600 fill-current" />
              Donor Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back, {donor?.fullName}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 bg-gray-700 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-xl transition shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </div>

        {donor && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h2>
                  <div className={`px-6 py-3 rounded-full text-lg font-bold ${donor.availability ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}>
                    {donor.availability ? "Available to Donate" : "Unavailable"}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-xl">
                      <Droplet className="w-8 h-8 text-red-600 dark:text-red-400 fill-current" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Blood Group</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{donor.bloodGroup}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{donor.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl">
                      <Phone className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Contact</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{donor.phone}</p>
                    </div>
                  </div>

                  {donor.lastDonationDate && (
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                        <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Last Donation</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">
                          {new Date(donor.lastDonationDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl p-8 text-white"
              >
                <Heart className="w-12 h-12 mb-4 opacity-90" fill="currentColor" />
                <h3 className="text-2xl font-bold mb-3">Update Availability</h3>
                <p className="mb-6 opacity-90">
                  {donor.availability
                    ? "You're currently available. Thank you for being ready to save lives!"
                    : "Let others know when you're ready to donate again."}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleAvailability}
                  disabled={updating}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition ${
                    donor.availability
                      ? "bg-white/20 hover:bg-white/30 backdrop-blur"
                      : "bg-red-600 text-red-600 hover:bg-gray-100"
                  } ${updating ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {updating ? "Updating..." : donor.availability ? "Set as Unavailable" : "Set as Available"}
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center border border-gray-200 dark:border-gray-700"
              >
                <div className="text-5xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {donor.availability ? "❤️" : "💤"}
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {donor.availability ? "You're a hero on standby!" : "Resting – come back soon!"}
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;