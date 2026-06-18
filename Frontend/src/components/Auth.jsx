import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { loginAPI, registerAPI } from "../services/api.js";
import "./Auth.css";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            let userData;
            if (isLogin) {
                userData = await loginAPI(email, password);
            } else {
                userData = await registerAPI(name, email, password);
            }
            login(userData);
        } catch (err) {
            setError(err.message || "Authentication failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    )}
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="auth-btn">{isLogin ? "Login" : "Sign Up"}</button>
                </form>
                <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default Auth;
