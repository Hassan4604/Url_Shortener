import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { apiRequest } from "../Api/AuthApi";

import UrlForm from "../Components/UrlForm";
import UrlCard from "../Components/UrlCard";

const Dashboard = () => {

    const { user, setUser } = useContext(AuthContext);

    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const fetchUrls = async () => {

        setLoading(true);
        setError("");

        try {

            const response = await apiRequest(
                "/api/urls",
                "GET"
            );

            if (!response.success) {
                setError(response.message);
                return;
            }

            setUrls(response.data);

        } catch (err) {

            console.error(err);
            setError("Failed to fetch URLs.");

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        fetchUrls();
    }, []);


    const handleUrlCreated = (newUrl) => {

        setUrls((prevUrls) => [
            newUrl,
            ...prevUrls
        ]);

    };


    const handleDelete = (id) => {

        setUrls((prevUrls) =>
            prevUrls.filter((url) => url.id !== id)
        );

    };


    const handleLogout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };


    return (

        <div className="min-h-screen bg-slate-950 text-white">

            {/* Navbar */}

            <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                    {/* Logo */}

                    <div>

                        <h2 className="text-xl font-bold tracking-tight">
                            URL<span className="text-blue-500">Shortener</span>
                        </h2>

                    </div>


                    {/* User Section */}

                    <div className="flex items-center gap-5">

                        <div className="hidden text-right sm:block">

                            <p className="text-xs text-slate-500">
                                Welcome back
                            </p>

                            <p className="text-sm font-medium text-slate-200">
                                {user?.name || user?.email || "User"}
                            </p>

                        </div>


                        <button
                            onClick={handleLogout}
                            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </nav>


            {/* Main */}

            <main className="mx-auto max-w-7xl px-6 py-10">

                {/* Header */}

                <div className="mb-10">

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Create and manage your shortened URLs.
                    </p>

                </div>


                {/* URL Form */}

                <section className="mb-10">

                    <div className="mb-4">

                        <h2 className="text-xl font-semibold">
                            Shorten a URL
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Turn long URLs into short, shareable links.
                        </p>

                    </div>


                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">

                        <UrlForm
                            onUrlCreated={handleUrlCreated}
                        />

                    </div>

                </section>


                {/* URL List */}

                <section>

                    {/* Section Header */}

                    <div className="mb-5 flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-semibold">
                                Your URLs
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage your shortened links.
                            </p>

                        </div>


                        {!loading && (

                            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-400">

                                {urls.length}{" "}
                                {urls.length === 1 ? "URL" : "URLs"}

                            </span>

                        )}

                    </div>


                    {/* Error */}

                    {error && (

                        <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>

                    )}


                    {/* Loading */}

                    {loading ? (

                        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-10 text-center">

                            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500"></div>

                            <p className="text-sm text-slate-400">
                                Loading your URLs...
                            </p>

                        </div>

                    ) : urls.length === 0 ? (

                        /* Empty State */

                        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-14 text-center">

                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                                🔗
                            </div>

                            <h3 className="text-lg font-semibold text-slate-200">
                                No URLs yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                                You haven't shortened any URLs yet.
                                Create your first short link above.
                            </p>

                        </div>

                    ) : (

                        /* Scrollable URL List */

                        <div
                            className="
                                max-h-[500px]
                                w-full
                                overflow-y-auto
                                rounded-xl
                                border
                                border-slate-800
                                bg-slate-950/40
                                p-4
                                pr-3
                                shadow-inner

                                scrollbar-thin
                                scrollbar-track-slate-900
                                scrollbar-thumb-slate-700
                                hover:scrollbar-thumb-slate-600
                            "
                        >

                            <div className="grid gap-4">

                                {urls.map((url) => (

                                    <UrlCard
                                        key={url.id}
                                        url={url}
                                        onDelete={handleDelete}
                                    />

                                ))}

                            </div>

                        </div>

                    )}

                </section>

            </main>

        </div>

    );
};

export default Dashboard;
