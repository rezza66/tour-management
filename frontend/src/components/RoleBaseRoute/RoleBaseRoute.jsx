import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // Jika pengguna tidak login, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Jika pengguna tidak memiliki role yang diizinkan, redirect ke halaman akses ditolak
    return <Navigate to="/access-denied" />;
  }

  // Jika pengguna memiliki role yang diizinkan, render children (komponen yang diizinkan)
  return children;
};

export default RoleBasedRoute;
