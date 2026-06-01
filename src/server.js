require("dotenv").config();

const { analyzeProfile } = require("./services/githubService");
const { saveProfile } = require("./models/profileModel");

async function test() {
  try {
    console.log("Fetching and analyzing profile...\n");

    const profile = await analyzeProfile("torvalds");

    console.log("Profile Analysis:");
    console.log(profile);

    console.log("\nSaving to database...\n");

    const result = await saveProfile(profile);

    console.log("Database Result:");
    console.log(result);
  } catch (error) {
    console.error("Test Failed:");
    console.error(error.message);
  }
}

test();