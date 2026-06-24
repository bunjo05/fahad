import GuestLayout from "@/Layouts/GuestLayout";
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "@/Components/Seo";

export default function Services({ seo }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        message: "",
    });
    const services = [
        {
            title: "Wedding Photography",
            image: "/gallery-1.jpg",
            description:
                "Capture every emotion, detail, and unforgettable moment of your special day with timeless wedding photography.",
            features: [
                "Full-day coverage",
                "Professional editing",
                "Online gallery",
                "High-resolution images",
            ],
        },
        {
            title: "Portrait Photography",
            image: "/gallery-2.jpg",
            description:
                "Professional portraits for individuals, families, graduates, and personal branding.",
            features: [
                "Studio & outdoor sessions",
                "Retouched images",
                "Multiple outfit changes",
                "Digital delivery",
            ],
        },
        {
            title: "Event Photography",
            image: "/gallery-3.jpg",
            description:
                "Document corporate events, birthdays, conferences, and celebrations with stunning imagery.",
            features: [
                "Event coverage",
                "Fast turnaround",
                "Professional editing",
                "Online sharing gallery",
            ],
        },
        {
            title: "Commercial Photography",
            image: "/gallery-4.jpg",
            description:
                "High-quality photography for businesses, products, marketing campaigns, and brands.",
            features: [
                "Product photography",
                "Brand storytelling",
                "Advertising content",
                "Commercial licensing",
            ],
        },
    ];

    const [showModal, setShowModal] = useState(false);

    // Animation variants
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

    const featureVariant = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("booking.store"), {
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
        });
    };

    return (
        <>
            <Seo
                title={seo.title}
                description={seo.description}
                keywords={seo.keywords}
                image={seo.image}
                url={seo.url}
            />
            <GuestLayout>
                {/* Hero Section */}
                <section className="bg-black py-28 text-white">
                    <div className="container mx-auto px-6 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="mb-3 uppercase tracking-[0.3em] text-amber-400"
                        >
                            Our Services
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="mb-6 text-5xl font-bold md:text-6xl"
                        >
                            Professional Photography Services
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mx-auto max-w-3xl text-lg text-gray-300"
                        >
                            From weddings and portraits to corporate events and
                            commercial projects, we create photographs that tell
                            meaningful stories and preserve lasting memories.
                        </motion.p>
                    </div>
                </section>

                {/* Services */}
                <section className="bg-white py-24">
                    <div className="container mx-auto px-6">
                        <div className="space-y-20">
                            {services.map((service, index) => {
                                const isEven = index % 2 === 0;
                                return (
                                    <div
                                        key={service.title}
                                        className={`grid gap-12 items-center lg:grid-cols-2 ${
                                            !isEven
                                                ? "lg:[&>*:first-child]:order-2"
                                                : ""
                                        }`}
                                    >
                                        {/* Image */}
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                x: isEven ? -60 : 60,
                                            }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{
                                                once: true,
                                                amount: 0.3,
                                            }}
                                            transition={{
                                                duration: 0.7,
                                                ease: "easeOut",
                                            }}
                                        >
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="h-[450px] w-full rounded-2xl object-cover shadow-lg transition-transform duration-500 hover:scale-105"
                                            />
                                        </motion.div>

                                        {/* Text content */}
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                x: isEven ? 60 : -60,
                                            }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{
                                                once: true,
                                                amount: 0.3,
                                            }}
                                            transition={{
                                                duration: 0.7,
                                                ease: "easeOut",
                                            }}
                                        >
                                            <h2 className="mb-4 text-4xl font-bold">
                                                {service.title}
                                            </h2>

                                            <p className="mb-8 text-lg text-gray-600">
                                                {service.description}
                                            </p>

                                            <motion.ul
                                                variants={staggerContainer}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{
                                                    once: true,
                                                    amount: 0.3,
                                                }}
                                                className="space-y-4"
                                            >
                                                {service.features.map(
                                                    (feature) => (
                                                        <motion.li
                                                            key={feature}
                                                            variants={
                                                                featureVariant
                                                            }
                                                            className="flex items-center gap-3"
                                                        >
                                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                                                                ✓
                                                            </span>
                                                            <span className="text-gray-700">
                                                                {feature}
                                                            </span>
                                                        </motion.li>
                                                    ),
                                                )}
                                            </motion.ul>

                                            {/* <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="mt-8 rounded-full bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
                                        >
                                            Learn More
                                        </motion.button> */}
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="bg-gray-50 py-24">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInUp}
                            className="text-center"
                        >
                            <h2 className="mb-4 text-4xl font-bold">
                                Why Choose Us
                            </h2>
                            <p className="mx-auto mb-16 max-w-2xl text-gray-600">
                                We combine creativity, technical expertise, and
                                a passion for storytelling to deliver
                                exceptional photography experiences.
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
                                    title: "Creative Vision",
                                    text: "Every project is approached with a unique artistic perspective that reflects your story.",
                                },
                                {
                                    title: "Professional Quality",
                                    text: "High-end equipment, expert editing, and attention to detail ensure stunning results.",
                                },
                                {
                                    title: "Client-Focused",
                                    text: "We prioritize communication, comfort, and a seamless experience from booking to delivery.",
                                },
                            ].map((item) => (
                                <motion.div
                                    key={item.title}
                                    variants={cardVariant}
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <h3 className="mb-4 text-2xl font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600">{item.text}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Process */}
                <section className="bg-white py-24">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInUp}
                            className="mb-16 text-center"
                        >
                            <h2 className="mb-4 text-4xl font-bold">
                                Our Process
                            </h2>
                            <p className="mx-auto max-w-2xl text-gray-600">
                                A simple and professional workflow designed to
                                make your photography experience stress-free.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="grid gap-8 md:grid-cols-4"
                        >
                            {[
                                "Consultation",
                                "Planning",
                                "Photography Session",
                                "Editing & Delivery",
                            ].map((step, index) => (
                                <motion.div
                                    key={step}
                                    variants={cardVariant}
                                    whileHover={{ scale: 1.03 }}
                                    className="text-center"
                                >
                                    <motion.div
                                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-2xl font-bold text-white"
                                        whileInView={{
                                            scale: [0.5, 1],
                                            opacity: [0, 1],
                                        }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: index * 0.15,
                                            duration: 0.5,
                                        }}
                                    >
                                        {index + 1}
                                    </motion.div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        {step}
                                    </h3>
                                    <p className="text-gray-600">
                                        Professional guidance every step of the
                                        way.
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-black py-24 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                        className="container mx-auto px-6 text-center"
                    >
                        <h2 className="mb-6 text-5xl font-bold">
                            Ready to Book Your Session?
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-gray-300">
                            Let's create beautiful images that you'll treasure
                            for a lifetime. Contact us today to discuss your
                            photography needs.
                        </p>
                        <motion.button
                            type="button"
                            onClick={() => setShowModal(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-full bg-amber-500 px-10 py-4 font-semibold text-black transition hover:bg-amber-400"
                        >
                            Book a Session
                        </motion.button>
                    </motion.div>
                </section>

                <AnimatePresence>
                    {showModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl"
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-3xl font-bold text-black">
                                        Book a Session
                                    </h2>

                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-2xl font-bold text-gray-500 hover:text-black"
                                    >
                                        ×
                                    </button>
                                </div>

                                <form onSubmit={submit} className="space-y-5">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    />

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                        />

                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                        />
                                    </div>

                                    <select
                                        value={data.service}
                                        onChange={(e) =>
                                            setData("service", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    >
                                        <option value="">
                                            Select Photography Service
                                        </option>
                                        <option value="Wedding Photography">
                                            Wedding Photography
                                        </option>
                                        <option value="Portrait Photography">
                                            Portrait Photography
                                        </option>
                                        <option value="Event Photography">
                                            Event Photography
                                        </option>
                                        <option value="Commercial Photography">
                                            Commercial Photography
                                        </option>
                                    </select>

                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) =>
                                            setData("date", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    />

                                    <textarea
                                        rows="4"
                                        placeholder="Tell us about your project..."
                                        value={data.message}
                                        onChange={(e) =>
                                            setData("message", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    />

                                    <div className="flex gap-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-black hover:bg-amber-400 disabled:opacity-50"
                                        >
                                            {processing
                                                ? "Submitting..."
                                                : "Submit Booking"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="rounded-xl border border-gray-300 px-6 py-3"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </GuestLayout>
        </>
    );
}
