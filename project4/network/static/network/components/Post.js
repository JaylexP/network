import { FetchUserLikes, checkAuthentication } from "../api.js";

export const Post = async({ id, content, user, timestamp, likes }, getAllPosts) => {
    const postItem = document.createElement('div')
    postItem.classList.add("card", "mb-2")
    postItem.innerHTML = `
    
         <div class="card-body">
            <a href="profile/${user}" class="card-title mb-2 fw-3">${user}</a>
            <p class="card-text">${content}</p>
            <p class="card-text text-secondary">${timestamp}</p>
           <div id="like-btn-container">
            ${likes} likes
           </div>
        </div>

    `;

    const isAuthenticated= await checkAuthentication()

    if (isAuthenticated) {
        const likeBtnContainer = postItem.querySelector("#like-btn-container");
    
        const likeButton = document.createElement("button");
        likeButton.classList.add("btn", "btn-danger");
        likeButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
        `
        likeButton.addEventListener("click", async() => {
            const message = await FetchUserLikes(id);
            console.log(message);
            getAllPosts();
        });

        likeBtnContainer.prepend(likeButton);
    }

    return postItem;
}