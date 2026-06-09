import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { useForm } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    const { appName, auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { url } = usePage();

    const navLinks = [
        { name: "Home", route: "home" },
        { name: "About Us", route: "about" },
        { name: "Portfolio", route: "portfolio" },
        { name: "Services", route: "services" },
        // { name: "Blog", route: "blog" },
        { name: "Contact Us", route: "contact" },
    ];

    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        message: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("booking.store"), {
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
        });
    };

    const isActive = (routeName) => {
        return route().current(routeName);
    };

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <Link href="/" className=" flex items-center gap-2">
                        <img
                            className="w-20 fill-current text-gray-800 transition hover:text-amber-500"
                            src="/logo.svg"
                            alt=""
                        />
                        <div className="flex flex-col gap-0">
                            <p className="text-[30px] font-bold">Nile</p>
                            <p className="text-md text-gray-500 font-bold">
                                Photography
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center space-x-8 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.route}
                                href={route(link.route)}
                                className={`relative text-sm font-medium transition-colors duration-200 ${
                                    isActive(link.route)
                                        ? "text-amber-500"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                {link.name}
                                {/* Active indicator */}
                                {isActive(link.route) && (
                                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-amber-500" />
                                )}
                            </Link>
                        ))}
                        <button
                            onClick={() => setShowModal(true)}
                            className="rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-amber-400 hover:shadow-lg"
                        >
                            Book Now
                        </button>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none lg:hidden"
                        aria-expanded={mobileMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {mobileMenuOpen ? (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`lg:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
                >
                    <div className="space-y-1 border-t border-gray-100 bg-white px-4 pb-6 pt-2 shadow-lg">
                        {navLinks.map((link) => (
                            <Link
                                key={link.route}
                                href={route(link.route)}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block rounded-md px-4 py-3 text-base font-medium transition ${
                                    isActive(link.route)
                                        ? "bg-amber-50 text-amber-600"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href={route("contact")}
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-4 block rounded-full bg-amber-500 px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-amber-400"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl relative">
                        {/* Close button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>

                        <h2 className="mb-4 text-xl font-bold">
                            Book a Session
                        </h2>

                        {/* FORM */}
                        <form onSubmit={submit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full rounded-xl border px-4 py-3"
                            />

                            <div className="grid gap-3 md:grid-cols-2">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                />

                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <select
                                value={data.service}
                                onChange={(e) =>
                                    setData("service", e.target.value)
                                }
                                className="w-full rounded-xl border px-4 py-3"
                            >
                                <option value="">Select Service</option>
                                <option>Wedding Photography</option>
                                <option>Portrait Photography</option>
                                <option>Event Photography</option>
                                <option>Commercial Photography</option>
                            </select>

                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) =>
                                    setData("date", e.target.value)
                                }
                                className="w-full rounded-xl border px-4 py-3"
                            />

                            <textarea
                                rows="4"
                                placeholder="Message"
                                value={data.message}
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                                className="w-full rounded-xl border px-4 py-3"
                            />

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 rounded-xl bg-amber-500 py-3 font-semibold text-black"
                                >
                                    {processing ? "Sending..." : "Submit"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="rounded-xl border px-4 py-3"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Professional Footer */}
            <footer className="bg-black text-white">
                {/* Top Section */}
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="grid gap-12 lg:grid-cols-4">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            <Link href="/" className=" flex items-center gap-2">
                                <img
                                    className="w-20 fill-current text-gray-800 transition hover:text-amber-500"
                                    src="/logo-white.svg"
                                    alt=""
                                />
                                <div className="flex flex-col gap-0">
                                    <p className="text-[30px] font-bold">
                                        Nile
                                    </p>
                                    <p className="text-md text-gray-500 font-bold">
                                        Photography
                                    </p>
                                </div>
                            </Link>

                            <p className="max-w-lg leading-relaxed text-gray-400">
                                We specialize in capturing life's most
                                meaningful moments through timeless photography.
                                From weddings and portraits to corporate events,
                                every image tells a story worth remembering.
                            </p>

                            {/* CTA */}
                            {/* <Link
                                href={route("contact")}
                                className="mt-8 inline-flex items-center rounded-full bg-amber-500 px-6 py-3 font-semibold text-black transition hover:bg-amber-400"
                            >
                                Book Your Session
                            </Link> */}
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="mb-6 text-lg font-semibold text-white">
                                Quick Links
                            </h4>

                            <ul className="space-y-3">
                                {navLinks.map((link) => (
                                    <li key={link.route}>
                                        <Link
                                            href={route(link.route)}
                                            className="text-gray-400 transition hover:text-amber-400"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="mb-6 text-lg font-semibold text-white">
                                Contact
                            </h4>

                            <ul className="space-y-4 text-gray-400">
                                <li>📍 Berlin, Germany</li>

                                <li>
                                    📞
                                    <a
                                        href="tel:+491786161954"
                                        className="hover:text-amber-400 transition"
                                    >
                                        +49 178 616 1954
                                    </a>
                                </li>

                                <li>
                                    <a href="mailto:admin@nilephotography.de">
                                        ✉️ admin@nilephotography.de
                                    </a>
                                </li>
                            </ul>

                            {/* Socials */}
                            <div className="mt-8 flex gap-3">
                                <p className="w-10 text-white">
                                    <a href="https://www.instagram.com/nilephotography030?igsh=MWE5bWVxem5vMXRyNw==">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                            className="fill-current text-gray-400 transition hover:text-blue-400"
                                        >
                                            <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
                                        </svg>
                                    </a>
                                </p>
                                <p className="w-10 ">
                                    <a href="https://www.tiktok.com/@nilephotography030?_r=1&_t=ZN-973ttvRMr4g">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                            className="fill-current text-gray-400 transition hover:text-amber-400"
                                        >
                                            <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z" />
                                        </svg>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instagram Strip */}
                <div className="border-t border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        {[
                            "/gallery-1.jpg",
                            "/gallery-2.jpg",
                            "/gallery-3.jpg",
                            "/gallery-4.jpg",
                            "/gallery-5.jpg",
                            "/gallery-6.jpg",
                        ].map((image, index) => (
                            <div
                                key={index}
                                className="group relative h-32 overflow-hidden"
                            >
                                <img
                                    src={image}
                                    alt=""
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/40" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-500 md:flex-row">
                        <p>
                            © {new Date().getFullYear()} {appName}. All rights
                            reserved.
                        </p>

                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-amber-400">
                                Privacy Policy
                            </Link>

                            <Link href="#" className="hover:text-amber-400">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
