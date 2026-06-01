CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    github_id BIGINT NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    company VARCHAR(255),
    location VARCHAR(255),
    avatar_url VARCHAR(500),
    profile_url VARCHAR(500),
    followers INT DEFAULT 0,
    following INT DEFAULT 0,
    public_repos INT DEFAULT 0,
    total_stars INT DEFAULT 0,
    total_forks INT DEFAULT 0,
    most_starred_repo VARCHAR(255),
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);