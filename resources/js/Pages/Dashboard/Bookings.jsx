import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function Bookings({ bookings }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState(null);

    const { data, setData, patch, processing } = useForm({
        amount: "",
        payment_status: "pending",
    });

    useEffect(() => {
        if (selectedBooking) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedBooking]);

    // Filter bookings based on search and status
    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch =
            booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.service.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || booking.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Helper for status badge styling
    const statusBadge = (status) => {
        const styles = {
            confirmed: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
            pending: "bg-yellow-100 text-yellow-800",
        };
        return styles[status] || "bg-gray-100 text-gray-800";
    };

    // Helper for payment badge styling
    const paymentBadge = (paymentStatus) => {
        const styles = {
            paid: "bg-green-100 text-green-800",
            failed: "bg-red-100 text-red-800",
            pending: "bg-gray-100 text-gray-800",
        };
        return styles[paymentStatus] || "bg-gray-100 text-gray-800";
    };

    const updateBooking = () => {
        patch(route("dashboard.bookings.update", selectedBooking.id), {
            preserveScroll: true,

            onSuccess: () => {
                setSelectedBooking(null);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Bookings
                        </h2>
                        <p className="text-sm text-gray-500">
                            Manage all photography booking requests
                        </p>
                    </div>
                    <div className="text-sm bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm self-start sm:self-center">
                        Total:{" "}
                        <span className="font-semibold text-gray-900">
                            {filteredBookings.length}
                        </span>
                        {filteredBookings.length !== bookings.length && (
                            <span className="text-gray-400 text-xs ml-1">
                                (filtered from {bookings.length})
                            </span>
                        )}
                    </div>
                </div>
            }
        >
            <div className="p-4 sm:p-6">
                {/* FILTERS & SEARCH BAR */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-lg border-gray-200 bg-white px-4 py-2 text-sm focus:border-amber-500 focus:ring-amber-500 shadow-sm"
                        >
                            <option value="all">All statuses</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="relative">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name, email or service..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-80 rounded-lg border-gray-200 pl-10 pr-4 py-2 text-sm focus:border-amber-500 focus:ring-amber-500 shadow-sm"
                        />
                    </div>
                </div>

                {/* DESKTOP TABLE (hidden on mobile) */}
                <div className="hidden md:block rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Service</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Payment</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => (
                                        <tr
                                            key={booking.id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900">
                                                    {booking.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ID: #{booking.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <div>{booking.email}</div>
                                                <div className="text-xs text-gray-400">
                                                    {booking.phone}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {booking.service}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {booking.date}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                                                        booking.status,
                                                    )}`}
                                                >
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${paymentBadge(
                                                        booking.payment_status,
                                                    )}`}
                                                >
                                                    {booking.payment_status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-800">
                                                {booking.amount
                                                    ? `EUR ${booking.amount}`
                                                    : "—"}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => {
                                                        setSelectedBooking(
                                                            booking,
                                                        );

                                                        setData({
                                                            amount:
                                                                booking.amount ||
                                                                "",
                                                            payment_status:
                                                                booking.payment_status ||
                                                                "pending",
                                                        });
                                                    }}
                                                    className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-amber-600"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            No bookings match your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* MOBILE CARD LAYOUT (visible only on small screens) */}
                <div className="md:hidden space-y-4">
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                            >
                                <div className="p-5 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900">
                                                {booking.name}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                ID: #{booking.id}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(
                                                    booking.status,
                                                )}`}
                                            >
                                                {booking.status}
                                            </span>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${paymentBadge(
                                                    booking.payment_status,
                                                )}`}
                                            >
                                                {booking.payment_status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                        <div>
                                            <span className="text-gray-500 text-xs">
                                                Email
                                            </span>
                                            <p className="text-gray-800 break-words">
                                                {booking.email}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs">
                                                Phone
                                            </span>
                                            <p className="text-gray-800">
                                                {booking.phone}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs">
                                                Service
                                            </span>
                                            <p className="text-gray-800 font-medium">
                                                {booking.service}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs">
                                                Date
                                            </span>
                                            <p className="text-gray-800">
                                                {booking.date}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs">
                                                Amount
                                            </span>
                                            <p className="text-gray-800 font-semibold">
                                                {booking.amount
                                                    ? `$${booking.amount}`
                                                    : "—"}
                                            </p>
                                        </div>
                                    </div>
                                    {booking.message && (
                                        <div className="pt-2 border-t border-gray-100">
                                            <span className="text-gray-500 text-xs">
                                                Message
                                            </span>
                                            <p className="text-gray-600 text-sm mt-1 break-words">
                                                {booking.message}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
                            No bookings match your filters.
                        </div>
                    )}
                </div>
            </div>
            {selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4">
                    <div className="flex w-full max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-4 sm:px-6">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                                    Booking Details
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Booking #{selectedBooking.id}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Client Name
                                    </label>
                                    <p className="mt-1 text-gray-900 break-words">
                                        {selectedBooking.name}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Service
                                    </label>
                                    <p className="mt-1 text-gray-900 break-words">
                                        {selectedBooking.service}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Email
                                    </label>
                                    <p className="mt-1 text-gray-900 break-words">
                                        {selectedBooking.email}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Phone
                                    </label>
                                    <p className="mt-1 text-gray-900 break-words">
                                        {selectedBooking.phone}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Booking Date
                                    </label>
                                    <p className="mt-1 text-gray-900">
                                        {selectedBooking.date}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData("amount", e.target.value)
                                        }
                                        placeholder="Enter amount"
                                        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-amber-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Status
                                    </label>

                                    <div className="mt-2">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
                                                selectedBooking.status,
                                            )}`}
                                        >
                                            {selectedBooking.status}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Payment Status
                                    </label>

                                    {selectedBooking.status === "confirmed" ||
                                    data.amount ? (
                                        <select
                                            value={data.payment_status}
                                            onChange={(e) =>
                                                setData(
                                                    "payment_status",
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="paid">Paid</option>
                                            <option value="failed">
                                                Failed
                                            </option>
                                        </select>
                                    ) : (
                                        <div className="mt-2">
                                            <span className="text-sm text-gray-500">
                                                Confirm booking first
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Payment Method
                                    </label>

                                    <p className="mt-1 text-gray-900">
                                        {selectedBooking.payment_method ||
                                            "Not Set"}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Created
                                    </label>

                                    <p className="mt-1 text-gray-900">
                                        {new Date(
                                            selectedBooking.created_at,
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="mt-6">
                                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Message
                                </label>

                                <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <p className="whitespace-pre-wrap break-words text-gray-700">
                                        {selectedBooking.message ||
                                            "No message provided"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 border-t bg-white px-4 py-4 sm:px-6">
                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={updateBooking}
                                    disabled={processing}
                                    className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
                                >
                                    {processing
                                        ? "Updating..."
                                        : "Update Booking"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
