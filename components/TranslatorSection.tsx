"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Target,
    Clock,
    Heart,
    Sparkles,
    Settings,
    MessageCircle,
    Zap,
    Languages,
    Globe,
    CheckCircle,
    Shield
} from "lucide-react";

const TranslatorSection = () => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/sola');
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const iconVariants = {
        idle: { scale: 1, rotate: 0 },
        hover: { scale: 1.05, rotate: 3 }
    };

    // Stats data with Lucide icons
    const stats = [
        { value: "100%", label: "Accuracy", icon: Target, color: "#3B3A36" },
        { value: "24/7", label: "Availability", icon: Clock, color: "#3B3A36" },
        { value: "∞", label: "Empathy", icon: Heart, color: "#3B3A36" }
    ];

    // Features data with Lucide icons
    const features = [
        { name: "Cultural Empathy", icon: Globe, color: "#3B3A36" },
        { name: "Adaptive Tone", icon: Settings, color: "#3B3A36" },
        { name: "Warm Dialogue", icon: MessageCircle, color: "#3B3A36" },
        { name: "Graceful Flow", icon: Zap, color: "#3B3A36" }
    ];

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#F4F1EC] py-16 px-4">
            <motion.div
                className="max-w-5xl w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {/* Header */}
                <motion.div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-light text-[#3B3A36] mb-6 tracking-tight">
                        Precision Translation
                    </h2>
                    <div className="w-20 h-0.5 bg-[#3B3A36] mx-auto mb-6"></div>
                    <p className="text-lg text-[#3B3A36]/70 max-w-2xl mx-auto leading-relaxed">
                        Bridging cultures with empathy and linguistic excellence
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Content - Enhanced Profile Card */}
                    <motion.div >
                        <motion.div
                            className="bg-[#E8E3D9] rounded-3xl p-10 relative overflow-hidden border border-[#3B3A36]/15 shadow-sm"
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                            whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
                        >
                            {/* Enhanced Background Elements */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#3B3A36]"></div>
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#3B3A36]/5 rounded-full"></div>
                            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-[#3B3A36]/5 rounded-full"></div>

                            {/* Enhanced Profile Header */}
                            <div className="flex items-center gap-5 mb-8 relative z-10">
                                <motion.div
                                    className="w-16 h-16 bg-[#3B3A36] rounded-2xl flex items-center justify-center text-[#F4F1EC] font-normal text-2xl border border-[#3B3A36]/20 shadow-md"
                                    variants={iconVariants}
                                    animate={isHovered ? "hover" : "idle"}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <Languages className="w-8 h-8" />
                                </motion.div>
                                <div>
                                    <h3 className="text-2xl font-normal text-[#3B3A36] tracking-tight mb-1">SOLA</h3>
                                    <p className="text-[#3B3A36]/60 text-sm">Thai ↔ English Translator</p>
                                </div>
                            </div>

                            {/* Enhanced Specialization Badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 bg-[#3B3A36] text-[#F4F1EC] px-4 py-2 rounded-full text-sm font-normal mb-8 border border-[#3B3A36] shadow-sm"
                                whileHover={{ scale: 1.03, y: -1 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <CheckCircle className="w-4 h-4" />
                                Central Thai Specialist
                            </motion.div>

                            {/* Enhanced Description */}
                            <motion.p
                                className="text-[#3B3A36]/80 leading-relaxed mb-8 relative z-10 text-base font-light"
                            >
                                A calm, emotionally intelligent translator specializing in Central Thai,
                                combining technical precision with cultural sensitivity to deliver authentic
                                and meaningful translations.
                            </motion.p>

                            {/* Enhanced Features Grid */}
                            <motion.div
                                className="grid grid-cols-2 gap-4 mb-10 relative z-10"
                            >
                                {features.map((feature, index) => {
                                    const IconComponent = feature.icon;
                                    return (
                                        <motion.div
                                            key={feature.name}
                                            className="flex items-center gap-3 text-[#3B3A36]/80 group"
                                            whileHover={{ x: 2 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            <motion.div
                                                className="group-hover:scale-110 transition-transform duration-200"
                                                whileHover={{ rotate: 5 }}
                                            >
                                                <IconComponent
                                                    className="w-5 h-5"
                                                    style={{ color: feature.color }}
                                                />
                                            </motion.div>
                                            <span className="text-sm font-light">{feature.name}</span>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>

                            {/* Enhanced CTA Button */}
                            <motion.button
                                onClick={handleButtonClick}
                                className="w-full bg-[#3B3A36] text-[#F4F1EC] py-4 px-8 rounded-xl font-normal text-base hover:bg-[#3B3A36]/95 transition-all duration-300 relative z-10 border border-[#3B3A36] shadow-md group overflow-hidden"
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Begin Translation Journey
                                    <motion.span
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        →
                                    </motion.span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F4F1EC]/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Enhanced Supporting Elements */}
                    <motion.div
                        className="space-y-8"
                    >
                        {/* Enhanced Process Flow */}
                        <motion.div
                            className="bg-[#E8E3D9] rounded-2xl p-8 border border-[#3B3A36]/15 shadow-sm"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="font-normal text-[#3B3A36] mb-6 text-lg flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Translation Journey
                            </h4>
                            <div className="space-y-5">
                                {[
                                    { step: "Source Understanding", desc: "Deep comprehension of original text" },
                                    { step: "Cultural Adaptation", desc: "Contextual and cultural sensitivity" },
                                    { step: "Linguistic Precision", desc: "Accurate language conversion" },
                                    { step: "Quality Assurance", desc: "Thorough review and refinement" }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.step}
                                        className="flex items-start gap-4 group"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.15 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#3B3A36] text-[#F4F1EC] flex items-center justify-center text-sm font-light border border-[#3B3A36]/20 shadow-sm group-hover:scale-110 transition-transform duration-200">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[#3B3A36] font-light mb-1">{item.step}</div>
                                            <div className="text-[#3B3A36]/60 text-sm">{item.desc}</div>
                                        </div>
                                        <motion.div
                                            className="w-2 h-2 bg-[#3B3A36] rounded-full mt-2"
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.7, 1, 0.7]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: index * 0.4
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Enhanced Stats */}
                        <motion.div
                            className="grid grid-cols-3 gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            {stats.map((stat, index) => {
                                const IconComponent = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.label}
                                        className="text-center p-5 bg-[#E8E3D9] rounded-xl border border-[#3B3A36]/15 shadow-sm hover:shadow-md transition-all duration-300"
                                        whileHover={{ y: -2 }}
                                    >
                                        <motion.div
                                            className="flex justify-center mb-2"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <IconComponent
                                                className="w-6 h-6"
                                                style={{ color: stat.color }}
                                            />
                                        </motion.div>
                                        <motion.div
                                            className="text-2xl font-normal text-[#3B3A36] mb-1"
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 200,
                                                delay: 0.7 + index * 0.1
                                            }}
                                            viewport={{ once: true }}
                                        >
                                            {stat.value}
                                        </motion.div>
                                        <div className="text-[#3B3A36]/60 text-xs font-light">{stat.label}</div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>


                    </motion.div>
                </div>

                {/* Enhanced Bottom Decorative Element */}
                <motion.div
                    className="flex justify-center items-center gap-4 mt-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    viewport={{ once: true }}
                >
                    <div className="w-8 h-0.5 bg-[#3B3A36]"></div>
                    <div className="text-[#3B3A36]/40 text-sm font-light">Translation Excellence</div>
                    <div className="w-8 h-0.5 bg-[#3B3A36]"></div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default TranslatorSection;