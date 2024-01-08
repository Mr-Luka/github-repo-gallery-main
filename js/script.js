// This div is where your profile information will appear
const overview = document.querySelector(".overview");

//Unordered list that will display the repos list
const repoList = document.querySelector(".repo-list");

// Repos class - where all my repo information will appear
const repos = document.querySelector(".repos");

// repo-data  Section where the individual repo data will appear
const repoData = document.querySelector(".repo-data");

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

// Click event for the repo list
repoList.addEventListener("click", function (e){
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specRepoInfo(repoName);
    }
});


// Function to get Specific Repo Info
const specRepoInfo = async function (repoName) {
    const specRepository = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specRepository.json();
    console.log(repoInfo);

    // creating an array of Languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (let language in languageData) {
        languages.push(language);
        console.log(languages);
        displayRepoInfo(repoInfo, languages);
    }
}

// Function to display Specific Repo Info
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(newDiv);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
}
