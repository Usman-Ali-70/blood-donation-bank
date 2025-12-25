import React, { useState } from "react";
import axiosInstance from "../services/api";
import DonorCard from "../components/DonorCard.jsx";
import SearchForm from "../components/SearchForm.jsx";
import Loader from "../components/Loader.jsx";
import { motion } from "framer-motion";
import { AlertCircle, Users, Search as SearchIcon, Phone, MessageCircle } from "lucide-react";

const Search = () => {
  const [city, setCity] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city && !bloodGroup) return;

    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (city) params.append("city", city);
      if (bloodGroup) params.append("bloodGroup", bloodGroup);

      const res = await axiosInstance.get(`/donors/search?${params.toString()}`);
      setDonors(res.data.donors || []);
    } catch (err) {
      setError(err.response?.data?.message || "Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-4">
            <SearchIcon className="w-12 h-12 text-red-600 dark:text-red-400" />
            Find Blood Donors
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Search for available donors by location and blood group
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <SearchForm
            city={city}
            bloodGroup={bloodGroup}
            setCity={setCity}
            setBloodGroup={setBloodGroup}
            onSearch={handleSearch}
          />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader />
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto p-6 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-2xl flex items-center gap-4 text-red-700 dark:text-red-300"
          >
            <AlertCircle className="w-10 h-10 flex-shrink-0" />
            <p className="text-lg">{error}</p>
          </motion.div>
        )}

        {!loading && !error && donors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Users className="w-24 h-24 text-gray-400 dark:text-gray-600 mx-auto mb-6" />
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              No donors found matching your criteria.
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-500 mt-4">
              Try adjusting your search filters or check back later.
            </p>
          </motion.div>
        )}

        {!loading && !error && donors.length > 0 && (
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-10">
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Found {donors.length} available donor{donors.length !== 1 ? "s" : ""}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                Contact them directly for urgent needs
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
              {donors.map((donor, index) => (
                <motion.div
                  key={donor._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DonorCard donor={donor} onToggleAvailability={() => {}} />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10 pt-8 border-t border-gray-300 dark:border-gray-600 text-center">
              <div className="flex items-center justify-center gap-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>Call directly</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Send SMS</span>
                </div>
              </div>
              <p className="text-sm mt-4">
                Please be respectful and contact only in case of genuine need.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Search;