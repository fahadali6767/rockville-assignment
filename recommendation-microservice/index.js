require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const NEST_API_URL = process.env.NEST_API_URL || "http://localhost:3000";

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Fetch data from Nest.js API
async function fetchFromNestAPI(endpoint, token) {
  try {
    const response = await axios.get(`${NEST_API_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching from Nest API (${endpoint}):`, error.message);
    return null;
  }
}
app.post("/recommendations", async (req, res) => {
  const { token, favoriteCategories } = req.body;
  try {
    const moviesData = await fetchFromNestAPI("/movies", token);
    let filteredMovies = moviesData.filter((row) => {
      return favoriteCategories.includes(row.category);
    });
    res.json(filteredMovies);
  } catch (error) {
    console.error("Error fetching movies data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
