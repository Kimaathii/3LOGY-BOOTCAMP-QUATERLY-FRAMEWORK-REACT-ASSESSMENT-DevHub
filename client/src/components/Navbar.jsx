import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Determine if link is active based on current location
  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white';
  };

  // Navigation links configuration
  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/snippets', label: 'Snippets' },
    { path: '/resources', label: 'Resources' },
    { path: '/tasks', label: 'Tasks' }
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center hover:opacity-80 transition-opacity">
            <span className="text-2xl font-bold text-blue-400">DevShelf</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 px-1 border-b-2 border-transparent transition-colors ${isActive(
                  link.path
                )}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm">
              Hello, <span className="font-semibold text-white">{user?.userName}</span>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
