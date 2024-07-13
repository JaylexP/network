import { FetchAllPosts, FetchNewPost } from "./api.js";
import { Paginator } from "./components/Paginator.js";
import { PostList } from "./components/PostList.js";

document.addEventListener('DOMContentLoaded', () => {

    const getAllPosts = async(page = 1) => {
        const { posts, total_pages } = await FetchAllPosts(page);
        PostList(posts, getAllPosts);
        Paginator(total_pages, getAllPosts)
    }

    const form = document.querySelector('#NewPostForm')

    form.addEventListener('submit', async(event)=> {
        event.preventDefault();
        const content = document.querySelector("#content").value;
        const message = await FetchNewPost(content);
        document.querySelector("#content").value = '';
        console.log(message);
        getAllPosts();
    })

    getAllPosts();
})