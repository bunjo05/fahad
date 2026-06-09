import React, { useEffect, useRef } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useMotionValue,
    animate,
} from "framer-motion";

// Animated counter component
function AnimatedCounter({ target, suffix = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const count = useMotionValue(0);

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(count, target, {
            duration: 2,
            ease: "easeOut",
        });
        return () => controls.stop();
    }, [isInView, count, target]);

    const rounded = useTransform(count, (latest) => Math.round(latest));

    return (
        <span ref={ref}>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
}

export default function Home() {
    // Parallax for hero background
    const { scrollY } = useScroll();
    const heroBgY = useTransform(scrollY, [0, 500], [0, 150]);

    const portfolioItems = [
        {
            title: "Weddings",
            description:
                "Timeless stories of love and celebration, captured with elegance.",
            image: "/gallery-1.jpg",
        },
        {
            title: "Portraits",
            description:
                "Authentic expressions that reveal your true personality.",
            image: "/gallery-2.jpg",
        },
        {
            title: "Events",
            description: "Dynamic coverage of corporate and private events.",
            image: "/gallery-3.jpg",
        },
    ];

    const gallery = [
        "/gallery-1.jpg",
        "/gallery-2.jpg",
        "/gallery-3.jpg",
        "/gallery-4.jpg",
        "/gallery-5.jpg",
        "/gallery-6.jpg",
    ];

    const testimonials = [
        {
            quote: "Absolutely incredible work. Every photo captured the emotion and beauty of our wedding day perfectly.",
            name: "Sarah & Michael",
            role: "Wedding Clients",
            image: "/gallery-2.jpg",
        },
        {
            quote: "Our family portraits turned out better than we ever imagined. Pure artistry!",
            name: "The Chen Family",
            role: "Portrait Clients",
            image: "/gallery-5.jpg",
        },
        {
            quote: "Professional, punctual, and stunning results for our corporate gala.",
            name: "Emily R.",
            role: "Event Client",
            image: "/gallery-3.jpg",
        },
    ];

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
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const cardVariant = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <GuestLayout>
            {/* Hero Section with Parallax */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative overflow-hidden bg-black py-32"
            >
                <motion.div
                    className="absolute inset-0"
                    style={{ y: heroBgY }} // parallax effect
                >
                    <img
                        src="/gallery-4.jpg"
                        alt=""
                        className="h-full w-full object-cover scale-110" // slightly larger to hide edge during parallax
                    />
                </motion.div>
                <div className="absolute inset-0 bg-black/70" />

                <div className="relative container mx-auto px-6 text-center text-white">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mb-4 uppercase tracking-[0.3em] text-amber-400"
                    >
                        Get In Touch
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mb-6 text-6xl font-bold md:text-7xl"
                    >
                        Let's Create
                        <span className="block text-amber-400">
                            Something Extraordinary
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mx-auto max-w-3xl text-lg text-gray-300"
                    >
                        We would love to hear about your event, project, or
                        vision. Let's turn your moments into timeless memories.
                    </motion.p>
                </div>
            </motion.section>

            {/* Portfolio Categories */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                        className="mb-16 text-center"
                    >
                        <p className="mb-3 font-semibold uppercase tracking-widest text-amber-500">
                            Specialties
                        </p>
                        <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
                            Photography Services
                        </h2>
                        <div className="mx-auto mt-4 h-1 w-16 bg-amber-500" />
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid gap-8 md:grid-cols-3"
                    >
                        {portfolioItems.map((item) => (
                            <motion.div
                                key={item.title}
                                variants={cardVariant}
                                whileHover={{ y: -8 }}
                                className="group relative overflow-hidden rounded-2xl shadow-xl transition-shadow hover:shadow-2xl"
                            >
                                <div className="relative h-96">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-3xl font-bold">
                                        {item.title}
                                    </h3>
                                    <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
                                        <p className="text-sm text-gray-200">
                                            {item.description}
                                        </p>
                                        <a
                                            href="/portfolio"
                                            className="mt-3 inline-block rounded-full border border-white px-4 py-1.5 text-xs font-semibold transition hover:bg-white hover:text-black"
                                        >
                                            View Gallery
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-gray-50 py-24">
                <div className="container mx-auto px-6">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="relative"
                        >
                            <img
                                src="/gallery-6.jpg"
                                alt="Photographer"
                                className="relative z-10 rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 h-full w-full rounded-2xl border-2 border-amber-500/30" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <p className="mb-2 font-semibold uppercase tracking-widest text-amber-500">
                                About Us
                            </p>
                            <h2 className="mb-6 text-4xl font-bold text-gray-900">
                                Telling Stories Through Photography
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed text-gray-600">
                                We believe every photograph should tell a story.
                                Our mission is to create timeless images that
                                preserve emotions, celebrations, and life's most
                                meaningful moments. With over a decade of
                                experience, we blend artistry with technical
                                precision.
                            </p>

                            {/* Animated stats with counters */}
                            <div className="mb-8 grid grid-cols-3 gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="text-center"
                                >
                                    <span className="block text-3xl font-bold text-amber-500">
                                        <AnimatedCounter target={10} />+
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Years Exp.
                                    </span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                    className="text-center"
                                >
                                    <span className="block text-3xl font-bold text-amber-500">
                                        <AnimatedCounter target={500} />+
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Happy Clients
                                    </span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                    className="text-center"
                                >
                                    <span className="block text-3xl font-bold text-amber-500">
                                        <AnimatedCounter target={20} />
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Awards
                                    </span>
                                </motion.div>
                            </div>

                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/about"
                                className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
                            >
                                Learn More
                                <svg
                                    className="ml-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                        className="mb-16 text-center"
                    >
                        <p className="mb-3 font-semibold uppercase tracking-widest text-amber-500">
                            Portfolio
                        </p>
                        <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
                            Featured Work
                        </h2>
                        <div className="mx-auto mt-4 h-1 w-16 bg-amber-500" />
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
                    >
                        {gallery.map((image, index) => {
                            const isLarge = [0, 3, 4].includes(index);
                            return (
                                <motion.div
                                    key={index}
                                    variants={cardVariant}
                                    whileHover={{ scale: 1.03 }}
                                    className={`group relative overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-xl ${
                                        isLarge ? "md:row-span-2" : ""
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt=""
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                                        <span className="scale-0 text-white transition-transform group-hover:scale-100">
                                            <svg
                                                className="h-10 w-10"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="relative py-24">
                <div className="absolute inset-0">
                    <img
                        src="/gallery-2.jpg"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
                </div>

                <div className="relative container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                        className="mb-16 text-center"
                    >
                        <p className="mb-3 font-semibold uppercase tracking-widest text-amber-400">
                            Testimonials
                        </p>
                        <h2 className="text-4xl font-bold text-white md:text-5xl">
                            What Clients Say
                        </h2>
                        <div className="mx-auto mt-4 h-1 w-16 bg-amber-400" />
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid gap-8 md:grid-cols-3"
                    >
                        {testimonials.map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariant}
                                whileHover={{ scale: 1.02 }}
                                className="rounded-xl bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/20"
                            >
                                <div className="mb-4 flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="h-5 w-5 fill-current text-amber-400"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <blockquote className="mb-4 text-lg italic text-white">
                                    “{item.quote}”
                                </blockquote>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-white">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-32">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/gallery-1.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black/75" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="relative container mx-auto px-6 text-center"
                >
                    <h2 className="mb-6 text-5xl font-bold text-white">
                        Ready To Book?
                    </h2>
                    <p className="mb-8 text-xl text-gray-300">
                        Your story deserves to be captured beautifully.
                    </p>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/portfolio"
                        className="rounded-full bg-amber-500 px-10 py-4 font-semibold text-black transition hover:bg-amber-400"
                    >
                        View Portfolio
                    </motion.a>
                </motion.div>
            </section>
        </GuestLayout>
    );
}
