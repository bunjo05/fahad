import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";
import { motion } from "framer-motion";

export default function About() {
    // Reusable animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const cardVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <GuestLayout>
            {/* Hero */}
            <section className="relative bg-black py-32 text-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="mb-3 uppercase tracking-[0.3em] text-amber-400"
                    >
                        About Us
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mb-6 text-5xl font-bold md:text-6xl"
                    >
                        Every Picture Has a Story
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mx-auto max-w-3xl text-lg text-gray-300"
                    >
                        We capture authentic emotions, unforgettable moments,
                        and timeless memories through professional photography.
                    </motion.p>
                </div>
            </section>

            {/* Story Section */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <img
                                src="/gallery-2.jpg"
                                alt="Photographer"
                                className="w-full rounded-2xl shadow-xl"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <p className="mb-3 font-semibold uppercase tracking-widest text-amber-500">
                                Our Story
                            </p>

                            <h2 className="mb-6 text-4xl font-bold">
                                Capturing Life Through a Different Lens
                            </h2>

                            <p className="mb-5 leading-relaxed text-gray-600">
                                Photography is more than taking pictures—it is
                                preserving moments that can never be recreated.
                                Our journey began with a passion for
                                storytelling and a desire to capture genuine
                                emotions through beautiful imagery.
                            </p>

                            <p className="mb-5 leading-relaxed text-gray-600">
                                Over the years, we have had the privilege of
                                documenting weddings, family milestones,
                                corporate events, portraits, and countless
                                special occasions. Every client and every story
                                is unique, which is why we approach every shoot
                                with creativity, care, and attention to detail.
                            </p>

                            <p className="leading-relaxed text-gray-600">
                                Our mission is simple: create timeless
                                photographs that allow you to relive your most
                                meaningful memories for years to come.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-gray-50 py-24">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-4 text-4xl font-bold">
                            What We Stand For
                        </h2>

                        <p className="mx-auto max-w-2xl text-gray-600">
                            Our work is guided by values that ensure every
                            client receives an exceptional photography
                            experience.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid gap-8 md:grid-cols-3"
                    >
                        {[
                            {
                                title: "Creativity",
                                text: "We approach every session with fresh ideas and artistic vision to create unique and memorable images.",
                            },
                            {
                                title: "Authenticity",
                                text: "Genuine emotions and real moments are at the heart of our photography style.",
                            },
                            {
                                title: "Excellence",
                                text: "From planning to final delivery, we are committed to providing exceptional quality and service.",
                            },
                        ].map((value) => (
                            <motion.div
                                key={value.title}
                                variants={cardVariant}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <h3 className="mb-4 text-2xl font-semibold">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">{value.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-black py-24 text-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="grid gap-10 text-center md:grid-cols-4"
                    >
                        {[
                            { number: "500+", label: "Projects Completed" },
                            { number: "300+", label: "Happy Clients" },
                            { number: "8+", label: "Years Experience" },
                            { number: "100%", label: "Client Satisfaction" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={cardVariant}
                                // Slight staggered delay already handled by container
                                whileHover={{ scale: 1.05 }}
                                className="transition-transform"
                            >
                                <motion.h3
                                    className="text-5xl font-bold text-amber-400"
                                    whileInView={{
                                        scale: [0.8, 1],
                                        opacity: [0, 1],
                                    }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 100,
                                    }}
                                >
                                    {stat.number}
                                </motion.h3>
                                <p className="mt-3 text-gray-300">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white py-24">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="container mx-auto px-6 text-center"
                >
                    <h2 className="mb-6 text-5xl font-bold">
                        Let's Tell Your Story
                    </h2>

                    <p className="mx-auto mb-8 max-w-2xl text-gray-600">
                        Whether it's a wedding, portrait session, corporate
                        event, or special celebration, we'd love to help you
                        preserve the moments that matter most.
                    </p>

                    <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:bg-gray-800"
                    >
                        Book a Session
                    </motion.a>
                </motion.div>
            </section>
        </GuestLayout>
    );
}
