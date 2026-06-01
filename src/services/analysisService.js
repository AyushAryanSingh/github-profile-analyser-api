function analyzeRepositories(repos) {
  let totalStars = 0;
  let totalForks = 0;
  let mostStarredRepo = null;

  for (const repo of repos) {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;

    if (!mostStarredRepo || repo.stargazers_count > mostStarredRepo.starts) {
      mostStarredRepo = {
        name: repo.name,
        repo: repo.stargazers_count,
      };
    }
  }

  return {
    totalStars,
    totalForks,
    mostStarredRepo: mostStarredRepo?.name || null,
  };
}

module.exports={analyzeRepositories};
