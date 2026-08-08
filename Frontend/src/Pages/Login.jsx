import React, { useState } from "react";
import { apiRequest } from "../Api/AuthApi";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {

        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setError("");
    };

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await apiRequest(
                "/api/login",
                "POST",
                form
            );

            if (!response.success) {

                setError(
                    response.message || "Invalid email or password."
                );

                return;
            }

            localStorage.setItem(
                "token",
                response.data.token
            );

            navigate("/dashboard");

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

        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">

            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <div className="absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl"></div>

                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl"></div>

            </div>

            <div className="relative mx-auto w-full max-w-sm">

                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

                    <div className="mb-7 text-center">

                        <h1 className="text-2xl font-bold tracking-tight">

                            URL
                            <span className="text-blue-500">
                                Shortener
                            </span>

                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Sign in to manage your shortened URLs.
                        </p>

                    </div>

                    <div className="mb-6">

                        <h2 className="text-xl font-semibold text-slate-100">
                            Welcome back
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter your credentials to continue.
                        </p>

                    </div>

                    {error && (

                        <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">

                            <span className="mt-0.5 text-red-400">
                                ⚠
                            </span>

                            <p className="text-sm leading-5 text-red-400">
                                {error}
                            </p>

                        </div>

                    )}

                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >

                        <div>

                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-300"
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
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            />

                        </div>

                        <div>

                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                autoComplete="current-password"
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition duration-200 hover:bg-blue-500 hover:shadow-blue-500/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {loading ? (

                                <span className="flex items-center gap-2">

                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                                    Logging in...

                                </span>

                            ) : (

                                "Login"

                            )}

                        </button>

                    </form>

                    <div className="mt-7 border-t border-slate-800 pt-6 text-center">

                        <p className="text-sm text-slate-500">

                            Don't have an account?

                            <Link
                                to="/register"
                                className="ml-1 font-medium text-blue-400 transition hover:text-blue-300"
                            >
                                Create one
                            </Link>

                        </p>

                    </div>

                </div>

                <p className="mt-5 text-center text-xs text-slate-600">
                    Securely manage your shortened URLs.
                </p>

            </div>

        </div>
    );
};

export default Login;
