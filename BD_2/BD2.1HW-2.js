const express = require("express");

const app = express();
const PORT = 3000;

// Define this object on the server
const githubPublicData = {
  username: "swati123",
  fullName: "Swati Roy",
  email: "swatiroy@duck.com",
  repositories: 26,
  gists: 12,
  joinedOn: "Jan 2024",
};

// Exercise 1: Profile URL
function getProfileURL() {
  const profileUrl = "https://github.com/" + githubPublicData?.username;
  return { profileUrl };
}
app.get("/github-profile", (req, res) => {
  res.status(200).json(getProfileURL());
});

//Exercise 2: Public Email
function getPublicEmail() {
  return { publicEmail: githubPublicData?.email };
}

app.get("/github-public-email", (req, res) => {
  res.status(200).json(getPublicEmail());
});

// Exercise 3: Get Repos Count
function getReposCount() {
  return { reposCount: githubPublicData?.repositories };
}

app.get("/github-repos-count", (req, res) => {
  res.status(200).json(getReposCount());
});

// Exercise 4: Get Gists Count
function getGistsCount() {
  return { gistsCount: githubPublicData?.gists };
}

app.get("/github-gists-count", (req, res) => {
  res.status(200).json(getGistsCount());
});

// Exercise 5: Get User Bio
function getUserBio() {
  const bio = {
    fullName: githubPublicData?.fullName,
    joinedOn: githubPublicData?.joinedOn,
    email: githubPublicData?.email,
  };
  return bio;
}
app.get("/github-user-bio", function (req, res) {
  res.status(200).json(getUserBio());
});

// Exercise 6: Repository URL
function getRepoURL(repoName) {
  const repoURL = {
    repoUrl:
      "https://github.com/" + githubPublicData?.username + "/" + repoName,
  };
  return repoURL;
}

app.get("/github-repo-url", (req, res) => {
  const repoName = req.query?.repoName;
  res.status(200).json(getRepoURL(repoName));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
