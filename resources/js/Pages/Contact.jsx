import GuestLayout from "@/Layouts/GuestLayout";
import { useForm } from "@inertiajs/react";
import React from "react";
import { usePage } from "@inertiajs/react";

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
    });

    const { props } = usePage();

    const submit = (e) => {
        e.preventDefault();
        post(route("contact.store"), {
            onSuccess: () => {
                window.location.reload();
            },
        });
    };

    return (
        <GuestLayout>
            {/* Hero Section */}
            <section className="bg-black py-28 text-white">
                <div className="container mx-auto px-6 text-center">
                    <p className="mb-3 uppercase tracking-[0.3em] text-amber-400">
                        Contact Us
                    </p>

                    <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                        Let's Create Something Beautiful
                    </h1>

                    <p className="mx-auto max-w-3xl text-lg text-gray-300">
                        Whether you're planning a wedding, graduation, corporate
                        event, family portrait, or personal photoshoot, we'd
                        love to hear your story.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid gap-16 lg:grid-cols-2">
                        {/* Contact Form */}
                        <div>
                            <h2 className="mb-6 text-4xl font-bold">
                                Send an Inquiry
                            </h2>

                            <p className="mb-8 text-gray-600">
                                Tell us a little about your photography needs,
                                and we'll get back to you as soon as possible.
                            </p>

                            {props.flash?.success && (
                                <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700">
                                    {props.flash.success}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="mb-2 block font-medium">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none transition focus:border-black"
                                    />
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block font-medium">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none transition focus:border-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block font-medium">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="+44..."
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none transition focus:border-black"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block font-medium">
                                        Service Needed
                                    </label>

                                    <select
                                        value={data.service}
                                        onChange={(e) =>
                                            setData("service", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none transition focus:border-black"
                                    >
                                        <option>Wedding Photography</option>
                                        <option>Graduation Photography</option>
                                        <option>Portrait Photography</option>
                                        <option>Corporate Event</option>
                                        <option>Family Photoshoot</option>
                                        <option>Commercial Photography</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block font-medium">
                                        Tell Us About Your Event
                                    </label>

                                    <textarea
                                        rows="6"
                                        value={data.message}
                                        onChange={(e) =>
                                            setData("message", e.target.value)
                                        }
                                        placeholder="Provide details about your event, photoshoot location, expectations, and any special requests..."
                                        className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none transition focus:border-black"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {processing ? "Sending..." : "Send Inquiry"}
                                </button>
                            </form>
                        </div>

                        {/* Contact Details */}
                        <div>
                            <h2 className="mb-6 text-4xl font-bold">
                                Get in Touch
                            </h2>

                            <p className="mb-10 text-gray-600">
                                We'd love to discuss your photography needs and
                                help bring your vision to life.
                            </p>

                            <div className="space-y-8">
                                <div className="rounded-2xl bg-gray-50 p-6">
                                    <h3 className="mb-2 text-xl font-semibold">
                                        Phone
                                    </h3>
                                    <p className="text-gray-600">
                                        <a
                                            href="tel:+491786161954"
                                            className="text-blue-500 hover:underline"
                                        >
                                            +49 178 616 1954
                                        </a>
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-6">
                                    <h3 className="mb-2 text-xl font-semibold">
                                        Email
                                    </h3>
                                    <p className="text-gray-600">
                                        <a
                                            href="mailto:admin@nilephotography.de"
                                            className="text-blue-500 hover:underline"
                                        >
                                            admin@nilephotography.de
                                        </a>
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-6">
                                    <h3 className="mb-2 text-xl font-semibold">
                                        Location
                                    </h3>
                                    <p className="text-gray-600">
                                        Berlin, Germany
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-6">
                                    <h3 className="mb-2 text-xl font-semibold">
                                        Working Hours
                                    </h3>
                                    <p className="text-gray-600">
                                        Monday - Saturday
                                    </p>
                                    <p className="text-gray-600">
                                        8:00 AM - 6:00 PM
                                    </p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-10">
                                <h3 className="mb-4 text-2xl font-semibold">
                                    Follow Our Work
                                </h3>

                                <div className="flex gap-4">
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
                                    <p className="w-10 text-white">
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
                </div>
            </section>

            {/* Map Section */}
            {/* <section className="bg-gray-100 py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-8 text-center">
                        <h2 className="text-4xl font-bold">Our Location</h2>

                        <p className="mt-4 text-gray-600">
                            Available for bookings throughout Uganda and East
                            Africa.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-3xl shadow-lg">
                        <iframe
                            title="Studio Location"
                            src="https://maps.google.com/maps?q=Kampala&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            className="h-[500px] w-full"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section> */}

            {/* CTA */}
            <section className="bg-black py-24 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="mb-6 text-5xl font-bold">
                        Ready to Book Your Session?
                    </h2>

                    <p className="mx-auto mb-8 max-w-2xl text-gray-300">
                        Let's capture your special moments and create memories
                        you'll treasure for years to come.
                    </p>

                    <a
                        href="tel:+491786161954"
                        className="inline-block rounded-full bg-amber-500 px-10 py-4 font-semibold text-black transition hover:bg-amber-400"
                    >
                        Call Us Today
                    </a>
                </div>
            </section>
        </GuestLayout>
    );
}
