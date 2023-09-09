const API_KEY = "58a9c3bf2d424fc480f8d5b0d7b0f566"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=>fetchNews("India"));
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function reload(){
    window.location.reload;
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = '';
    articles.forEach((article)=> {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone);

    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = article.urlToImage;
    
    newsTitle.innerHTML = article.title;
    
    newsDesc.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} ▪️ ${date}`
    
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank')
    })
}
let currentselectednav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentselectednav?.classList.remove('active');
    currentselectednav = navItem ;
    currentselectednav.classList.add('active');
}

const SearchButton = document.querySelector('#search_button');
const SearchText = document.querySelector('#search_text');

SearchButton.addEventListener("click",()=>{
    const query = SearchText.value;
    if(!query)return;
    fetchNews(query);
    currentselectednav.classList.remove('active');
    currentselectednav = null;
})

