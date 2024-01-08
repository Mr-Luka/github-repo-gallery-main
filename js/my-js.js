// Div where my profile information will appear
const overview = document.querySelector(".overview");

// Unordered list that's gonna display the list of all of my repos
const repoList = document.querySelector(".repo-list");

// Selects the section with the class of repos where all my repo information appears
const repos = document.querySelector(".repos");

// repo data where the Individual repo data will appear
const repoData = document.querySelector(".repo-data");

// Button that will take me back to repo Gallery
const backToRepoButton = document.querySelector(".view-repos");

// filter input will select filter repos to select the input with the Search by name placeholder
const filterInput = document.querySelector(".filter-repos");


const username = "Mr-Luka";

// Function that will capture the API JSON data from my GitHub profile using GitHub API address
// I will target the users and add my username ${username} to the endpoint
const gitUserInfo = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();      // I am resolving the JSON response
    console.log(data);                      // console.log the DATA so I can see the properties in it
                                             // becasue I will need them for later.
     displayUserInfo(data);   //calling the function I just made, function that fetches and displays user information and passing data as parameter because I am fetching and displaying from DATA

}
gitUserInfo();




// Fetch & Display USER INFORMATION

// this function will fetch and then later display all my (user) information and will have the DATA
// as the parameter becasue I will be fetching and displaying from the DATA.
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div`
  overview.append(div);
  //To fetch and display, first I need to make an empty DIV, adn then add it the class of "user-info",
  // "user-info" has been already made in the CSS waitng to be called upon.
  // Right after that, I have to populate that div by adding to its HTML, green: school provided, but essentially thats what text is gonna be there, 
  // I only used ${} to populate automatically data.name, data.bio .... 
  // once I populated that DIV, now I have to Append it / add it to the OVERVIEW that has a class of .overview
  // and that's where all my information will appear.
  fetchRepos();
};



// ASYNC function that will Fetch all of MY REPOS
const fetchRepos = async function (){
    const userRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await userRepos.json();
    console.log(repoData);
    // This Asynchronous - ASYNC function will serve to fetch all of my Repos by first fetching the 
    //userRepos and sorting them by the leatest updated and 100 per page, I took that part of the code from
    // List Repositories of USER (school link), after ${username}/repos? I added the rest, updated and 100 per page.
    // after that I had to return the JSON response.
    // Then we will have to call this function inside the displayUserInfo

    displayRepos(repoData);
}



// Function that will DISPPLAY INFORMATION about MY REPOS
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    // Added this later, this is to show the search bar

    for (let repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
    // This function will display repos, by displaying it, it has to create a listed item for EACH REPO,
    // We are gonna put a parameter REPOS so that the functio accepts the data returned from my last API call repoData.
    // inside the functio I will have to loop through all the repos, and for the each repo I will create a listed item
    // and I will create a class "repo" for the each REPO in the REPOS loop.
    //Then I will populate the HTML of that listed item of each repo by adding h3 element and ${repo.name} - element with the repo name.
    // Once we have the listed Item all arranged, we need to append - add it to the unordered list of repoList
    //then I have to call this function inside the fetchRepos with the parameter/argument of the JSON response data for the repos
    // because we are now displaying it.
};





// Click event - repoList

// Event listener that will allow the user to click on the individual REPO's title to show the repo info.
//And to avoid adding event listeners to every repo ELEMENT, I will start by attaching a click event to the 
//entire unordered list of repos - repoLIst.
repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        repoInfo(repoName);
    };
    // Inside the function I will make an IF statement, saying, IF e.target matches the h3 element, meaning,
    //that when I click, and IF I have clicked the h3 element, then the event will happen, because, remember,
    //we are doing the click event for the whole unordered list, but with this, only the h3 elements become clikable,
    // then Ill make a variable name repoName, and inside ill capture the e.target.innerText of that h3 element
    // console log repoName, and click, it will show in a console what I have clicked.
});




// Function to get Specific REPO INFO

// This async function will pull data about the INDIVIDUAL repos. (school will give the link to find correct endpoint).
// To verify that I am pulling data, I will use the console to view the object's properties.
// and inside I will use languages_url property to pull additional data about my repos languages.

const repoInfo = async function (repoName) {
    const repoInfos = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoInfos.json();
    console.log(repoInfo);
    // I just simply fetched the data to get specific repo information, and returned it into a json();

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();  
    // languageData is an object, therefore I need to use for...IN loop, because I want to access the key inside it
    console.log(languageData);

    const languages = [];
    for (let language in languageData) {
        languages.push(language);
        console.log(languages);
    };
    //Here the goal is to create an array of Languages, becasue I want to display that on my profile as well, when
    // people click on each of my repos,
    // Frist I will make an empty array, and then I will have to loop through languageData using for...IN loop
    // Because languageData is an object,
    // and then I will push the language to the languages empty array.
    displayRepoInfo(repoInfo, languages);
};


// Function that will DISPLAY SPECIFIC REPO INFO
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div);
    repoData.classList.remove("hide");
    repos.classList.add("hide");


    // This function will accept two parameters repoInfo and languages, because that is what we want to display in our div
    // First i will empty the repoData.innerHTML = ""; (repoData has a class of repo-data, part that is hidden in our css, and the part that will contain our repo information),
    // Then we will make a new DIV, and then populate its innerHTML, with it's repoInfo.name, repoInfo.description ...
    // Then I have to append-add this new DIV to the repoData variable (repo-data class),
    // Then I have to remove the HIDE class from repoData, and hide, aka add class HIDE to the repos variable (class=repos)
    // That way all the repos will be gone, and only one will show, the one we clicked.
    // Then I have to call this function inside the repoInfo
    backToRepoButton.classList.remove("hide");
    // here I am showing the button back to Repo
};

// Click event to the Back button
backToRepoButton.addEventListener("click", function (){
    repos.classList.remove("hide");
    repoData.classList.add("hide");
    backToRepoButton.classList.add("hide");
    // Here we just simply removed the HIDE class where all the repos were hiding, and now when the button is clicked, 
    // it will show again, therefore I have to add again HIDE class to the repoData(where individual repo info will show)
    // and to the button itself.
});


// Adding the input Event to seach Box - adding search box
filterInput.addEventListener("input", function(e){
    const valueSearchText = e.target.value;
    console.log(valueSearchText);

    const repos = document.querySelectorAll(".repo");
    const lowerText = valueSearchText.toLowerCase();

    for ( let repo of repos) {
        const lowercase = repo.innerText.toLowerCase();
        if (lowercase.includes(lowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});