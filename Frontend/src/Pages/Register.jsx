import React, { useState } from "react";
import { apiRequest } from "../Api/AuthApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handleChange = (e) => {

        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        setError("");
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await apiRequest(
                "/api/register",
                "POST",
                form
            );

            if (!response.success) {

                setError(
                    response.message || "Registration failed."
                );

                return;
            }

            toast.success("Registration successful!");

            setForm({
                name: "",
                email: "",
                password: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (err) {

            console.error(err);

            setError(
                "Something went wrong. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="flex h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 text-white">

            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <div className="absolute left-1/2 top-1/4 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl"></div>

                <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-purple-600/10 blur-3xl"></div>

            </div>


            <div className="relative mx-auto max-h-[calc(100vh-2rem)] w-full max-w-sm">

                <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl sm:p-6">

                    <div className="mb-5 text-center">

                        <h1 className="text-xl font-bold tracking-tight">

                            URL
                            <span className="text-blue-500">
                                Shortener
                            </span>

                        </h1>

                        <p className="mt-1 text-xs text-slate-500">
                            Create an account to manage your URLs.
                        </p>

                    </div>


                    <div className="mb-5">

                        <h2 className="text-lg font-semibold text-slate-100">
                            Create your account
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Enter your details to get started.
                        </p>

                    </div>


                    {error && (

                        <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2">

                            <p className="text-xs text-red-400">
                                {error}
                            </p>

                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3"
                    >

                        <div>

                            <label
                                htmlFor="name"
                                className="mb-1.5 block text-xs font-medium text-slate-300"
                            >
                                Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                autoComplete="name"
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            />

                        </div>


                        <div>

                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-xs font-medium text-slate-300"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                autoComplete="email"
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            />

                        </div>


                        <div>

                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-xs font-medium text-slate-300"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                autoComplete="new-password"
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            />

                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {loading ? (

                                <span className="flex items-center gap-2">

                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                                    Registering...

                                </span>

                            ) : (

                                "Create Account"

                            )}

                        </button>

                    </form>


                    <div className="mt-5 border-t border-slate-800 pt-4 text-center">

                        <p className="text-xs text-slate-500">

                            Already have an account?

                            <Link
                                to="/login"
                                className="ml-1 font-medium text-blue-400 transition hover:text-blue-300"
                            >
                                Login
                            </Link>

                        </p>

                    </div>

                </div>


                <p className="mt-3 text-center text-[10px] text-slate-600">
                    Securely manage your shortened URLs.
                </p>

            </div>

        </div>
    );
};

export default Register;
