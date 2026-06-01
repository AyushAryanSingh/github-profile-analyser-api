const {
  saveProfile,
  getAllProfiles,
  getProfileByUsername,
  searchProfile,
} = require("../models/profileModel");
const { analyzeProfile } = require("../services/githubService");

async function getProfiles(req, res) {
  try {
    const profiles = await getAllProfiles();
    return res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getProfile(req, res) {
  try {
    const { username } = req.params;
    const profile = await getProfileByUsername(username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function analyzeGithubProfile(req, res) {
  try {
    const { username } = req.params;
    const profile = await analyzeProfile(username);
    await saveProfile(profile);

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "GitHub user not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function searchGithubProfile(req, res) {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const profiles = await searchProfile(q);

    if (profiles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getProfiles,
  getProfile,
  analyzeGithubProfile,
  searchGithubProfile,
};
