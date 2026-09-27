import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link
        to="/products"
        className="text-2xl font-bold text-orange-400 tracking-tight"
      >
        ShopKart
      </Link>
      <div className="flex gap-5 items-center text-sm">
        {user ? (
          <>
            <span className="text-gray-300">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-orange-500 px-4 py-1.5 rounded font-medium hover:bg-orange-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-orange-400 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-orange-500 px-4 py-1.5 rounded font-medium hover:bg-orange-600 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
