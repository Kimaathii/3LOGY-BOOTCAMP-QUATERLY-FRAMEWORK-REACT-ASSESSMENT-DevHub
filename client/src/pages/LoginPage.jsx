import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(formData.email, formData.password);
            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.error || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #0f1729 0%, #1a1f3a 50%, #0f1729 100%)" }}>
            {/* Decorative background circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #3b4a8a 0%, transparent 70%)" }} />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #2d3a7a 0%, transparent 70%)" }} />
                <div className="absolute top-1/3 right-10 w-32 h-32 rounded-full opacity-10 border border-indigo-400" />
                <div className="absolute bottom-1/3 left-10 w-20 h-20 rounded-full opacity-10 border border-indigo-400" />
            </div>

            {/* Card */}
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden" style={{ background: "rgba(18, 24, 48, 0.85)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}>
                {/* Header */}
                <div className="text-center pt-8 px-8 mb-8">
                    <p className="text-2xl mb-4">🗂️ <span className="text-white font-bold text-2xl">DevShelf</span></p>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-400 text-sm">Sign in to your account</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mx-8 mb-5 px-4 py-3 rounded-lg text-sm text-red-300" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 px-8">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all duration-200"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                            onFocus={e => { e.target.style.border = "1px solid rgba(99,102,241,0.7)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                            onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••••••"
                                required
                                className="w-full px-4 py-3 pr-11 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all duration-200"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                                onFocus={e => { e.target.style.border = "1px solid rgba(99,102,241,0.7)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                                onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: "linear-gradient(135deg, #4f46e5, #6366f1)", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}
                        onMouseEnter={e => !isLoading && (e.target.style.boxShadow = "0 6px 24px rgba(99,102,241,0.6)")}
                        onMouseLeave={e => (e.target.style.boxShadow = "0 4px 20px rgba(99,102,241,0.4)")}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Sign up link */}
                <p className="text-center text-sm text-slate-500 px-8 mt-6 pb-8">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;