import React, { useState } from "react";
import { apiRequest } from "../Api/AuthApi";

const UrlForm = () => {

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
                setError(response.message);
                return;
            }

            alert("Short URL created successfully!");

            setForm({
                original_url: ""
            });

            // Later we'll refresh the URL list here.

        } catch (err) {

            console.error(err);
            setError("Something went wrong.");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>

                <input
                    type="url"
                    name="original_url"
                    placeholder="https://example.com"
                    value={form.original_url}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Shorten"}
                </button>

            </form>

            {error && (
                <p>{error}</p>
            )}

        </div>
    );
};

export default UrlForm;