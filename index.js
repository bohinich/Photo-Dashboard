import{a as b,S as E,i as c}from"./assets/vendor-B5nsgUv9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function i(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=i(a);fetch(a.href,s)}})();const S="https://pixabay.com/api/",q="49365626-6bf9b0bb5948f971197bdaec6";async function m(e,r=1,i=15){return(await b.get(S,{params:{key:q,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:i}})).data}let f=null;function v(e){e.innerHTML=""}function k(){return`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
      <path d="M5 9h14l-1 11H6L5 9z"/>
    </svg>
  `}function M(){return`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `}function P(e){return`
    <svg width="20" height="20" viewBox="0 0 24 24"
      fill="${e?"white":"none"}"
      stroke="white"
      stroke-width="2">
      <polygon points="12 2 15 9 22 9 17 14 19 22 12 18 5 22 7 14 2 9 9 9"/>
    </svg>
  `}function I(e,r){return e.map(i=>{const o=r.includes(i.id);return`
                <div class="card">
                    <a href="${i.largeImageURL}" class="gallery-item">
                        <img 
                            src="${i.webformatURL}" 
                            alt="${i.tags}" 
                            loading="lazy"
                        />
                    </a>

                    <div class="card-info">
                        <div class="info-item">
                            ${k()}
                            <span>${i.likes}</span>
                        </div>

                        <div class="info-item">
                            ${M()}
                            <span>${i.views}</span>
                        </div>
                    </div>

                    <button 
                        class="fav-btn ${o?"active":""}" 
                        data-id="${i.id}">
                            ${P(o)}
                    </button>

                </div>`}).join("")}function R(e,r){e.insertAdjacentHTML("beforeend",r),f?f.refresh():f=new E(".gallery a",{captionsData:"alt",captionDelay:250})}const t={query:"",page:1,perPage:15,totalHits:0,currentView:"gallery",currentFilter:"all",images:[],favorites:[]},$=document.querySelector(".search-form"),d=document.querySelector(".gallery"),n=document.querySelector(".load-more"),y=document.querySelector(".loader"),h=document.querySelector(".nav-btn"),p=document.querySelector("filter-btn");n.classList.add("hidden");$.addEventListener("submit",O);async function O(e){e.preventDefault();const r=e.target.elements.query.value.trim();if(!r){c.warning({message:"Please enter a search query",position:"topRight"});return}t.query=r,t.page=1,t.images=[],v(d),g();try{w();const i=await m(t.query,t.page,t.perPage);if(i.hits.length===0){c.warning({message:"No images found",position:"topRight"});return}t.images=i.hits,t.totalHits=i.totalHits,l(),L()}catch{c.warning({message:"Something went wrong. Please try again",position:"topRight"})}finally{g()}}n.addEventListener("click",x);async function x(){t.page+=1;try{w(),n.disabled=!0;const e=await m(t.query,t.page,t.perPage);t.images=[...t.images,...e.hits],l(),L()}catch{c.warning({message:"Error loading more images",position:"topRight"})}finally{g(),n.disabled=!1}}function l(){v(d);let e=[...t.images];t.currentView==="Favorites"&&(e=e.filter(i=>t.favorites.includes(i.id))),t.currentFilter==="APPROVED"&&(e=e.filter(i=>i.likes>100)),t.currentFilter==="REJECTED"&&(e=e.filter(i=>i.likes<=100));const r=I(e,t.favorites);R(d,r)}d.addEventListener("click",e=>{if(!e.target.classList.contains("fav-btn"))return;const r=Number(e.target.dataset.id);t.favorites.includes(r)?t.favorites=t.favorites.filter(i=>i!==r):t.favorites.push(r),localStorage.setItem("Favorites",JSON.stringify(t.favorites)),l()});h.forEach(e=>{e.addEventListener("click",()=>{h.forEach(r=>r.classList.remove("active")),e.classList.add("active"),t.currentView=e.dataset.view,l()})});p.forEach(e=>{e.addEventListener("click",()=>{p.forEach(r=>r.classList.remove("active")),e.classList.add("active"),t.currentFilter=e.dataset.filter,l()})});function L(){t.page*t.perPage>t.totalHits?(F(),c.warning({message:"You've reached the end of the results",position:"topRight"})):B()}function w(){y.classList.remove("hidden")}function g(){y.classList.add("hidden")}function B(){n.classList.remove("hidden")}function F(){n.classList.add("hidden")}document.addEventListener("DOMContentLoaded",()=>{const e=localStorage.getItem("favorites");e&&(t.favorites=JSON.parse(e))});
//# sourceMappingURL=index.js.map
