let searchBar = document.querySelector("#searchBar")
let searchbtn = document.querySelector("#searchbtn")
let newsCards = document.querySelector(".newsCards")


searchbtn.addEventListener("click", function () {
    searchBar.value != "" && fetchNews(searchBar.value)
    searchBar.value = ""
})
searchBar.addEventListener("keydown", function (i) {
    if (i.key == "Enter") {
        searchBar.value != "" && fetchNews(searchBar.value)
        searchBar.value = ""
    }
})


function fetchNews(a) {
    newsCards.innerHTML = ""
    newsCards.innerHTML == "" && (document.querySelector(".loader").style.display = "flex")
    let API_KEY = '973fac7059e843f082134381045f00f8'
    let whatToSearch = a ? a : "world"
    let URL = `https://newsapi.org/v2/everything?q=${whatToSearch}&from=2024-07-17&to=2024-0
    8-7&sortBy=popularity&apiKey=${API_KEY}`
    let data = {}
    async function callData() {
        let blob = await fetch(URL)
        data = await blob.json()
        let newsCardsData = await data.articles.filter(function (i) {
            return i.urlToImage
        })
        newsCardsData = await gsap.utils.shuffle(newsCardsData)
        let clutter = ""
        await newsCardsData.forEach((elem) => {
            clutter += `<div class="xl:w-[274px] lg:w-[287px] md:w-[274px] sm:w-[300px] tablet:w-[45vw] mini:w-[350px] mobile:w-[334px] micro:w-[83vw] bg-gray-100 p-3 rounded-lg overflow-hidden cursor-pointer hover:scale-[1.1] duration-[0.3s] mb-[30px]"><img src=${elem.urlToImage} class="xl:w-[250px] lg:w-[262px] md:w-[250px] sm:w-[275px] tablet:w-[43vw] mini:w-[325px] mobile:w-[310px] micro:w-[80vw] xl:h-[200px] lg:h-[210px] md:h-[200px] sm:h-[220px] tablet:h-[38vw] mini:h-[290px] mobile:h-[280px] micro:h-[70vw] object-cover rounded-lg"><div class="flex justify-start items-center mt-2 gap-x-1"><div class="bg-red-600 rounded-full w-[30px] h-[30px] text-[12px] text-white flex justify-center items-center">CNN</div><div>From CNN News</div></div><h1 class="text-xl font-semibold leading-[22px] mt-2">${elem.title}</h1><p class="text-[14px] leading-[16px] mt-2">${elem.description}</p></div>`
            newsCards.innerHTML = clutter
        });
        newsCards.innerHTML != "" && (document.querySelector(".loader").style.display = "none")

    }
    callData()
}
fetchNews()

function loader() {
    gsap.to(".loader div", {
        rotate: 360,
        repeat: -1,
        duration:0.5
    })
}
loader()

// document.querySelector(".mobileSearchBar").innerHeight = document.querySelector("header").innerHeight

document.querySelector(".searchIcon").addEventListener("click", function () {
    document.querySelector("nav").style.display = "none"
    document.querySelector(".mobileSearchBar").style.display = "flex"
})
document.querySelector(".cancelSearch").addEventListener("click", function () {
    document.querySelector("nav").style.display = "flex"
    document.querySelector(".mobileSearchBar").style.display = "none"
})
let mbsearchInput = document.querySelector(".mobileSearchBar input")
mbsearchInput.addEventListener("keydown", function (i) {
    if (i.key == "Enter") {
        mbsearchInput.value != "" && fetchNews(mbsearchInput.value)
        mbsearchInput.value = ""
        document.querySelector("nav").style.display = "flex"
        document.querySelector(".mobileSearchBar").style.display = "none"
    }
})
document.querySelector(".mobileSearchBar i").addEventListener("click", function () {
    mbsearchInput.value != "" && fetchNews(mbsearchInput.value)
    mbsearchInput.value = ""
    document.querySelector("nav").style.display = "flex"
    document.querySelector(".mobileSearchBar").style.display = "none"
})