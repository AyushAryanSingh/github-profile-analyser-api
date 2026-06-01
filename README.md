# GitHub Profile Analyzer API

A REST API built with Node.js, Express, and MySQL that fetches GitHub user data, analyzes repository statistics, stores profile information in a MySQL database, and provides endpoints for retrieval and search.

## Live API

Base URL:

https://github-profile-analyser-api-1.onrender.com

### Available Endpoints

#### Analyze a GitHub Profile

POST /api/profiles/analyze/:username

Example:

https://github-profile-analyser-api-1.onrender.com/api/profiles/analyze/torvalds

#### Get All Profiles

GET /api/profiles

Example:

https://github-profile-analyser-api-1.onrender.com/api/profiles

#### Get Profile By Username

GET /api/profiles/:username

Example:

https://github-profile-analyser-api-1.onrender.com/api/profiles/torvalds

#### Search Profiles

GET /api/profiles/search?q=keyword

Example:

https://github-profile-analyser-api-1.onrender.com/api/profiles/search?q=tor



## Features

* Fetch GitHub user profiles using the GitHub REST API
* Analyze public repositories
* Calculate total stars across repositories
* Calculate total forks across repositories
* Identify the most starred repository
* Store analyzed profiles in MySQL
* Prevent duplicate entries using upsert functionality
* Retrieve all analyzed profiles
* Retrieve a profile by username
* Search profiles by username or name

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub REST API
* Axios
* mysql2
* dotenv

---

## Project Structure


```text
github-profile-analyzer-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── profileController.js
│   │
│   ├── models/
│   │   └── profileModel.js
│   │
│   ├── routes/
│   │   └── profileRoutes.js
│   │
│   ├── services/
│   │   ├── githubService.js
│   │   └── analysisService.js
│   │
│   ├── app.js
│   └── server.js
│
├── database/
│   └── schema.sql
│
│
├── postman/
│   └── GitHub-Profile-Analyzer.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```



---

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd github-profile-analyzer-api
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root directory:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=github_analyzer

GITHUB_API_URL=https://api.github.com
GITHUB_TOKEN=
```

### Create Database

Run the following command in MySQL:

```sql
CREATE DATABASE github_analyzer;
```

### Import Database Schema

Execute the schema file to create the required table:

```bash
mysql -u root -p github_analyzer < database/schema.sql
```

Alternatively, open `database/schema.sql` in MySQL Workbench and execute the script.


### Run the Application

Development mode:

```bash
npm run dev
```

or

```bash
node src/server.js
```

Server runs on:

```text
http://localhost:5000
```

---

## API Endpoints

### 1. Analyze and Store a GitHub Profile

Fetches data from GitHub, analyzes repositories, and stores the profile in the database.

**Endpoint**

```http
POST /api/profiles/analyze/:username
```

**Example**

```http
POST /api/profiles/analyze/torvalds
```

**Response**

```json
{
  "success": true,
  "data": {
    "githubId": 1024025,
    "username": "torvalds",
    "name": "Linus Torvalds",
    "followers": 305000,
    "following": 0,
    "publicRepos": 11,
    "totalStars": 247000,
    "totalForks": 63700,
    "mostStarredRepo": "1590A"
  }
}
```

---

### 2. Get All Profiles

Returns all analyzed profiles stored in the database.

**Endpoint**

```http
GET /api/profiles
```

**Response**

```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

---

### 3. Get Profile by Username

Returns a specific analyzed profile from the database.

**Endpoint**

```http
GET /api/profiles/:username
```

**Example**

```http
GET /api/profiles/torvalds
```

---

### 4. Search Profiles

Searches stored profiles by username or name.

**Endpoint**

```http
GET /api/profiles/search?q=<search_term>
```

**Example**

```http
GET /api/profiles/search?q=tor
```

**Response**

```json
{
  "success": true,
  "data": [
    {
      "username": "torvalds"
    }
  ]
}
```

---

## Repository Analysis

For every analyzed GitHub user, the application calculates:

* Total Stars
* Total Forks
* Most Starred Repository

Example:

```json
{
  "totalStars": 247059,
  "totalForks": 63711,
  "mostStarredRepo": "1590A"
}
```

---

## Database Fields

The application stores the following information:

* GitHub ID
* Username
* Name
* Bio
* Company
* Location
* Avatar URL
* Profile URL
* Followers
* Following
* Public Repositories
* Total Stars
* Total Forks
* Most Starred Repository
* Analysis Timestamp
* Created At
* Updated At

---

## Error Handling

The API returns appropriate HTTP status codes:

| Status Code | Description                                |
| ----------- | ------------------------------------------ |
| 200         | Successful request                         |
| 400         | Invalid request or missing query parameter |
| 404         | Profile not found                          |
| 500         | Internal server error                      |

Example:

```json
{
  "success": false,
  "message": "GitHub user not found"
}
```

---

## Future Improvements

* Top programming language analysis
* Pagination support
* API rate limiting
* Authentication and authorization
* Scheduled profile refresh
* Docker containerization
* Unit and integration testing

---

## Author

**Ayush Aryan Singh**

Built as a backend development project using Node.js, Express, MySQL, and the GitHub REST API.
