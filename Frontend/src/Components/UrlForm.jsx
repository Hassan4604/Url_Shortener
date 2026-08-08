import React, { useState } from "react";
import { apiRequest } from "../Api/AuthApi";
import { toast } from "react-toastify";

const UrlForm = ({ onUrlCreated }) => {

    const [form, setForm] = useState({
        original_url: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


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
                "/api/urls",
                "POST",
                form
            );

            if (!response.success) {

                setError(
                    response.message || "Failed to create short URL."
                );

                return;
            }


            // Add newly created URL to dashboard
            if (onUrlCreated) {
                onUrlCreated(response.data);
            }


            toast.success("Short URL created successfully!");


            setForm({
                original_url: ""
            });

        } catch (err) {

            console.error(err);

            setError("Something went wrong. Please try again.");

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="w-full">

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
            >

                {/* URL Input */}

                <div className="relative flex-1">

                    <input
                        type="url"
                        name="original_url"
                        placeholder="https://example.com/your-long-url"
                        value={form.original_url}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    />

                </div>


                {/* Submit Button */}

                <button
                    type="submit"
                    disabled={loading}
                    className="flex min-w-[120px] items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-500 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    {loading ? (

                        <span className="flex items-center gap-2">

                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                            Creating...

                        </span>

                    ) : (

                        "Shorten URL"

                    )}

                </button>

            </form>


            {/* Error */}

            {error && (

                <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">

                    <span>⚠</span>

                    <p>
                        {error}
                    </p>

                </div>

            )}

        </div>
    );
};

export default UrlForm;
