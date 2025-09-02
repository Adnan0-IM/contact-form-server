import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { UserInfo } from "../models/userModel.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const  PORT = process.env.PORT
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../app/public")));

app.get("/api/health", (_, res) => {
  res.status(200).json({ status: "ok", message: "Api is running" });
});

app.get("/", (_, res) => {
  return res.sendFile(path.join(__dirname, "../app/public/index.html"));
});

app.post("/user-info", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body" });
  }
  const { name, reason, email, phone, state, city, addressline } = req.body;
  try {
    await connectDB();
    const userInfo = await UserInfo.create({
      name,
      reason,
      email,
      phone,
      state,
      city,
      addressline,
    });

    res.redirect("success.html");
  } catch (error) {
    console.log("error adding user info:", error);
    res.redirect("index.html");
  }
});
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
  });
}
// Export for Vercel serverless function
export default app;
