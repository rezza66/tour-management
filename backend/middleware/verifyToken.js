import jwt from 'jsonwebtoken';

// Middleware untuk verifikasi token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    // Simpan decoded token (yang berisi id dan role) ke req.user
    req.user = decoded; // decoded biasanya berisi { id, role, iat, exp }
    next();
  });
};

// Middleware untuk verifikasi user
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'user') {
      next(); // User authenticated, lanjutkan
    } else {
      return res.status(403).json({ success: false, message: "You're not authenticated" });
    }
  });
};

// Middleware untuk verifikasi admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next(); // User is admin, lanjutkan
    } else {
      return res.status(403).json({ success: false, message: "You're not authorized" });
    }
  });
};
