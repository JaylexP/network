import { FetchNewPost, FetchUserPosts, FetchUserProfile } from "./api.js";
import { Paginator } from "./components/Paginator.js";
import { PostList } from "./components/PostList.js";
import { Profile } from "./components/Profile.js";

document.addEventListener('DOMContentLoaded', () => {

    const getProfile = async(page = 1) => {
        const profileData = await FetchUserProfile(username);
        Profile(profileData, getProfile);
        const {posts, total_pages} = await FetchUserPosts(username);
        PostList(posts, getProfile);
        Paginator(total_pages, getProfile);

    }

    getProfile();
})