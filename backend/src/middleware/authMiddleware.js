require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const path = require("path");

const userFilePath = path.join(__dirname, "../data/users.json");

async function verifyToken(req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    // Always keep token payload accessible
    req.auth = decoded; // { id, email, role }

    const text = await fs.readFile(userFilePath, "utf8");
    const users = text ? JSON.parse(text) : [];

    // Ensure numeric compare
    const userId = Number(decoded.id);
    const user = users.find((u) => Number(u.id) === userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...safeUser } = user;

    // Put safe user on req.user (used by controllers)
    req.user = safeUser;

    next();
  } catch (err) {
    console.error("Token verify error: ", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
