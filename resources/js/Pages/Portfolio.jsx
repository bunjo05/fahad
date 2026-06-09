import GuestLayout from "@/Layouts/GuestLayout";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio({ portfolios = [] }) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // ✅ GET UNIQUE CATEGORIES FROM DB
    const categories = useMemo(() => {
        const dbCategories = portfolios.map((p) => p.category).filter(Boolean);

        return ["All", ...new Set(dbCategories)];
    }, [portfolios]);

    // ✅ FILTER SAFE
    const filtered = useMemo(() => {
        if (activeCategory === "All") return portfolios;
        return portfolios.filter((p) => p.category === activeCategory);
    }, [activeCategory, portfolios]);

    // OPEN MODAL
    const openPortfolio = (portfolio) => {
        setSelectedPortfolio(portfolio);
        setCurrentIndex(0);
    };

    // CLOSE MODAL
    const closeModal = () => {
        setSelectedPortfolio(null);
        setCurrentIndex(0);
    };

    const images = selectedPortfolio?.images ?? [];

    // AUTO SLIDER
    useEffect(() => {
        if (!images.length) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev + 1 >= images.length ? 0 : prev + 1,
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [selectedPortfolio]);

    return (
        <GuestLayout>
            {/* HERO */}
            <section className="bg-black py-28 text-white text-center">
                <h1 className="text-5xl font-bold">Portfolio</h1>
                <p className="text-gray-300 mt-4">
                    Capturing moments that last forever
                </p>
            </section>

            {/* FILTER (DYNAMIC) */}
            <section className="py-10">
                <div className="flex justify-center gap-3 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full border ${
                                activeCategory === cat
                                    ? "bg-black text-white"
                                    : "bg-white"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* GRID */}
            <section className="pb-20">
                <div className="grid md:grid-cols-3 gap-6 px-6">
                    <AnimatePresence>
                        {filtered.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="cursor-pointer group"
                                onClick={() => openPortfolio(item)}
                            >
                                <div className="relative overflow-hidden rounded-xl">
                                    <img
                                        src={`/storage/${item.featured_image}`}
                                        className="h-[400px] w-full object-cover group-hover:scale-110 transition"
                                    />

                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                        <span className="text-white font-semibold">
                                            View Gallery
                                        </span>
                                    </div>
                                </div>

                                <h3 className="mt-3 font-semibold text-center">
                                    {item.name}
                                </h3>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* MODAL SLIDER (SAFE) */}
            <AnimatePresence>
                {selectedPortfolio && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="relative w-full max-w-4xl">
                            {/* CLOSE */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-white text-2xl z-50"
                            >
                                ✕
                            </button>

                            {/* MAIN IMAGE */}
                            <img
                                src={`/storage/${images[currentIndex]?.image_path}`}
                                className="w-full h-[70vh] object-contain rounded-lg"
                            />

                            {/* LEFT */}
                            <button
                                onClick={() =>
                                    setCurrentIndex((prev) =>
                                        prev === 0
                                            ? images.length - 1
                                            : prev - 1,
                                    )
                                }
                                className="absolute left-4 top-1/2 text-white text-3xl"
                            >
                                ‹
                            </button>

                            {/* RIGHT */}
                            <button
                                onClick={() =>
                                    setCurrentIndex((prev) =>
                                        prev + 1 >= images.length
                                            ? 0
                                            : prev + 1,
                                    )
                                }
                                className="absolute right-4 top-1/2 text-white text-3xl"
                            >
                                ›
                            </button>

                            {/* THUMBNAILS */}
                            <div className="flex gap-2 mt-4 justify-center flex-wrap">
                                {images.map((img, i) => (
                                    <img
                                        key={img.id}
                                        src={`/storage/${img.image_path}`}
                                        onClick={() => setCurrentIndex(i)}
                                        className={`h-16 w-16 object-cover rounded cursor-pointer border-2 ${
                                            i === currentIndex
                                                ? "border-white"
                                                : "border-transparent"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GuestLayout>
    );
}
