"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft, BookOpen, Sparkles, Lock, Users } from "lucide-react";
import Link from "next/link";

export default function VisaOptionsPage() {
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
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                            <ShieldCheck className="w-10 h-10 text-purple-500" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 italic text-gray-900">
                            Visa & Legal Hub
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12">
                            Navigate the complexities of Thai immigration with expert guides on LTR, Elite, Destination Thailand, and more.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Visa Options",
                            desc: "Compare LTR, Elite, Work, Retirement, and the new DTV visa paths.",
                            icon: BookOpen,
                            color: "text-purple-500",
                            bgColor: "bg-purple-50"
                        },
                        {
                            title: "Visa Extensions",
                            desc: "Step-by-step guides on how to handle your 90-day reporting and annual renewals.",
                            icon: Lock,
                            color: "text-amber-500",
                            bgColor: "bg-amber-50"
                        },
                        {
                            title: "Legal Support",
                            desc: "Get connected with trusted immigration lawyers for complex cases and business setups.",
                            icon: Users,
                            color: "text-blue-500",
                            bgColor: "bg-blue-50"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-4xl hover:shadow-purple-500/[0.05] transition-all duration-500"
                        >
                            <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center mb-10`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-400 font-medium leading-relaxed mb-12">{item.desc}</p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 rounded-xl text-xs font-bold tracking-widest uppercase border border-gray-100">
                                <Sparkles className="w-3 h-3" />
                                EXPERT GUIDE COMING SOON
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Professional Callout */}
            <section className="mx-4 mb-20 bg-purple-700 rounded-[4rem] py-24 px-8 text-center text-white overflow-hidden relative shadow-2xl shadow-purple-900/30">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 italic leading-tight text-purple-100">Stop worrying about <br /> your visa status.</h2>
                    <p className="text-purple-200 text-lg mb-12 opacity-90">
                        Our premium legal partners provide end-to-end handling for the Destination Thailand (DTV) and LTR visas.
                    </p>
                    <button className="px-12 py-6 bg-white text-purple-700 rounded-2xl font-bold text-sm hover:bg-purple-50 transition-all shadow-xl">
                        CONTACT A VISA EXPERT
                    </button>
                </div>
            </section>
        </div>
    );
}
