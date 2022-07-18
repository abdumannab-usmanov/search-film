
let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elTemplate = document.querySelector(".template").content;
let elPaginationTemplate = document.querySelector(".pagination-template").content;
let elList = document.querySelector(".films");
// let elModal = document.querySelector(".more");
let elSelect = document.querySelector(".js-select");
let elPrev = document.querySelector(".prev");
let elNext = document.querySelector(".next");
let elPaginatonList = document.querySelector(".pagination");



// elModal.classList.add("modal")


const API_KEY = "31242af7";
const filmFragment = document.createDocumentFragment()
let elInputVal = ""

let activePage = 1; 


function serachMovie(arr, node) {
    node.innerHTML = "";
    arr.forEach(e => {
        
        const newTemplate = elTemplate.cloneNode(true)
        
        newTemplate.querySelector(".img").src = e.Poster
        newTemplate.querySelector(".title").textContent = e.Title
        newTemplate.querySelector(".item-type").textContent = e.Type
        newTemplate.querySelector(".item-year").textContent = e.Year
        
        filmFragment.appendChild(newTemplate)
        
    });
    node.appendChild(filmFragment)
}



elInput.addEventListener("change", function (evt) {
    elInputVal = evt.target.value;
    getPost(); 
    elInput.value = ""
})

async function getPost() {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${elInputVal}&page=${activePage}`)
    const data = await response.json()
    let totalPage = (Math.ceil(data.totalResults / 10));
   let  films =  data.Search
     
    
    if(activePage == 1){
        elPrev.setAttribute("disabled", true)
    }else{
        elPrev.removeAttribute("disabled")
    }
    if(activePage == totalPage){
        elNext.setAttribute("disabled", true)
    }else{
        elNext.removeAttribute("disabled")
    }
    
    elPaginatonList.innerHTML = ""
    for(i=1; i < totalPage; i++){
        let newPaginationTemplate = elPaginationTemplate.cloneNode(true)
        newPaginationTemplate.querySelector(".page-link").textContent = i
        newPaginationTemplate.querySelector(".page-link").dataset.pageId = i
        elPaginatonList.appendChild(newPaginationTemplate)
    }
    
    if(elSelect.value == "movie"){
        films = films.filter(e => e.Type === "movie")
    }
    if(elSelect.value == "series"){
        films = films.filter(e => e.Type === "series")
    }
    
    serachMovie(films, elList)

}




// elList.addEventListener("click", (evt) => {


//     if(evt.target.matches(".modal-btn")){
//         elModal.innerHTML = ""

//         elModal.classList.add("open")
//         let moreId = evt.target.dataset.modalId
//         let findId = films.find(e => e.imdbID == moreId)


//         let newImg = document.createElement("img")
//         let newWrapper = document.createElement("div")
//         let newtitle = document.createElement("h3")
//         let newText = document.createElement("p")
//         let newBtn = document.createElement("button")



//         newText.setAttribute("class", "year")
//         newImg.setAttribute("src", findId.Poster)
//         newImg.setAttribute("class", "sub-img")
//         newWrapper.setAttribute("class", "wrapper")
//         newBtn.setAttribute("class", "close-btn")




//         newtitle.textContent = findId.Title
//         newText.textContent = findId.Year
//         newBtn.textContent = "X"



//         elModal.appendChild(newImg)
//         newWrapper.appendChild(newText)
//         newWrapper.appendChild(newtitle)
//         elModal.appendChild(newBtn)
//         elModal.appendChild(newWrapper)
//     }



// })

// elModal.addEventListener("click", function(evt){
//     if (evt.target.matches(".close-btn")){
//         elModal.classList.remove("open")
//     }
// })


elPrev.addEventListener("click", () => {
    activePage--
    console.log(activePage);  
    getPost(); 
})

elNext.addEventListener("click", () => {
    activePage++
    console.log(activePage); 
    getPost(); 
})



elPaginatonList.addEventListener("click", function(evt){
    if(evt.target.matches(".page-link")){
        activePage = evt.target.dataset.pageId
        getPost()
    }
})

elSelect.addEventListener("click", function(evt){
    getPost()
})


// let result = []
// // let aler = document.querySelector(".aler")

// elSelect.addEventListener("change", function () {
//     elList.innerHTML = "";
//     let selectValue = elSelect.value;
    
//     elList.forEach((type) => {
//         type.forEach((e) =>{
//             if (e.Type.includes(selectValue)) {
//                 result.push(e);          
                
//             }
//         })
        
//     })
    
//     getPost(result, elList);
// });