import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Background wrapper */}
            <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 bg-gray-50">
                {/* Card */}
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Sign in to continue to your account
                        </p>
                    </div>

                    {/* Status */}
                    {status && (
                        <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email Address" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-amber-600 hover:text-amber-500 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        {/* Button */}
                        <PrimaryButton
                            className="w-full justify-center rounded-xl bg-amber-500 py-3 text-black hover:bg-amber-400 transition"
                            disabled={processing}
                        >
                            {processing ? "Signing in..." : "Log in"}
                        </PrimaryButton>
                    </form>

                    {/* Footer */}
                    {/* <p className="mt-6 text-center text-sm text-gray-500">
                        Don’t have an account?{" "}
                        <Link
                            href="#"
                            className="text-amber-600 hover:underline"
                        >
                            Contact support
                        </Link>
                    </p> */}
                </div>
            </div>
        </GuestLayout>
    );
}
