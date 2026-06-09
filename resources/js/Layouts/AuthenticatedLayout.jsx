import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const menu = [
        { name: "Dashboard", route: "dashboard" },
        { name: "Bookings", route: "dashboard.bookings.index" },
        { name: "Contacts", route: "dashboard.contacts.index" },
        { name: "Portfolio", route: "dashboard.portfolio.index" },
        // { name: "Blog", route: "dashboard" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* ✅ SIDEBAR */}
            <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-gray-100 shadow-sm">
                {/* Logo */}
                <div className="flex items-center gap-2 px-6 py-5 border-b">
                    <img
                        className="w-10 fill-current text-gray-800 transition hover:text-amber-500"
                        src="/logo.svg"
                        alt=""
                    />
                    <div className="flex flex-col gap-0">
                        <p className="text-[20px] font-bold">Nile</p>
                        <p className="text-md text-gray-500 font-bold">
                            Photography
                        </p>
                    </div>
                    {/* <ApplicationLogo className="h-8 w-auto text-gray-800" /> */}
                    {/* <span className="font-bold text-lg">Nile Admin</span> */}
                </div>

                {/* Menu */}
                <nav className="flex flex-col px-4 py-6 gap-4">
                    {menu.map((item) => (
                        <NavLink
                            key={item.route}
                            href={route(item.route)}
                            active={route().current(item.route)}
                            className="block rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* User */}
                <div className="border-t mt-5 px-4 py-4">
                    <div className="text-sm font-semibold text-gray-800">
                        {user.name}
                    </div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                </div>
            </aside>

            {/* MAIN AREA */}
            <div className="flex flex-1 flex-col lg:ml-64">
                {/* TOP BAR */}
                <header className="bg-white border-b shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden"
                            onClick={() =>
                                setShowingNavigationDropdown((prev) => !prev)
                            }
                        >
                            ☰
                        </button>

                        {/* Right side user dropdown */}
                        <div className="ml-auto">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        {user.name}
                                        <span>▾</span>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* HEADER SECTION */}
                {/* {header && (
                    <div className="bg-white border-b px-6 py-4">{header}</div>
                )} */}

                {/* CONTENT */}
                <main className="flex-1 p-6">{children}</main>
            </div>

            {/* MOBILE MENU */}
            {showingNavigationDropdown && (
                <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
                    <div className="absolute left-0 top-0 h-full w-64 bg-white p-4">
                        <div className="mb-6 font-bold text-lg">Menu</div>

                        {menu.map((item) => (
                            <ResponsiveNavLink
                                key={item.route}
                                href={route(item.route)}
                                active={route().current(item.route)}
                                className="block py-2"
                            >
                                {item.name}
                            </ResponsiveNavLink>
                        ))}

                        <div className="mt-6 border-t pt-4">
                            <ResponsiveNavLink
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>

                    {/* close overlay */}
                    <div
                        className="h-full w-full"
                        onClick={() => setShowingNavigationDropdown(false)}
                    />
                </div>
            )}
        </div>
    );
}
