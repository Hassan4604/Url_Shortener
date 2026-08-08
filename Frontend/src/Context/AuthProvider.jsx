import { useState, useEffect} from "react";
import { apiRequest } from "../Api/AuthApi";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const response = await apiRequest(
                    "/api/me"
                );

                if (response.success) {
                    setUser(response.data);
                } else {
                    localStorage.removeItem("token");
                    setUser(null);
                }

            } catch (error) {

                console.error(error);

                localStorage.removeItem("token");
                setUser(null);

            } finally {

                setLoading(false);

            }

        };

        fetchUser();

    }, []);

    return(
        <AuthContext.Provider
        value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    )

};

export default AuthProvider;