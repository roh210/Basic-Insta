const NUM_OF_FOLLOWERS = 100;

// Asynchronously return NUM_OF_FOLLOWERS hard-coded user IDs
async function fetchFollowerIds() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([...Array(NUM_OF_FOLLOWERS).keys()]);
    }, 300);
  });
}

// Asynchronously return fake user data based on a given ID
async function fetchUserData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(USERS[id % USERS.length]);
    }, 1000);
  });
}

// Put your code here
// ------------------

const postHtml = document.querySelector(".followers");
const unfollowedHtml = document.querySelector(".unfollowedUsers");
const followerHtml = document.querySelector(".main__profile");
let followersNum = NUM_OF_FOLLOWERS;
let ids; //global id value
let removedUserArrId = [];    

async function displayUsers(userId) {
  if (userId == null) userId = await fetchFollowerIds(); //check if null state  , if true userId array ==100
  const userData = await retrieveUserData(userId);
  console.log(userData)
  postHtml.innerHTML = userData.map((user) => userHTML(user)).join("");
  ids = userId;
  followerHtml.innerHTML = updateFollowerHtml();
}

function handleButtonClick(event) {
  const target = event.target;
  if (target.classList.contains("profile__unfollow")) {
    handleRemoveBtn(target);
  } else if (target.classList.contains("profile__follow")) {
    handleAddBtn(target);
  }
}

postHtml.addEventListener("click", handleButtonClick); //
unfollowedHtml.addEventListener("click", handleButtonClick); //

function handleRemoveBtn(target) {
  const id = retrieveUserIdFromAvatar(target);
  const userRemoved = addRemovedIdToArray(id);
  const filterIdArr = filterUserIdArray(userRemoved);
  disableBtnAndUpdateFollowerCount(".profile__unfollow", -1);
  displayUsers(filterIdArr);
  showUnfollowed(userRemoved);
}

function handleAddBtn(target) {
  const id = retrieveUserIdFromAvatar(target);
  const addUserId = filterRemovedArrToFollowUser([id]); //removed id from removedIdArr
  if (!ids.includes(id)) ids = [...ids, id].sort((a, b) =>  a - b); //if the id does not exist in ids, update ids accordingly by adding id and sorting id low=>high
  disableBtnAndUpdateFollowerCount(".profile__follow", 1);
  displayUsers(ids); //update displayUsers
  showUnfollowed(addUserId); //update showunfollowed
}

function filterRemovedArrToFollowUser(id) {
  return (removedUserArrId = removedUserArrId.filter(
    (userId) => !id.includes(userId)
  )); //filter out id in removeduserArr
}

function disableBtnAndUpdateFollowerCount(btn, change) {
  //ensures user only clicked once
  if (!document.querySelector(btn).disabled) {
    followersNum += change;
    document.querySelector(btn).disabled = true;
  }
}

async function showUnfollowed(userRemoved) {
  const userData = await retrieveUserData(userRemoved); //retrieve data of unfollowed users
  unfollowedHtml.innerHTML = userData.map((users) => userHTML(users)).join(""); //display removed users
  TogglevisibilityOfAddBtn();
}

function TogglevisibilityOfAddBtn() {
  //problem => when user unfollowed :  remove btn =>add btn => for each remove button in the unfollowed section change the button to display add btn only
  const button = document.querySelector(".unfollowedUsers");
  const addBtn = button.querySelectorAll(".profile__follow"); //.unfollowedUsers .profile__follow   //BOTH CASES THE UNFOLLLOWED USER IS THE PARENT
  const removeBtn = button.querySelectorAll(".profile__unfollow"); // unfollowedUsers . profile__unfollow
  
  addBtn.forEach((button) => button.style.display = "block" );
  removeBtn.forEach((button) => button.style.display = "none");
}

function retrieveUserData(userId) {
  return Promise.all(userId.map((Id) => fetchUserData(Id)));
}

function filterUserIdArray(userRemoved) {
  return ids.filter((userId) => !userRemoved.includes(userId)); //filter array so users that are removed are removed from array
}

function retrieveUserIdFromAvatar(target) {
  //retrieve user avatar
  const userProfileData = target.closest(".profile"); //.profile .profile__avatar (target.closest(".profile")) //go to its parent class to get .profile && store Id in removeUsersArrId
  const avatarArr = userProfileData
    .querySelector(".profile__avatar")
    .getAttribute("src")
    .split(","); // get user avatar && convert to array
  const id = parseInt(
    avatarArr.map((avatar) => parseInt(avatar.match(/\d+/))).join("") //using regex to extract number => long method using a for loop to check ascii char between 48-57 and break
  );

  return id;
}

function addRemovedIdToArray(id) {
  if (!removedUserArrId.includes(id)) removedUserArrId.push(id); //check if id already exists in remove array
  return removedUserArrId;
}

function userHTML(user) {
  return `<div class="profile">
  <img class="profile__avatar" src="${user.avatar}">
  <div class="profile__info">
    <p class="profile__username">${user.username}</p>
    <p class="profile__bio">${user.bio}</p>
  </div>
  <button class="profile__unfollow btn">Remove</button>
  <button class="profile__follow btn">Add</button>
</div>
`;
}

function updateFollowerHtml() {
  return `<div class="profile">
  <img class="profile__avatar" src="https://www.gravatar.com/avatar/3456?d=identicon&s=64">
  <div class="profile__info">
    <p class="profile__username">Roheena Sadiq</p>
    <p class="profile__bio">Software Engineer</p>
  </div>
  <p>Followers: ${followersNum} </p>
  </div>`;
}

displayUsers(null); //default value set to null to display all 100 users

// ------------------

// Fake data - do not access USERS directly in your solution
const USERS = [
  {
    username: "Euan Blundell",
    avatar: "https://www.gravatar.com/avatar/0?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Darcey Bloom",
    avatar: "https://www.gravatar.com/avatar/1?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Sonnie Miranda",
    avatar: "https://www.gravatar.com/avatar/2?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Antony Freeman",
    avatar: "https://www.gravatar.com/avatar/3?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Komal Mccall",
    avatar: "https://www.gravatar.com/avatar/4?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Finnlay Wynn",
    avatar: "https://www.gravatar.com/avatar/5?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Rosemarie Mcgill",
    avatar: "https://www.gravatar.com/avatar/6?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Ziggy Cornish",
    avatar: "https://www.gravatar.com/avatar/7?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Rodney Brook",
    avatar: "https://www.gravatar.com/avatar/8?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Kieran Farrell",
    avatar: "https://www.gravatar.com/avatar/9?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Mildred Pearson",
    avatar: "https://www.gravatar.com/avatar/10?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Anniyah Barnett",
    avatar: "https://www.gravatar.com/avatar/11?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Miriam Dillon",
    avatar: "https://www.gravatar.com/avatar/12?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Kornelia Oconnor",
    avatar: "https://www.gravatar.com/avatar/13?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Fabian Xiong",
    avatar: "https://www.gravatar.com/avatar/14?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Ilyas Santiago",
    avatar: "https://www.gravatar.com/avatar/15?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Zeynep David",
    avatar: "https://www.gravatar.com/avatar/16?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "India Davey",
    avatar: "https://www.gravatar.com/avatar/17?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Margo Mcfarlane",
    avatar: "https://www.gravatar.com/avatar/18?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Jay-Jay Wade",
    avatar: "https://www.gravatar.com/avatar/19?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Nabiha Bain",
    avatar: "https://www.gravatar.com/avatar/20?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Abigail Marks",
    avatar: "https://www.gravatar.com/avatar/21?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Kylie Dolan",
    avatar: "https://www.gravatar.com/avatar/22?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Amber-Rose Proctor",
    avatar: "https://www.gravatar.com/avatar/23?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Tj Hodge",
    avatar: "https://www.gravatar.com/avatar/24?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Brayden Cooper",
    avatar: "https://www.gravatar.com/avatar/25?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Hazel Macdonald",
    avatar: "https://www.gravatar.com/avatar/26?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Charmaine Higgs",
    avatar: "https://www.gravatar.com/avatar/27?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Corinne Simmonds",
    avatar: "https://www.gravatar.com/avatar/28?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Neelam Holloway",
    avatar: "https://www.gravatar.com/avatar/29?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Bertie Bauer",
    avatar: "https://www.gravatar.com/avatar/30?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Eadie Rooney",
    avatar: "https://www.gravatar.com/avatar/31?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Terrence Woolley",
    avatar: "https://www.gravatar.com/avatar/32?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Yaseen Dawe",
    avatar: "https://www.gravatar.com/avatar/33?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Madeeha Mac",
    avatar: "https://www.gravatar.com/avatar/34?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Dante Mcgregor",
    avatar: "https://www.gravatar.com/avatar/35?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Darin Redfern",
    avatar: "https://www.gravatar.com/avatar/36?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Lorna Mclean",
    avatar: "https://www.gravatar.com/avatar/37?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Elina Pope",
    avatar: "https://www.gravatar.com/avatar/38?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Alvin Griffiths",
    avatar: "https://www.gravatar.com/avatar/39?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Robert Duggan",
    avatar: "https://www.gravatar.com/avatar/40?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Phillipa Poole",
    avatar: "https://www.gravatar.com/avatar/41?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Hawa Spence",
    avatar: "https://www.gravatar.com/avatar/42?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Elouise York",
    avatar: "https://www.gravatar.com/avatar/43?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Kira Huff",
    avatar: "https://www.gravatar.com/avatar/44?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Ayman Searle",
    avatar: "https://www.gravatar.com/avatar/45?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Sanya Lennon",
    avatar: "https://www.gravatar.com/avatar/46?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Evelyn Salas",
    avatar: "https://www.gravatar.com/avatar/47?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Montell Booth",
    avatar: "https://www.gravatar.com/avatar/48?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Homer Hebert",
    avatar: "https://www.gravatar.com/avatar/49?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Cody Warren",
    avatar: "https://www.gravatar.com/avatar/50?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Kole Cochran",
    avatar: "https://www.gravatar.com/avatar/51?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Veronica Archer",
    avatar: "https://www.gravatar.com/avatar/52?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Boris Blanchard",
    avatar: "https://www.gravatar.com/avatar/53?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Hamid Kline",
    avatar: "https://www.gravatar.com/avatar/54?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Hania Mackenzie",
    avatar: "https://www.gravatar.com/avatar/55?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Rikesh Vaughn",
    avatar: "https://www.gravatar.com/avatar/56?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Neriah Levy",
    avatar: "https://www.gravatar.com/avatar/57?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Rhonda Magana",
    avatar: "https://www.gravatar.com/avatar/58?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Solomon Chadwick",
    avatar: "https://www.gravatar.com/avatar/59?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Kayson Glover",
    avatar: "https://www.gravatar.com/avatar/60?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Teagan Sweet",
    avatar: "https://www.gravatar.com/avatar/61?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Jac Walter",
    avatar: "https://www.gravatar.com/avatar/62?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Dexter Foreman",
    avatar: "https://www.gravatar.com/avatar/63?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Gia Rhodes",
    avatar: "https://www.gravatar.com/avatar/64?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Colm Handley",
    avatar: "https://www.gravatar.com/avatar/65?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Carter Boyce",
    avatar: "https://www.gravatar.com/avatar/66?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Josie Jefferson",
    avatar: "https://www.gravatar.com/avatar/67?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Mahima Soto",
    avatar: "https://www.gravatar.com/avatar/68?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Mariyam Squires",
    avatar: "https://www.gravatar.com/avatar/69?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Janelle Legge",
    avatar: "https://www.gravatar.com/avatar/70?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Danielle Harrell",
    avatar: "https://www.gravatar.com/avatar/71?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Maizie Garrett",
    avatar: "https://www.gravatar.com/avatar/72?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Abraham Booker",
    avatar: "https://www.gravatar.com/avatar/73?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Cain Melendez",
    avatar: "https://www.gravatar.com/avatar/74?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Allen Hilton",
    avatar: "https://www.gravatar.com/avatar/75?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Patrik Marshall",
    avatar: "https://www.gravatar.com/avatar/76?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Aras Hudson",
    avatar: "https://www.gravatar.com/avatar/77?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Norah Dickerson",
    avatar: "https://www.gravatar.com/avatar/78?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Jayden-James Franks",
    avatar: "https://www.gravatar.com/avatar/79?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Safa Hale",
    avatar: "https://www.gravatar.com/avatar/80?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Jasmine Chase",
    avatar: "https://www.gravatar.com/avatar/81?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Janice Haynes",
    avatar: "https://www.gravatar.com/avatar/82?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Joann Montes",
    avatar: "https://www.gravatar.com/avatar/83?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Lexi-Mae Singh",
    avatar: "https://www.gravatar.com/avatar/84?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Trent Sims",
    avatar: "https://www.gravatar.com/avatar/85?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Lacy Prince",
    avatar: "https://www.gravatar.com/avatar/86?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Nazim Delgado",
    avatar: "https://www.gravatar.com/avatar/87?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Alice Frame",
    avatar: "https://www.gravatar.com/avatar/88?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Abubakr Walls",
    avatar: "https://www.gravatar.com/avatar/89?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Chantelle Guthrie",
    avatar: "https://www.gravatar.com/avatar/90?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Rafe Duran",
    avatar: "https://www.gravatar.com/avatar/91?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
  {
    username: "Reyansh Garner",
    avatar: "https://www.gravatar.com/avatar/92?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Mikolaj Plant",
    avatar: "https://www.gravatar.com/avatar/93?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Nelly Sharp",
    avatar: "https://www.gravatar.com/avatar/94?d=identicon&s=64",
    bio: "Software Engineer at Google",
  },
  {
    username: "Finlay Holman",
    avatar: "https://www.gravatar.com/avatar/95?d=identicon&s=64",
    bio: "Software Engineer at Facebook",
  },
  {
    username: "Nick Jones",
    avatar: "https://www.gravatar.com/avatar/96?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Ifan Rios",
    avatar: "https://www.gravatar.com/avatar/97?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Ellie Sharpe",
    avatar: "https://www.gravatar.com/avatar/98?d=identicon&s=64",
    bio: "Software Engineer at Netflix",
  },
  {
    username: "Katya Mack",
    avatar: "https://www.gravatar.com/avatar/99?d=identicon&s=64",
    bio: "Software Engineer at Apple",
  },
];
