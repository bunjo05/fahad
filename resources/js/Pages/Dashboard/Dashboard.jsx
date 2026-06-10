import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ stats, recentBookings, recentContacts }) {
    const Card = ({ title, value }) => (
        <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4">
                    {/* Overview */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Overview</h3>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <Card
                                title="Total Bookings"
                                value={stats.totalBookings}
                            />

                            <Card
                                title="Total Contacts"
                                value={stats.totalContacts}
                            />

                            <Card
                                title="Portfolio Items"
                                value={stats.totalPortfolio}
                            />

                            <Card
                                title="Revenue"
                                value={`UGX ${Number(
                                    stats.totalRevenue,
                                ).toLocaleString()}`}
                            />
                        </div>
                    </div>

                    {/* Booking Status */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Booking Status
                        </h3>

                        <div className="grid gap-6 md:grid-cols-3">
                            <Card
                                title="Pending"
                                value={stats.pendingBookings}
                            />

                            <Card
                                title="Confirmed"
                                value={stats.confirmedBookings}
                            />

                            <Card
                                title="Cancelled"
                                value={stats.cancelledBookings}
                            />
                        </div>
                    </div>

                    {/* Payment Status */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Payment Status
                        </h3>

                        <div className="grid gap-6 md:grid-cols-4">
                            <Card
                                title="Pending"
                                value={stats.pendingPayments}
                            />

                            <Card title="Paid" value={stats.paidPayments} />

                            <Card title="Failed" value={stats.failedPayments} />

                            <Card
                                title="Refunded"
                                value={stats.refundedPayments}
                            />
                        </div>
                    </div>

                    {/* Contact Status */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Contact Messages
                        </h3>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card title="Unread" value={stats.unreadContacts} />

                            <Card title="Read" value={stats.readContacts} />
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-xl bg-white p-6 shadow">
                            <h3 className="mb-4 font-semibold">
                                Recent Bookings
                            </h3>

                            {recentBookings.map((booking) => (
                                <div key={booking.id} className="border-b py-2">
                                    <div>{booking.name}</div>
                                    <div className="text-sm text-gray-500">
                                        {booking.status}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow">
                            <h3 className="mb-4 font-semibold">
                                Recent Contacts
                            </h3>

                            {recentContacts.map((contact) => (
                                <div key={contact.id} className="border-b py-2">
                                    <div>{contact.name}</div>
                                    <div className="text-sm text-gray-500">
                                        {contact.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
