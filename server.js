const express = require("express");
app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./config/passport");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

initializePassport(passport);

// DB Config
const db = require("./config/keys").MongoURI;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The server is listening on http://localhost:${PORT}`);
});

const localdb = "mongodb://localhost/write-ideas";

// for deprecation warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// Connect
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "secret working or not",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport config
app.use(passport.initialize());
app.use(passport.session());

// allow cross domain requests
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api", require("./routes/index"));
app.use("/api/users", require("./routes/user"));
app.use("/api/", require("./routes/writings"));

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}
