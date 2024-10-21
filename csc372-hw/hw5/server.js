require('dotenv').config(); // Load environment variable (i.e. the API key) from .env file
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// API endpoint to get GitHub repositories
app.get('/api/github/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching repositories');
    }
});

// API endpoint to get languages for a specific repository
app.get('/api/github/:username/:repo/languages', async (req, res) => {
    const { username, repo } = req.params;
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/languages`, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching languages');
    }
});

// API endpoint to get the number of commits for a specific repository
app.get('/api/github/:username/:repo/commits', async (req, res) => {
    const { username, repo } = req.params;
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/commits`, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
            }
        });
        res.json({ numberOfCommits: response.data.length });
    } catch (error) {
        res.status(500).send('Error fetching commits');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
