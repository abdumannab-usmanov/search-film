
let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".films");
let elModal = document.querySelector(".more");

elModal.classList.add("modal")


const API_KEY = "31242af7";


function serachMovie(arr, node) {
    node.innerHTML = "";
    arr.forEach(e => {

        let newLi = document.createElement("li")
        let newTitle = document.createElement("h3")
        let newText = document.createElement("p")
        let newImg = document.createElement("img")
        let newBox = document.createElement("div")
        let newModal = document.createElement("button")



        newTitle.textContent = e.Title
        newText.textContent = e.Type   
        newModal.textContent = "More"     
        
        newLi.setAttribute("class", "item")
        newTitle.setAttribute("class", "title")
        newText.setAttribute("class", "text")
        newImg.setAttribute("src", e.Poster)
        newImg.setAttribute("class", "img")
        newBox.setAttribute("class", "new-box")
        newModal.setAttribute("class", "modal-btn") 
        newModal.dataset.modalId = e.imdbID 


        newLi.appendChild(newImg)
        newLi.appendChild(newTitle)
        newLi.appendChild(newBox)
        newBox.appendChild(newText)
        newBox.appendChild(newModal)
        node.appendChild(newLi)
    });

}

async function getPost(value) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${value}`)
    const data = await response.json()
    console.log(data);
    films =  data.Search
    serachMovie(films, elList)
}

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault()
    let elInputValue = elInput.value;
    getPost(elInputValue);
    elInput.value = ""
})



elList.addEventListener("click", (evt) => {

    
    if(evt.target.matches(".modal-btn")){
        elModal.innerHTML = ""
        
        elModal.classList.add("open")
        let moreId = evt.target.dataset.modalId
        let findId = films.find(e => e.imdbID == moreId)
        

        let newImg = document.createElement("img")
        let newWrapper = document.createElement("div")
        let newtitle = document.createElement("h3")
        let newText = document.createElement("p")
        let newBtn = document.createElement("button")



        newText.setAttribute("class", "year")
        newImg.setAttribute("src", findId.Poster)
        newImg.setAttribute("class", "sub-img")
        newWrapper.setAttribute("class", "wrapper")
        newBtn.setAttribute("class", "close-btn")




        newtitle.textContent = findId.Title
        newText.textContent = findId.Year
        newBtn.textContent = "X"


        
        elModal.appendChild(newImg)
        newWrapper.appendChild(newText)
        newWrapper.appendChild(newtitle)
        elModal.appendChild(newBtn)
        elModal.appendChild(newWrapper)
    }

   

})

elModal.addEventListener("click", function(evt){
    if (evt.target.matches(".close-btn")){
        elModal.classList.remove("open")
    }
})