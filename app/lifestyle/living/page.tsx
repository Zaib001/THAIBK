"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, ShieldCheck, Sparkles, MapPin, Search } from "lucide-react";
import Link from "next/link";

export default function LivingPage() {
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-8">
                            <Home className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 italic text-gray-900">
                            Living in Thailand
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12">
                            From finding the perfect neighborhood to navigating daily life, your comprehensive guide to settling into the Land of Smiles.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Sections - Coming Soon Style */}
            <section className="pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Neighborhood Guides",
                            desc: "Deep dives into the best districts for expats in Bangkok, Chiang Mai, and Phuket.",
                            icon: MapPin,
                            color: "text-blue-500",
                            bgColor: "bg-blue-50"
                        },
                        {
                            title: "Daily Essentials",
                            desc: "Everything you need to know about utilities, banking, and shopping like a local.",
                            icon: Search,
                            color: "text-amber-500",
                            bgColor: "bg-amber-50"
                        },
                        {
                            title: "Safety & Services",
                            desc: "Trusted contacts and essential safety tips for a worry-free life in Thailand.",
                            icon: ShieldCheck,
                            color: "text-purple-500",
                            bgColor: "bg-purple-50"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center mb-8`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed mb-8">{item.desc}</p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 rounded-xl text-xs font-bold tracking-widest">
                                <Sparkles className="w-3 h-3" />
                                PREMIUM CONTENT COMING SOON
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Professional Callout */}
            <section className="mx-4 mb-20">
                <div className="max-w-7xl mx-auto bg-black rounded-[3rem] p-16 text-center text-white">
                    <h2 className="text-4xl font-serif font-bold mb-8">Need help moving?</h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                        Our expert relocation team provides personalized neighborhood tours and housing assistance to get you settled fast.
                    </p>
                    <button className="px-10 py-5 bg-emerald-500 text-black rounded-2xl font-bold text-sm hover:bg-emerald-400 transition-all">
                        WORK WITH AN AGENT
                    </button>
                </div>
            </section>
        </div>
    );
}
