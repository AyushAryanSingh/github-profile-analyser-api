const express = require("express");
const { getProfiles, getProfile,analyzeGithubProfile,searchGithubProfile } = require("../controllers/profileController");
const router = express.Router();

router.post("/analyze/:username",analyzeGithubProfile);
router.get("/search", searchGithubProfile);
router.get("/", getProfiles);
router.get("/:username", getProfile);


module.exports = router;
