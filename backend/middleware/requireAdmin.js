// Blocks the request unless the correct admin password is sent in a header
function requireAdmin(req, res, next) {
  const password = req.headers["x-admin-password"];

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}

module.exports = requireAdmin;