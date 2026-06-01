const pool = require("../config/db");

async function saveProfile(profile) {
  const query = `
    INSERT INTO PROFILES(
    github_id,
    username,
    name,
    bio,
    company,
    location,
    avatar_url,
    profile_url,
    followers,
    following,
    public_repos,
    total_stars,
    total_forks,
    most_starred_repo
    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

    ON DUPLICATE KEY UPDATE
    name=VALUES(name),
    bio=VALUES(bio),
    company=VALUES(company),
    location=VALUES(location),
    avatar_url=VALUES(avatar_url),
    profile_url=VALUES(profile_url),
    followers=VALUES(followers),
    following=VALUES(following),
    public_repos=VALUES(public_repos),
    total_stars=VALUES(total_stars),
    total_forks=VALUES(total_forks),
    most_starred_repo=VALUES(most_starred_repo)
    `;

  const values = [
    profile.githubId,
    profile.username,
    profile.name,
    profile.bio,
    profile.company,
    profile.location,
    profile.avatarUrl,
    profile.profileUrl,
    profile.followers,
    profile.following,
    profile.publicRepos,
    profile.totalStars,
    profile.totalForks,
    profile.mostStarredRepo,
  ];

  const [result] = await pool.query(query, values);

  return result;
}

async function getAllProfiles() {
  const query = `
    SELECT *
    FROM profiles
    ORDER BY analyzed_at DESC
  `;

  const [rows] = await pool.query(query);

  return rows;
}

async function getProfileByUsername(username) {
  const query = `
  SELECT *
  FROM profiles
  WHERE username =?
  `;
  const [rows] = await pool.query(query,[username]);

  return rows[0];
}

async function searchProfile(searchString){
  const query = `
  SELECT *
  FROM profiles
  WHERE username LIKE ?
  OR name LIKE ?
  `;
  const search = `%${searchString}%`;
  
  const [rows] = await pool.query(query,[search,search]);

  return rows;

}

module.exports = { saveProfile, getAllProfiles, getProfileByUsername,searchProfile };
