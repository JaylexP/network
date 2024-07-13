export const Paginator = (total_pages, getAllPosts) => {
    const paginator = document.querySelector("#pagination")
    paginator.innerHTML = "";
    for (let number = 1; number < total_pages + 1; number++) {
        const liPage = document.createElement("li")
        liPage.innerText = number;
        liPage.classList.add("page-item", "page-link");
        liPage.addEventListener("click", () => {
            getAllPosts(number);
        });
        paginator.append(liPage);

    }


}