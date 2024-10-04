const loadAllPosts = async (category) => {

    // console.log(`https://openapi.programming-hero.com/api/retro-forum/posts${category?`?category=${category}`:''}`)

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`);
    const data = await res.json();
    displayAllPost(data.posts);

}

const handleSearchByCategory = () => {
    const btn = document.getElementById('searchPostsBtn');
    const searchText = document.getElementById('searchPosts').value;
    loadAllPosts(searchText);
}


const displayAllPost = (posts) => {
    const postContainer = document.getElementById('post-container');
    posts.forEach((element) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div
        class = "p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl"
        >   

        <div class="indicator">
        <span class="indicator-item badge ${element.isActive ? "bg-green-600" : "bg-red-500"}"></span>
        <div class="avatar">
        <div class="w-24 rounded-xl">
        <img 
        src=${element.image}
        />
        </div>
        </div>

        </div>

        

        <div class="space-y-4 w-full"> 
          <div class ="flex gap-4 *:opacity-60">
            <p># category</p>
            <p>Author: ${element.author.name}</p>
          </div>
          <h3 class="text-2xl font-bold opacity-70">
          ${element.title}  
          </h3>
          <p class="opacity-40">
          ${element.description}
          </p>
          <hr class="border border-dashed border-gray-300" />
        <div class="flex justify-between *:font-bold [&>*:not (:last-child)]:opacity-45"
            >
         <div class="flex gap-4">
              <div class="space-x-2 flex items-center">
              <i class="fa-regular fa-comment-dots"></i>
              <p>${element.comment_count}</p>
              </div>
            <div class="space-x-2 flex items-center">
              <i class="fa-regular fa-eye"></i>
              <p>${element.view_count}</p>
            </div>
            <div class="space-x-2 flex items-center">
              <i class="fa-regular fa-clock"></i>
              <p>${element.posted_time} Min</p>
            </div>
         </div>

            <div class="opacity-100">
            <button id="addToList" onclick="markAsRead()"
             data-post='${JSON.stringify(element)}' class-"addToList btn btn-circle bg-green-500 btn-sm">
              <i class='fa-solid fa-envelope-open text-white"></i>
              </button>
            </div>

        </div>
            
        </div>`;

        postContainer.appendChild(div);
    });

};




loadAllPosts();