import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/chat");
        }
    }, [navigate]);

    const loginWithGoogle = () => {
        window.open("http://localhost:5000/api/auth/google", "_self");
    };

    const loginWithFacebook = () => {
        window.open("http://localhost:5000/api/auth/facebook", "_self");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-3xl font-bold">AI Chat App</h1>

            <button
                onClick={loginWithGoogle}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
            >
                Login with Google
            </button>

            <button
                onClick={loginWithFacebook}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
                Login with Facebook
            </button>
        </div>
    );
};

export default Login;