const axios = require("axios");
const { analyzeRepositories } = require("./analysisService");

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

async function getUserProfile(username) {
  const { data } = await axios.get(
    `${process.env.GITHUB_API_URL}/users/${username}`,
    { headers }
  );

  return {
    githubId: data.id,
    username: data.login,
    name: data.name,
    bio: data.bio,
    company: data.company,
    location: data.location,
    avatarUrl: data.avatar_url,
    profileUrl: data.html_url,
    followers: data.followers,
    following: data.following,
    publicRepos: data.public_repos,
    createdAt: data.created_at,
  };
}

async function getUserRepositories(username) {
  const { data } = await axios.get(
    `${process.env.GITHUB_API_URL}/users/${username}/repos`,
    { headers }
  );

  return data;
}

async function analyzeProfile(username) {
  const profile = await getUserProfile(username);
  const repo = await getUserRepositories(username);
  const analysis = analyzeRepositories(repo);

  return {
    ...profile,
    ...analysis,
  };
}

module.exports = {
  getUserProfile,
  getUserRepositories,
  analyzeProfile,
};