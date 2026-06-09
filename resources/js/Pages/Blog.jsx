import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";
import { motion } from "framer-motion";

export default function Blog() {
    const posts = [
        {
            id: 1,
            title: "10 Tips for Stunning Wedding Photos",
            category: "Wedding Photography",
            date: "March 15, 2026",
            image: "/gallery-1.jpg",
            excerpt:
                "Discover practical tips that will help you look natural, relaxed, and beautiful in your wedding photographs.",
        },
        {
            id: 2,
            title: "Behind the Scenes of a Graduation Shoot",
            category: "Graduation",
            date: "March 10, 2026",
            image: "/gallery-2.jpg",
            excerpt:
                "Take a look behind the camera and see how we create memorable graduation portraits.",
        },
        {
            id: 3,
            title: "Choosing the Perfect Location for Portraits",
            category: "Portrait Photography",
            date: "March 5, 2026",
            image: "/gallery-3.jpg",
            excerpt:
                "The right location can elevate your portraits. Here are our favorite tips for selecting the perfect setting.",
        },
        {
            id: 4,
            title: "Corporate Event Photography Checklist",
            category: "Events",
            date: "February 28, 2026",
            image: "/gallery-4.jpg",
            excerpt:
                "Planning a corporate event? Use this checklist to ensure every important moment is captured.",
        },
        {
            id: 5,
            title: "How to Prepare for a Family Photoshoot",
            category: "Family Photography",
            date: "February 20, 2026",
            image: "/gallery-5.jpg",
            excerpt:
                "Simple preparation tips that help create relaxed, authentic family portraits you'll cherish forever.",
        },
        {
            id: 6,
            title: "Our Favorite Photography Gear in 2026",
            category: "Photography Tips",
            date: "February 12, 2026",
            image: "/gallery-6.jpg",
            excerpt:
                "A look at the cameras, lenses, and accessories we rely on to deliver exceptional results.",
        },
    ];

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
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
            {/* Hero Section */}
            <section className="bg-black py-28 text-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="mb-3 uppercase tracking-[0.3em] text-amber-400"
                    >
                        Our Blog
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mb-6 text-5xl font-bold md:text-6xl"
                    >
                        Stories, Tips & Inspiration
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mx-auto max-w-3xl text-lg text-gray-300"
                    >
                        Explore photography insights, client stories,
                        behind-the-scenes moments, and expert advice to help you
                        create unforgettable memories.
                    </motion.p>
                </div>
            </section>

            {/* Featured Post */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                        className="overflow-hidden rounded-3xl bg-gray-100"
                    >
                        <div className="grid lg:grid-cols-2">
                            <motion.img
                                src="/gallery-1.jpg"
                                alt="Featured Post"
                                className="h-full min-h-[400px] w-full object-cover"
                                initial={{ opacity: 0, scale: 1.1 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            />

                            <motion.div
                                className="flex flex-col justify-center p-10 lg:p-16"
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <span className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-500">
                                    Featured Article
                                </span>

                                <h2 className="mb-4 text-4xl font-bold">
                                    How to Look Natural in Front of the Camera
                                </h2>

                                <p className="mb-6 text-gray-600">
                                    Feeling nervous during a photoshoot is
                                    completely normal. Learn how to feel
                                    comfortable and confident so your photos
                                    reflect your true personality.
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-fit rounded-full bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
                                >
                                    Read Article
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 flex items-center justify-between"
                    >
                        <h2 className="text-3xl font-bold">Latest Articles</h2>
                        <span className="text-gray-500">
                            {posts.length} Articles
                        </span>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
                    >
                        {posts.map((post) => (
                            <motion.article
                                key={post.id}
                                variants={cardVariant}
                                whileHover={{ y: -8 }}
                                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
                            >
                                <div className="overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-3 text-sm">
                                        <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">
                                            {post.category}
                                        </span>
                                        <span className="text-gray-500">
                                            {post.date}
                                        </span>
                                    </div>

                                    <h3 className="mb-4 text-2xl font-semibold">
                                        {post.title}
                                    </h3>

                                    <p className="mb-6 text-gray-600">
                                        {post.excerpt}
                                    </p>

                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        className="font-semibold text-black transition hover:text-amber-500"
                                    >
                                        Read More →
                                    </motion.button>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-gray-50 py-24">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                        className="mx-auto max-w-4xl rounded-3xl bg-black p-10 text-center text-white md:p-16"
                    >
                        <h2 className="mb-4 text-4xl font-bold">
                            Stay Inspired
                        </h2>

                        <p className="mx-auto mb-8 max-w-2xl text-gray-300">
                            Subscribe to receive photography tips, session
                            inspiration, and updates on our latest projects.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row"
                        >
                            <motion.input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-full px-6 py-4 text-black outline-none"
                                whileFocus={{ scale: 1.02 }}
                            />

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-full bg-amber-500 px-8 py-4 font-semibold text-black transition hover:bg-amber-400"
                            >
                                Subscribe
                            </motion.button>
                        </motion.div>
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
                        Ready for Your Next Photoshoot?
                    </h2>

                    <p className="mx-auto mb-8 max-w-2xl text-gray-600">
                        Whether it's a wedding, graduation, family portrait,
                        corporate event, or personal branding session, we're
                        ready to help tell your story.
                    </p>

                    <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block rounded-full bg-black px-10 py-4 font-semibold text-white transition hover:bg-gray-800"
                    >
                        Book a Session
                    </motion.a>
                </motion.div>
            </section>
        </GuestLayout>
    );
}
