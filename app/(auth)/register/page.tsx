"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

interface RegisterFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterFormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Register →", form);
      // 🔹 TODO: connect with backend API: /auth/register
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden text-center mb-12"
          >
            <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <span className="text-white font-bold text-3xl">T</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">THAIBK</h1>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8"
          >
            {/* Form Header */}
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl font-bold text-gray-900 mb-2"
              >
                Join THAIBK
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-sm"
              >
                Create your Thailand travel account
              </motion.p>
            </div>

            {/* Divider with Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center my-8"
            >
              <div className="flex-1 h-px bg-gray-300" />
              <span className="px-4 text-sm text-gray-500 font-medium">create with email</span>
              <div className="flex-1 h-px bg-gray-300" />
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      name="firstName"
                      type="text"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className="block w-full pl-11 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/50 focus:border-black outline-none transition-all duration-200 bg-gray-50/50"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      name="lastName"
                      type="text"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className="block w-full pl-11 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/50 focus:border-black outline-none transition-all duration-200 bg-gray-50/50"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your e-mail"
                    className="block w-full pl-11 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/50 focus:border-black outline-none transition-all duration-200 bg-gray-50/50"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="block w-full pl-11 pr-12 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/50 focus:border-black outline-none transition-all duration-200 bg-gray-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="block w-full pl-11 pr-12 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/50 focus:border-black outline-none transition-all duration-200 bg-gray-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Terms Agreement */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex items-start space-x-3"
              >
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-black hover:text-black/70 font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-black hover:text-black/70 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-black to-black text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:from-black/80 hover:to-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 uppercase tracking-wide text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  "CREATE ACCOUNT"
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-8 pt-6 border-t border-gray-200"
            >
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-black hover:text-black/70 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mt-8"
          >
            <p className="text-gray-400 text-xs">
              © 2024 THAIBK. Your trusted Thailand travel companion.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-black to-black/5">
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/30 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl w-full flex flex-col items-center justify-center"
          >
            {/* Main Quote */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold mb-8 leading-tight font-serif text-center"
            >
              BEGIN YOUR THAI ADVENTURE TODAY
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12 flex flex-col items-center"
            >
              <div className="w-24 h-1 bg-white/50 mb-4"></div>
              <p className="text-2xl font-light tracking-widest uppercase text-center">
                JOIN OUR COMMUNITY
              </p>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-6 text-center mb-8"
            >
              {[
                "✓ AI Translation",
                "✓ Travel Guides",
                "✓ Local Tips",
                "✓ Community"
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="text-lg text-white/80"
                >
                  {feature}
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center space-x-2"
            >
              {[1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  className="w-2 h-2 bg-white/60 rounded-full"
                ></div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}