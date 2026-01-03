"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Sparkles, MapPin, Search, Plus } from "lucide-react";
import Link from "next/link";

export default function ClubsPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            {/* Navigation */}
            <nav className="p-6">
                <Link href="/community" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-semibold">Back to Community</span>
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
                        <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                            <Calendar className="w-10 h-10 text-orange-500" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 italic text-gray-900">
                            Local Clubs & Activities
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12">
                            Find your tribe. Join local hobby groups, sports teams, and social circles that share your passions in Thailand.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Hobby Groups",
                            desc: "From culinary classes to photography walks, discover groups for every interest.",
                            icon: Search,
                            color: "text-amber-500",
                            bgColor: "bg-amber-50"
                        },
                        {
                            title: "Sports Teams",
                            desc: "Join local leagues for football, tennis, padel, and Muay Thai training circles.",
                            icon: MapPin,
                            color: "text-orange-500",
                            bgColor: "bg-orange-50"
                        },
                        {
                            title: "Expat Meetups",
                            desc: "Regular social gatherings and networking events for residents and new arrivals.",
                            icon: Plus,
                            color: "text-blue-500",
                            bgColor: "bg-blue-50"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="group bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                        >
                            <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform`}>
                                <item.icon className={`w-8 h-8 ${item.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-400 font-medium leading-relaxed mb-12">{item.desc}</p>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase">
                                CALENDAR COMING SOON
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Professional Callout */}
            <section className="mx-4 mb-20 bg-orange-600 rounded-[4rem] py-24 px-8 text-center text-white overflow-hidden relative shadow-2xl shadow-orange-900/30">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Start your own group.</h2>
                    <p className="text-orange-50 text-lg mb-12 opacity-90">
                        Have a passion you want to share? We help our members organize and promote their own local activities.
                    </p>
                    <button className="px-12 py-6 bg-black text-white rounded-2xl font-bold text-sm hover:bg-gray-900 transition-all shadow-xl">
                        REGISTER A NEW CLUB
                    </button>
                </div>
            </section>
        </div>
    );
}
