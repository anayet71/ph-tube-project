


function getTimeString(time) {
    const hour = parseInt(time / 3600);
    const minute = time % 60
    return `${hour} hrs ${minute} min ago`
}
const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName('category-btn')
    console.log(buttons)
    for(let btn of buttons){
        btn.classList.remove("active")
    }
}
    // 1. Fetch, Load and show categories on html
// Create loadCategories
const loadCategories = () => {
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then(data => DisplayCategories(data.categories))
        .catch((error) => console.log(error))
}
const loadVideos = () => {
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then(data => displayVideos(data.videos))
        .catch((error) => console.log(error))
}
const loadCategoryVideos = (id) => {

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then(data => {
            // sobaike active class remove korao
            removeActiveClass()
            // id er class k active korao
            const activeBtn = document.getElementById (`btn-${id}`)
            activeBtn.classList.add('active')
            displayVideos(data.category)
        })
        .catch((error) => console.log(error))
}
const loadDetails = async (videoId) =>{
    console.log(videoId)
    const uri =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(uri)
    const data = await res.json()
    displayDetails(data.video)
}
const displayDetails =(video) =>{
    console.log(video)
    const detailContainer = document.getElementById('modal-content')

    detailContainer.innerHTML= `
    <img src="${video.thumbnail}" alt="">
    <p> ${video.description}</p>`

    // Way-1
    // document.getElementById("showModalData").click()
    // Way-2
    document.getElementById("customModal").showModal()
}
// const cardDemo = {
//     "category_id": "1001",
//     "video_id": "aaad",
//     "thumbnail": "https://i.ibb.co/f9FBQwz/smells.jpg",
//     "title": "Smells Like Teen Spirit",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
//             "profile_name": "Oliver Harris",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "5.4K",
//         "posted_date": "1672656000"
//     },
//     "description": "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit of youth. With over 5.4K views, this track brings a grunge rock vibe, featuring powerful guitar riffs and compelling vocals. Oliver's verified profile guarantees a quality musical journey that resonates with fans of dynamic, high-energy performances."
// }

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos')
    videoContainer.innerHTML = ""

    if (videos.length == 0) {
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
        <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
    <img src="assets/Icon.png" alt="">
       <h4 class="font-bold text-2xl text-center">Oops!! Sorry, There is no <br> content here</h4>

    </div>`
        return
    }
    else{
        videoContainer.classList.add('grid')

    }

    videos.forEach((video) => {
        // console.log(video);
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
            <figure class = "h-[200px] relative">
            <img class=  " h-full w-full object-cover " 
                src="${video.thumbnail}"
                alt="Shoes" />
                ${video.others.posted_date > 0 ? `<span class="absolute bg-black bottom-2 right-6 text-xs text-white px-2 py-[2px] rounded">${getTimeString(video.others.posted_date)} </span>` : ""}
}
}
      </figure >
    <div class="py-2 flex gap-2">
        <div >
            <img class=" w-10 h-10 object-cover rounded-full" src="${video.authors[0].profile_picture}" />
        </div> 
        <div>
        <h2 class= "font-bold"> ${video.title} </h2>
        <div class="flex gap-2 items-center">

            <p class= "text-gray-500 font-medium"> ${video.authors[0].profile_name}</p>
            ${video.authors[0].verified === true ? ` <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" alt="">` : ''}
           
        </div>
        <p> <button onclick="loadDetails('${video.video_id}')" class= " font-medium btn btn-sm btn-error"> details</button> </p>
        </div>
    </div>
        `;
        videoContainer.append(card)
    })
}

// Create DisplayCategories
const DisplayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories')
    categories.forEach((item) => {
        console.log(item)
        // Create a button
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
       <button id= "btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class= "btn category-btn">
       ${item.category}
       </button>
       `

        // add button to category container
        categoriesContainer.appendChild(buttonContainer)
    })
}


loadCategories()
loadVideos()