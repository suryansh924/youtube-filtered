const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from React frontend
    credentials: true, // Allow cookies to be sent in requests
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));

require("./controllers/authController");

app.use(passport.initialize());
app.use(passport.session());
// Define Routes

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard"); // Update with the correct path
  }
);

// app.use("/api/videos", require("./routes/videoRoutes"));

app.get("/api/current_user", (req, res) => {
  if (!req.user) {
    return res.status(400).send("User not authenticated");
  }
  res.json(req.user); // Send user data after successful authentication
});

app.use(
  session({
    secret: "your-session-secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Start the server
app.listen(PORT || 4000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
