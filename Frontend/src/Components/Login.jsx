import React, { useState } from "react";
import { apiRequest } from "../Api/AuthApi"; 

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
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
                setError(response.message);
                return;
            }

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Login Successful");

            // Later:
            // navigate("/dashboard");

        } catch (err) {
            setError("Something went wrong.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <br /><br />

                {error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>
        </div>
    );
};

export default Login;