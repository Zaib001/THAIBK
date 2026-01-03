"use client";

import { motion } from "framer-motion";
import { Briefcase, ArrowLeft, TrendingUp, Sparkles, Wallet, PieChart } from "lucide-react";
import Link from "next/link";

export default function CostPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            {/* Navigation */}
            <nav className="p-6">
                <Link href="/lifestyle" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-semibold">Back to Lifestyle</span>
                </Link>
            </nav>

            {/* Hero */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                            <Briefcase className="w-10 h-10 text-purple-500" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 italic text-gray-900">
                            Cost of Living
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12">
                            Get clear, up-to-date budgeting guides and pricing comparisons for a comfortable life in Thailand.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Monthly Budgets",
                            desc: "Detailed breakdowns for digital nomads, retirees, and families in different cities.",
                            icon: Wallet,
                            color: "text-emerald-500",
                            bgColor: "bg-emerald-50"
                        },
                        {
                            title: "Market Prices",
                            desc: "Current local prices for groceries, rent, transport, and leisure activities.",
                            icon: TrendingUp,
                            color: "text-purple-500",
                            bgColor: "bg-purple-50"
                        },
                        {
                            title: "Price Comparisons",
                            desc: "Compare your home country's costs with Thailand to see your purchasing power.",
                            icon: PieChart,
                            color: "text-blue-500",
                            bgColor: "bg-blue-50"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-3xl hover:shadow-gray-900/[0.03] transition-all duration-500"
                        >
                            <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center mb-10`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-400 font-medium leading-relaxed mb-12">{item.desc}</p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 rounded-xl text-xs font-bold tracking-widest border border-gray-100">
                                <Sparkles className="w-3 h-3" />
                                DASHBOARD COMING SOON
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Professional Callout */}
            <section className="mx-4 mb-20 bg-[#111] rounded-[4rem] py-24 px-8 text-center text-white overflow-hidden relative">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 italic">Ready to optimize your budget?</h2>
                    <p className="text-gray-400 text-lg mb-12">
                        Our premium financial advisors specialize in expat tax, property investment, and long-term financial planning in Thailand.
                    </p>
                    <button className="px-12 py-6 bg-purple-500 text-white rounded-[2rem] font-bold text-sm hover:bg-purple-400 transition-all shadow-2xl shadow-purple-500/20">
                        BOOK A CONSULTATION
                    </button>
                </div>
            </section>
        </div>
    );
}
