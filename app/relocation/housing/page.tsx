"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, ShieldCheck, Sparkles, MapPin, Key } from "lucide-react";
import Link from "next/link";

export default function HousingPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            {/* Navigation */}
            <nav className="p-6">
                <Link href="/relocation" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-semibold">Back to Relocation</span>
                </Link>
            </nav>

            {/* Hero */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                            <Home className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 italic text-gray-900">
                            Housing & Real Estate
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12">
                            From high-rise condos to luxury villas, we provide the insights and services to help you find your perfect home in Thailand.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Rental Assistance",
                            desc: "Don't pay the expat premium. We help you find local-rate rentals in the best buildings.",
                            icon: Key,
                            color: "text-blue-500",
                            bgColor: "bg-blue-50"
                        },
                        {
                            title: "Property Buying",
                            desc: "Essential legal guides and trusted real estate agents for purchasing property in Thailand.",
                            icon: ShieldCheck,
                            color: "text-emerald-500",
                            bgColor: "bg-emerald-50"
                        },
                        {
                            title: "Area Selection",
                            desc: "Compare neighborhood vibes, traffic patterns, and amenities before you commit.",
                            icon: MapPin,
                            color: "text-purple-500",
                            bgColor: "bg-purple-50"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="group bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-3xl transition-all duration-500"
                        >
                            <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                                <item.icon className={`w-8 h-8 ${item.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-400 font-medium leading-relaxed mb-12">{item.desc}</p>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-bold tracking-widest uppercase border border-gray-100">
                                <Sparkles className="w-3 h-3" />
                                LISTINGS COMING SOON
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Professional Callout */}
            <section className="mx-4 mb-20 bg-emerald-600 rounded-[4rem] py-24 px-8 text-center text-white overflow-hidden relative shadow-2xl shadow-emerald-900/30">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Finding a home <br /> shouldn’t be a hassle.</h2>
                    <p className="text-emerald-50 text-lg mb-12 opacity-90">
                        Our independent property advisors represent *you*, not the landlords. Get impartial advice and the best deals.
                    </p>
                    <button className="px-12 py-6 bg-white text-emerald-600 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all shadow-xl">
                        CONSULT WITH AN ADVISOR
                    </button>
                </div>
            </section>
        </div>
    );
}
