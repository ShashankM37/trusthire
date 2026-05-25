const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();


// =========================
// ROUTES
// =========================
const authRoutes = require(
  "./routes/authRoutes"
);

const referralRoutes = require(
  "./routes/referralRoutes"
);

const jobRoutes = require(
  "./routes/jobRoutes"
);

const applicationRoutes = require(
  "./routes/applicationRoutes"
);

const uploadRoutes = require(
  "./routes/uploadRoutes"
);


// =========================
// APP
// =========================
const app = express();


// =========================
// MIDDLEWARE
// =========================
app.use(cors());

app.use(express.json());


// =========================
// API ROUTES
// =========================
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/referrals",
  referralRoutes
);

app.use(
  "/api/jobs",
  jobRoutes
);

app.use(
  "/api/my-applications",
  applicationRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);


// =========================
// TEST ROUTE
// =========================
app.get("/", (req, res) => {

  res.send(
    "TrustHire Backend Running 🚀"
  );

});


// =========================
// DATABASE CONNECTION
// =========================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {

    console.log(
      "MongoDB Connected 🚀"
    );

    // START SERVER
    app.listen(
      process.env.PORT || 5000,
      () => {

        console.log(
          `Server running on port ${
            process.env.PORT || 5000
          } 🚀`
        );

      }
    );

  })
  .catch((err) => {

    console.log(
      "MongoDB Connection Error:",
      err
    );

  });