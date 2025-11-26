"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

interface LoginFormState {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [form, setForm] = useState<LoginFormState>({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("Login →", form);
            // 🔹 TODO: connect with backend API: /auth/login
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-[#F4F1EC] to-[#E8E3D9]">
            {/* Left Side - Image Section */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#3B3A36] to-[#2A2722]">
                <div className="absolute inset-0 bg-[#3B3A36]/20"></div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E8E3D9] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B3A36] rounded-full blur-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center text-[#E8E3D9] p-12 w-full">
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
                            TRAVEL IS THE ONLY THING YOU BUY THAT MAKES YOU RICHER
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mb-12 flex flex-col items-center"
                        >
                            <div className="w-32 h-1 bg-[#E8E3D9]/40 mb-4 rounded-full"></div>
                            <p className="text-xl font-light tracking-widest uppercase text-center text-[#E8E3D9]/80">
                                Your Thailand Journey Begins Here
                            </p>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="grid grid-cols-2 gap-6 text-center"
                        >
                            {[
                                "✓ AI Translation",
                                "✓ Local Guides",
                                "✓ Cultural Tips",
                                "✓ Community"
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                                    className="text-lg text-[#E8E3D9]/80 font-medium"
                                >
                                    {feature}
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 lg:w-1/2">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:hidden text-center mb-12"
                    >
                        <div className="w-20 h-20 bg-[#3B3A36] rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                            <span className="text-[#E8E3D9] font-bold text-3xl">T</span>
                        </div>
                        <h1 className="text-3xl font-bold text-[#3B3A36] font-serif">THAIBK</h1>
                    </motion.div>

                    {/* Form Container */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl p-8 shadow-2xl border border-[#E8E3D9]"
                    >
                        {/* Form Header */}
                        <div className="text-center mb-8">
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-3xl font-bold text-[#3B3A36] mb-3 font-serif"
                            >
                                Welcome Back
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#3B3A36]/70 text-lg"
                            >
                                Sign in to continue your journey
                            </motion.p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <label className="block text-sm font-semibold text-[#3B3A36] mb-3 uppercase tracking-wide">
                                    E-mail
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3B3A36]/50 w-5 h-5" />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter your e-mail"
                                        className="block w-full pl-12 pr-4 py-4 border-2 border-[#E8E3D9] rounded-xl focus:ring-2 focus:ring-[#3B3A36]/20 focus:border-[#3B3A36] outline-none transition-all duration-300 bg-white hover:border-[#3B3A36]/30"
                                    />
                                </div>
                            </motion.div>

                            {/* Password Field */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <label className="block text-sm font-semibold text-[#3B3A36] mb-3 uppercase tracking-wide">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3B3A36]/50 w-5 h-5" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="block w-full pl-12 pr-12 py-4 border-2 border-[#E8E3D9] rounded-xl focus:ring-2 focus:ring-[#3B3A36]/20 focus:border-[#3B3A36] outline-none transition-all duration-300 bg-white hover:border-[#3B3A36]/30"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#3B3A36]/50 hover:text-[#3B3A36] transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </motion.div>

                            {/* Forgot Password */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="text-right"
                            >
                                <Link
                                    href="/auth/reset"
                                    className="text-sm text-[#3B3A36] hover:text-[#3B3A36]/70 font-semibold transition-colors"
                                >
                                    Forgot Your Password?
                                </Link>
                            </motion.div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600 text-sm text-center font-medium"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 px-6 bg-[#3B3A36] text-[#E8E3D9] font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#3B3A36]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wide text-lg font-serif"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-6 h-6 border-2 border-[#E8E3D9]/30 border-t-[#E8E3D9] rounded-full animate-spin" />
                                        Signing In...
                                    </div>
                                ) : (
                                    "Enter Journey"
                                )}
                            </motion.button>
                        </form>

                        {/* Sign Up Link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="text-center mt-8 pt-6 border-t border-[#E8E3D9]"
                        >
                            <p className="text-[#3B3A36]/70 text-sm">
                                New to THAIBK?{" "}
                                <Link
                                    href="/register"
                                    className="font-bold text-[#3B3A36] hover:text-[#3B3A36]/70 transition-colors"
                                >
                                    Start Your Adventure
                                </Link>
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-center mt-8"
                    >
                        <p className="text-[#3B3A36]/50 text-sm">
                            © 2024 THAIBK. Your trusted Thailand travel companion.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}