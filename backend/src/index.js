import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json()); //parse incoming json requests(Like. POST)
app.use(cookieParser()); //parse incoming cookie requests
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow all origins in development
      if (process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }

      // In production, be more restrictive
      const allowedDomains = [
        "https://yourproductiondomain.com",
        "https://www.yourproductiondomain.com",
      ];

      if (!origin || allowedDomains.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, "0.0.0.0", () => {
  // server comes from your socket.js file, which wraps the Express app inside an HTTP server instance.
  console.log("server is running on PORT:" + PORT);
  console.log("Server accessible from all network interfaces");
  connectDB();
});
