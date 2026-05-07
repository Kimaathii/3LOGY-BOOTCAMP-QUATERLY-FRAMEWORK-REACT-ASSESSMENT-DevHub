import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

function RegisterPage() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const { register } = useContext(AuthContext);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            await register({
                userName: formData.userName,
                email: formData.email,
                password: formData.password,
            });
            toast.success("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            setError(error.response?.data?.error || "Registration failed");
            setFormData({ ...formData, password: "", confirmPassword: "" });
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
    };
    const focusStyle = {
        border: "1px solid rgba(99,102,241,0.7)",
        boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
    };
    const blurStyle = {
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "none",
    };

    const inputClass =
        "w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all duration-200";

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ background: "linear-gradient(135deg, #0f1729 0%, #1a1f3a 50%, #0f1729 100%)" }}
        >
            {/* Decorative background circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #3b4a8a 0%, transparent 70%)" }} />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #2d3a7a 0%, transparent 70%)" }} />
                <div className="absolute top-1/3 right-10 w-32 h-32 rounded-full opacity-10 border border-indigo-400" />
                <div className="absolute bottom-1/3 left-10 w-20 h-20 rounded-full opacity-10 border border-indigo-400" />
            </div>

            {/* Card */}
            <div
                className="relative w-full max-w-sm rounded-2xl overflow-hidden"
                style={{
                    background: "rgba(18, 24, 48, 0.85)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                }}
            >
                {/* Header — fully padded */}
                <div className="text-center pt-8 px-8 mb-7">
                    <p className="text-2xl mb-4">🗂️ <span className="text-white font-bold text-2xl">DevShelf</span></p>
                    <h1 className="text-3xl font-bold text-white mb-2">Register now</h1>
                    <p className="text-slate-400 text-sm">Create an account with us today</p>
                </div>

                {/* Error */}
                {error && (
                    <div
                        className="mx-8 mb-5 px-4 py-3 rounded-lg text-sm text-red-300"
                        style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}
                    >
                        {error}
                    </div>
                )}

                {/* Form — padded on all sides */}
                <form onSubmit={handleSubmit} className="space-y-4 px-8">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">User Name</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="john_doe"
                            required
                            className={inputClass}
                            style={inputStyle}
                            onFocus={e => Object.assign(e.target.style, focusStyle)}
                            onBlur={e => Object.assign(e.target.style, blurStyle)}
                        />
                    </div>

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
                            className={inputClass}
                            style={inputStyle}
                            onFocus={e => Object.assign(e.target.style, focusStyle)}
                            onBlur={e => Object.assign(e.target.style, blurStyle)}
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
                                className={`${inputClass} pr-11`}
                                style={inputStyle}
                                onFocus={e => Object.assign(e.target.style, focusStyle)}
                                onBlur={e => Object.assign(e.target.style, blurStyle)}
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

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••••••"
                                required
                                className={`${inputClass} pr-11`}
                                style={inputStyle}
                                onFocus={e => Object.assign(e.target.style, focusStyle)}
                                onBlur={e => Object.assign(e.target.style, blurStyle)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                        {isLoading ? "Creating your account..." : "Register"}
                    </button>
                </form>

                {/* Sign in link */}
                <p className="text-center text-sm text-slate-500 px-8 mt-6 pb-8">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;