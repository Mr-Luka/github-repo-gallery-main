// This div is where your profile information will appear
const overview = document.querySelector(".overview");

const repoList = document.querySelector(".repo-list");

const username = "Mr-Luka";

const fetchGithHub = async function () {
    const response = await fetch (`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    displayUserInfo(data);
}
fetchGithHub();


// Function that will display the fetched user information on the page
const displayUserInfo = function (data) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(newDiv);

    getRepos();
}

// ASYNC function that will fetch all my repos
const getRepos = async function () {
    const response = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await response.json();
    console.log(repoData);
    showRepoInfo(repoData);
}

// Display Info about my Repos
const showRepoInfo = function (repos) {
    for (let repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
}