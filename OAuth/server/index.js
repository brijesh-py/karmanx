require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const setCookie = require("./services/set-cookie");
const { validateToken } = require("./middlewares");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to GitHub OAuth API");
});

app.get("/auth/github", (req, res) => {
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user,repo,security_events`;
  res.redirect(githubAuthURL);
});

app.get("/auth/github/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );
    const access_token = response.data.access_token;
    setCookie(res, access_token);
    return res.redirect(`${process.env.FRONTEND_URL}/v2/profile/github`);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/user/profile/github", validateToken, async (req, res) => {
  try {
    const access_token = req.cookies.access_token;

    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    res.json({ user: response.data });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/auth/google", (req, res) => {
  const googleAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.G_CLIENT_ID}&rediect_uri=http://localhost:${PORT}/auth/google/callback&response_type=code&sope=profile email`;
  res.redirect(googleAuthURL);
});

app.get("/auth/google/callback", (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Code not found");
  }
  try {
    const response = axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.G_CLIENT_ID,
        client_secret: process.env.G_CLIENT_SECRET,
        redirect_uri: `http://localhost:${PORT}/auth/google/callback`,
        grant_type: "authorization_code",
        code,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const access_token = response.data.access_token;
    setCookie(res, access_token);
    return res.redirect(`${process.env.FRONTEND_URL}/v2/profile/google`);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
