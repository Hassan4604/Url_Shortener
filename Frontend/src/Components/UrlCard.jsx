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
        <div>

            <nav>

                <h2>URL Shortener</h2>

                <div>

                    <span>
                        Welcome, {user?.name || user?.email}
                    </span>

                    <button onClick={handleLogout}>
                        Logout
                    </button>

                </div>

            </nav>


            <main>

                <h1>Dashboard</h1>

                <p>
                    Create and manage your shortened URLs.
                </p>


                {/* URL Form */}

                <section>

                    <h2>Shorten a URL</h2>

                    <UrlForm
                        onUrlCreated={handleUrlCreated}
                    />

                </section>


                {/* URL List */}

                <section>

                    <h2>Your URLs</h2>

                    {error && (
                        <p>{error}</p>
                    )}


                    {loading ? (

                        <p>Loading URLs...</p>

                    ) : urls.length === 0 ? (

                        <p>
                            You haven't shortened any URLs yet.
                        </p>

                    ) : (

                        <div>

                            {urls.map((url) => (

                                <UrlCard
                                    key={url.id}
                                    url={url}
                                    onDelete={handleDelete}
                                />

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
};

export default Dashboard;
