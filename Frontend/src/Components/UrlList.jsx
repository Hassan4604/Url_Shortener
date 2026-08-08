import React, { useEffect, useState } from "react";
import { apiRequest } from "../Api/AuthApi";

const UrlList = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchList = async () => {
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
            setError("Something went wrong.");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {urls.length === 0 ? (
                <p>No URLs found.</p>
            ) : (
                urls.map((url) => (
                    <div key={url.id}>
                        <p>
                            <strong>Original:</strong> {url.original_url}
                        </p>

                        <p>
                            <strong>Short Code:</strong> {url.short_code}
                        </p>

                        <p>
                            <strong>Clicks:</strong> {url.clicks}
                        </p>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};

export default UrlList;

