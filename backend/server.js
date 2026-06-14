const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const helmet = require("helmet");

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
const referralRequestRoutes = require(
  "./routes/referralRequestRoutes"
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
 
const adminRoutes = require(
  "./routes/adminRoutes"
);
const opportunityRoutes = require("./routes/opportunityRoutes");

// =========================
// APP
// =========================
const app = express();



// =========================
// MIDDLEWARE
// =========================
app.use(cors());

app.use(express.json());

app.use(helmet());




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
  "/api/referral-requests",
  referralRequestRoutes
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
  "/api/applications",
  applicationRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/opportunities",
  opportunityRoutes
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
