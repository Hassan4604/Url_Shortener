import React, { useState } from "react";
import { apiRequest } from "../Api/AuthApi";
import { toast } from "react-toastify";

const BASE_SHORT_URL =
    "http://localhost/url_shortener/Backend/Public";

const UrlCard = ({ url, onDelete }) => {

    const [deleting, setDeleting] = useState(false);
    const [copied, setCopied] = useState(false);

    const shortUrl = `${BASE_SHORT_URL}/${url.short_code}`;


    const handleCopy = async () => {

        try {

            await navigator.clipboard.writeText(shortUrl);

            setCopied(true);

            toast.success("Short URL copied!");

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (error) {

            console.error(error);

            toast.error("Failed to copy URL.");

        }
    };


    const handleDelete = async () => {

        setDeleting(true);

        try {

            const response = await apiRequest(
                `/api/urls/${url.id}`,
                "DELETE"
            );

            if (!response.success) {

                toast.error(
                    response.message || "Failed to delete URL."
                );

                return;
            }

            toast.success("URL deleted successfully!");

            onDelete(url.id);

        } catch (error) {

            console.error(error);

            toast.error(
                "Something went wrong while deleting the URL."
            );

        } finally {

            setDeleting(false);

        }
    };


    return (

        <div className="group rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg transition duration-200 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl">

            <div className="mb-5 flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Original URL
                    </p>

                    <a
                        href={url.original_url}
                        target="_blank"
                        rel="noreferrer"
                        title={url.original_url}
                        className="block truncate text-sm text-slate-300 transition hover:text-blue-400"
                    >
                        {url.original_url}
                    </a>

                </div>


                <div className="shrink-0 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-center">

                    <p className="text-xs text-slate-500">
                        Clicks
                    </p>

                    <p className="text-lg font-bold text-slate-200">
                        {url.clicks}
                    </p>

                </div>

            </div>


            <div className="mb-5 h-px bg-slate-800"></div>


            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">

                <div className="mb-2 flex items-center justify-between">

                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                        Short URL
                    </p>

                    <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
                        Active
                    </span>

                </div>


                <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block break-all text-sm font-medium text-blue-400 transition hover:text-blue-300"
                >
                    {shortUrl}
                </a>

            </div>


            <div className="mt-5 flex flex-wrap gap-3">

                <button
                    onClick={handleCopy}
                    className={`rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm transition duration-200 active:scale-95 ${
                        copied
                            ? "bg-green-600 text-white hover:bg-green-500"
                            : "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-md"
                    }`}
                >
                    {copied ? "✓ Copied" : "Copy URL"}
                </button>


                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400 transition duration-200 hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {deleting ? (

                        <span className="flex items-center gap-2">

                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400"></span>

                            Deleting...

                        </span>

                    ) : (

                        "Delete"

                    )}
                </button>

            </div>

        </div>
    );
};

export default UrlCard;
