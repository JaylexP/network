import { FetchAllPosts, FetchFollowingPosts, FetchNewPost } from "./api.js";
import { Paginator } from "./components/Paginator.js";
import { PostList } from "./components/PostList.js";

document.addEventListener('DOMContentLoaded', () => {

    const getAllPosts = async(page = 1) => {
        const {posts, total_pages} = await FetchFollowingPosts();
        PostList(posts, getAllPosts);
        Paginator(total_pages, getAllPosts)
    }

    getAllPosts();
})