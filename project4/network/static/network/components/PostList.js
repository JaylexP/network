import { FetchAllPosts } from "../api.js"
import { Post } from "./Post.js";

export const PostList = async(posts, getAllPosts) => {
   const feed = document.querySelector('#feed');
   feed.innerHTML = "";

   posts.forEach(async(post) => {
    const postItem = await Post(post, getAllPosts);
    feed.append(postItem);
   });
}