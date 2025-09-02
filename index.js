import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { UserInfo } from "./models/userModel.js";

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/api/health", (_, res) => {
  res.status(200).json({ status: "ok", message: "Api is running" });
});

app.get("/", (_, res) => {
  return res.redirect("index.html");
});

app.post("/user-info", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body" });
  }
  const { name, reason, email, phone, state, city, addressline } = req.body;
  try {
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
// Start the server
const start = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`App running on port: ${port}`);
  });
};

start();
