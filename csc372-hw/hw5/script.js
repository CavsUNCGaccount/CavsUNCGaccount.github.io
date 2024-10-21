
//Show my own page when loading for the first time
document.addEventListener('DOMContentLoaded', () => {
    const username = 'CavsUNCGaccount';
    searchUserCavsUNCGAccount(username);
});

// Show my own profile
const searchUserCavsUNCGAccount = async (username) => {
    const galleryContainer = document.getElementById('gallery-container');

    galleryContainer.innerHTML = '';

    try {
        const response = await fetch(`/api/github/${username}`);
        if (!response.ok) {
            throw new Error('Error fetching repositories');
        }

        const repos = await response.json();

        if (repos.length === 0) {
            galleryContainer.innerHTML = `<p>No repositories found for user: ${username}</p>`;
        } else {
            for (const repo of repos) {

                const languagesResponse = await fetch(`/api/github/${username}/${repo.name}/languages`);
                const languages = await languagesResponse.json();
                const languageList = Object.keys(languages).join(', ');

                const commitsResponse = await fetch(`/api/github/${username}/${repo.name}/commits`);
                const commitsData = await commitsResponse.json();
                const numberOfCommits = commitsData.numberOfCommits;

                const repoCard = `
                    <article class="card">
                        <h3>${repo.name}</h3>
                        <img class="github-icon" src="images/github-icon.png" alt="GitHub Icon">
                        <p>${repo.description ? repo.description : "No description available"}</p>
                        <p>Link to the repository: <a href="${repo.html_url}" target="_blank">${repo.name}</a></p>
                        <ul class="card-details">
                            <li>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</li>
                            <li>Created: ${new Date(repo.created_at).toLocaleDateString()}</li>
                            <li>Number of watchers: ${repo.watchers_count}</li>
                            <li>Number of commits: ${numberOfCommits}</li>
                            <li>Languages: ${languageList ? languageList : "Not specified"}</li>
                        </ul>
                    </article>
                `;
                galleryContainer.insertAdjacentHTML('beforeend', repoCard);
            }
        }
    } catch (error) {
        console.error(error);
        galleryContainer.innerHTML = `<p>Error fetching repositories for user: ${username}</p>`;
    }
}

// Search for other users
const searchUser = async (event) => {
    event.preventDefault();
    const username = document.getElementById('site-search').value.trim();
    const galleryContainer = document.getElementById('gallery-container');

    if (!username) {
        alert("Please enter a valid GitHub username.");
        return;
    }

    galleryContainer.innerHTML = '';

    try {
        const response = await fetch(`/api/github/${username}`);
        if (!response.ok) {
            throw new Error('Error fetching repositories');
        }

        const repos = await response.json();

        if (repos.length === 0) {
            galleryContainer.innerHTML = `<p>No repositories found for user: ${username}</p>`;
        } else {
            for (const repo of repos) {

                const languagesResponse = await fetch(`/api/github/${username}/${repo.name}/languages`);
                const languages = await languagesResponse.json();
                const languageList = Object.keys(languages).join(', ');

                const commitsResponse = await fetch(`/api/github/${username}/${repo.name}/commits`);
                const commitsData = await commitsResponse.json();
                const numberOfCommits = commitsData.numberOfCommits;

                const repoCard = `
                    <article class="card">
                        <h3>${repo.name}</h3>
                        <img class="github-icon" src="images/github-icon.png" alt="GitHub Icon">
                        <p>${repo.description ? repo.description : "No description available"}</p>
                        <p>Link to the repository: <a href="${repo.html_url}" target="_blank">${repo.name}</a></p>
                        <ul class="card-details">
                            <li>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</li>
                            <li>Created: ${new Date(repo.created_at).toLocaleDateString()}</li>
                            <li>Number of watchers: ${repo.watchers_count}</li>
                            <li>Number of commits: ${numberOfCommits}</li>
                            <li>Languages: ${languageList ? languageList : "Not specified"}</li>
                        </ul>
                    </article>
                `;
                galleryContainer.insertAdjacentHTML('beforeend', repoCard);
            }
        }
    } catch (error) {
        console.error(error);
        galleryContainer.innerHTML = `<p>Error fetching repositories for user: ${username}</p>`;
    }
}
