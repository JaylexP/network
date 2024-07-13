import { FetchUserFollow } from "../api.js";

export const Profile = ({ user, bio, profile_picture,posts,followers, following }, getProfile) => {
    const profileItem = document.createElement("section")
    
    profileItem.innerHTML=`
    
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="dark-color" id="follow-btn-container">${user}  </h3>
                            <p>${bio}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="about-avatar">
                            <img src="${profile_picture}" title="" alt="">
                        </div>
                    </div>
                </div>
                <div class="card my-3 p-2">
                    <div class="d-flex justify-content-center gap-3">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2">${posts}</h6>
                                <p class="m-0 fw-bold">posts</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2">${followers}</h6>
                                <p class="m-0 fw-bold">Followers</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2">${following}</h6>
                                <p class="m-0 fw-bold">Following</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;

    const profileContainer = document.querySelector("#profile-container");
    profileContainer.innerHTML = "";

   if (username !== currentUser) {
    const followBtn = document.createElement("button");
    followBtn.classList.add("btn");
    followBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
    </svg>
    `;

    followBtn.addEventListener("click", async() => {
       const message= await FetchUserFollow(user);
       console.log(message);
       getProfile();
    });

    const followBtnContainer = profileItem.querySelector("#follow-btn-container");
    followBtnContainer.append(followBtn);
   }

    profileContainer.append(profileItem);
}