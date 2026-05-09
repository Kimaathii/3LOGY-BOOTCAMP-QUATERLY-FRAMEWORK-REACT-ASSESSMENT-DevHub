import { useState, useEffect, useContext } from "react";
import profileService from "../services/profileService";
import { AuthContext } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await profileService.getProfile();
                setProfile(data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully!");
        navigate("/login");
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-white">Loading profile...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-red-400">Error: {error}</div>;
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-900 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
                <p className="text-slate-400 mb-8">Manage your account information</p>

                {/* Profile Card */}
                <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-6">
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-700">
                        <div className="bg-blue-600 rounded-full p-4">
                            <User size={48} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">{user?.userName || "User"}</h2>
                            <p className="text-slate-400">{user?.email || "No email"}</p>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="space-y-6">
                        <div>
                            <label className="text-slate-400 text-sm uppercase tracking-wide">Username</label>
                            <p className="text-white text-lg font-semibold mt-1">{user?.userName || "—"}</p>
                        </div>

                        <div>
                            <label className="text-slate-400 text-sm uppercase tracking-wide">Email Address</label>
                            <p className="text-white text-lg font-semibold mt-1">{user?.email || "—"}</p>
                        </div>

                        {profile?.createdAt && (
                            <div>
                                <label className="text-slate-400 text-sm uppercase tracking-wide">Member Since</label>
                                <p className="text-white text-lg font-semibold mt-1">
                                    {new Date(profile.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}

                        {profile?.lastLogin && (
                            <div>
                                <label className="text-slate-400 text-sm uppercase tracking-wide">Last Login</label>
                                <p className="text-white text-lg font-semibold mt-1">
                                    {new Date(profile.lastLogin).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Account Status */}
                    <div className="mt-8 pt-8 border-t border-slate-700">
                        <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-4">
                            <p className="text-green-100">
                                ✓ Your account is active and in good standing
                            </p>
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                <div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>

                {/* Additional Info */}
                <div className="mt-8 p-6 bg-slate-800 rounded-lg border border-slate-700">
                    <h3 className="text-white font-semibold mb-3">Account Features</h3>
                    <ul className="text-slate-400 space-y-2 text-sm">
                        <li>✓ Code Snippets Management</li>
                        <li>✓ Learning Resources Organization</li>
                        <li>✓ Task Management & Tracking</li>
                        <li>✓ Dashboard Overview</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
