import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function Contacts({ contacts }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedContact, setSelectedContact] = useState(null);

    const { data, setData, post, processing, reset } = useForm({
        reply_message: "",
    });

    const sendReply = () => {
        post(route("dashboard.contacts.reply", selectedContact.id), {
            preserveScroll: true,

            onSuccess: () => {
                reset();
                setSelectedContact(null);
            },
        });
    };

    useEffect(() => {
        if (selectedContact) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedContact]);

    const filteredContacts = contacts.filter((contact) => {
        const matchesSearch =
            contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.service?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || contact.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const statusBadge = (status) => {
        const styles = {
            read: "bg-green-100 text-green-800",
            unread: "bg-yellow-100 text-yellow-800",
        };

        return styles[status] || "bg-gray-100 text-gray-800";
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Contact Messages
                        </h2>

                        <p className="text-sm text-gray-500">
                            Manage customer enquiries
                        </p>
                    </div>

                    <div className="rounded-full bg-white px-4 py-2 text-sm shadow-sm">
                        Total:{" "}
                        <span className="font-semibold">
                            {filteredContacts.length}
                        </span>
                    </div>
                </div>
            }
        >
            <div className="p-4 sm:p-6">
                {/* Filters */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-lg border-gray-300 px-4 py-2 text-sm"
                    >
                        <option value="all">All Messages</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border-gray-300 px-4 py-2 text-sm sm:w-80"
                    />
                </div>

                {/* Desktop Table */}
                <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Service
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {filteredContacts.map((contact) => (
                                    <tr
                                        key={contact.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            {contact.name}
                                        </td>

                                        <td className="px-6 py-4">
                                            {contact.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            {contact.service}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
                                                    contact.status,
                                                )}`}
                                            >
                                                {contact.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            {new Date(
                                                contact.created_at,
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() =>
                                                    setSelectedContact(contact)
                                                }
                                                className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-medium text-white hover:bg-amber-600"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="space-y-4 md:hidden">
                    {filteredContacts.map((contact) => (
                        <div
                            key={contact.id}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold">
                                        {contact.name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {contact.email}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
                                        contact.status,
                                    )}`}
                                >
                                    {contact.status}
                                </span>
                            </div>

                            <div className="mt-3">
                                <p className="text-sm text-gray-600">
                                    {contact.service}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedContact(contact)}
                                className="mt-4 w-full rounded-lg bg-amber-500 px-4 py-2 text-sm text-white"
                            >
                                View Message
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedContact && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3">
                    <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-5 py-4">
                            <div>
                                <h3 className="text-xl font-bold">
                                    Contact Details
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Message #{selectedContact.id}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedContact(null)}
                                className="rounded-lg p-2 hover:bg-gray-100"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="text-xs font-semibold uppercase text-gray-500">
                                        Name
                                    </label>

                                    <p className="mt-1">
                                        {selectedContact.name}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase text-gray-500">
                                        Email
                                    </label>

                                    <p className="mt-1 break-words">
                                        {selectedContact.email}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase text-gray-500">
                                        Phone
                                    </label>

                                    <p className="mt-1">
                                        {selectedContact.phone}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase text-gray-500">
                                        Service
                                    </label>

                                    <p className="mt-1">
                                        {selectedContact.service}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase text-gray-500">
                                        Status
                                    </label>

                                    <div className="mt-2">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
                                                selectedContact.status,
                                            )}`}
                                        >
                                            {selectedContact.status}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase text-gray-500">
                                        Received
                                    </label>

                                    <p className="mt-1">
                                        {new Date(
                                            selectedContact.created_at,
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="text-xs font-semibold uppercase text-gray-500">
                                    Message
                                </label>

                                <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <p className="whitespace-pre-wrap break-words text-gray-700">
                                        {selectedContact.message}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="font-semibold text-gray-900">
                                    Reply History
                                </h4>

                                <div className="mt-3 space-y-3">
                                    {selectedContact.replies?.length ? (
                                        selectedContact.replies.map((reply) => (
                                            <div
                                                key={reply.id}
                                                className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                                            >
                                                <div className="flex justify-between">
                                                    <span className="font-medium">
                                                        {reply.user?.name ||
                                                            "Admin"}
                                                    </span>

                                                    <span className="text-xs text-gray-500">
                                                        {new Date(
                                                            reply.created_at,
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>

                                                <p className="mt-2 whitespace-pre-wrap text-gray-700">
                                                    {reply.message}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            No replies yet.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="text-xs font-semibold uppercase text-gray-500">
                                    Reply
                                </label>

                                <textarea
                                    rows={6}
                                    value={data.reply_message}
                                    onChange={(e) =>
                                        setData("reply_message", e.target.value)
                                    }
                                    placeholder="Write your response to the client..."
                                    className="mt-2 w-full rounded-xl border border-gray-300 p-4 focus:border-amber-500 focus:ring-amber-500"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t px-5 py-4">
                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    onClick={() => setSelectedContact(null)}
                                    className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-gray-50"
                                >
                                    Close
                                </button>

                                <button
                                    onClick={sendReply}
                                    disabled={
                                        processing || !data.reply_message.trim()
                                    }
                                    className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
                                >
                                    {processing ? "Sending..." : "Send Reply"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
