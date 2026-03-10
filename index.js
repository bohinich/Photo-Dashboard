import{a as b,S as k,i as l}from"./assets/vendor-B5nsgUv9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();const S="https://pixabay.com/api/",q="49365626-6bf9b0bb5948f971197bdaec6";async function h(e,r=1,i=15){return(await b.get(S,{params:{key:q,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:i}})).data}let f=null;function m(e){e.innerHTML=""}function E(){return`
    <svg 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="white" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
    </svg>
  `}function I(){return`
    <svg 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="white" 
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `}function M(){return`
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polygon points="12 2 15 9 22 9 17 14 19 22 12 18 5 22 7 14 2 9 9 9"/>
    </svg>
  `}function P(e,r){return e.map(i=>{const a=r.includes(i.id);return`
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
                            ${E()}
                            <span>${i.likes}</span>
                        </div>

                        <div class="info-item">
                            ${I()}
                            <span>${i.views}</span>
                        </div>
                    </div>

                    <button 
                        class="fav-btn ${a?"active":""}" 
                        data-id="${i.id}">
                        ${M()}
                    </button>

                </div>`}).join("")}function $(e,r){e.insertAdjacentHTML("beforeend",r),f?f.refresh():f=new k(".gallery .gallery-item",{captionsData:"alt",captionDelay:250})}const t={query:"",page:1,perPage:15,totalHits:0,currentView:"gallery",currentFilter:"all",images:[],favorites:[]},O=document.querySelector(".search-form"),d=document.querySelector(".gallery"),n=document.querySelector(".load-more"),v=document.querySelector(".loader"),g=document.querySelectorAll(".nav-btn"),p=document.querySelectorAll(".filter-btn");n.classList.add("hidden");O.addEventListener("submit",R);n.addEventListener("click",x);async function R(e){e.preventDefault();const r=e.target.elements.query.value.trim();if(!r){l.warning({message:"Please enter a search query",position:"topRight"});return}t.query=r,t.page=1,t.images=[],m(d),L();try{const i=await h(t.query,t.page,t.perPage);if(i.hits.length===0){l.warning({message:"No images found",position:"topRight"});return}t.images=i.hits,t.totalHits=i.totalHits,c(),y()}catch{l.warning({message:"Something went wrong. Please try again",position:"topRight"})}finally{w()}}async function x(){t.page+=1;try{L(),n.disabled=!0;const e=await h(t.query,t.page,t.perPage);t.images=[...t.images,...e.hits],c(),y()}catch{l.warning({message:"Error loading more images",position:"topRight"})}finally{w(),n.disabled=!1}}function c(){m(d);let e=[...t.images];t.currentView==="favorites"&&(e=e.filter(i=>t.favorites.includes(i.id))),t.currentFilter==="approved"&&(e=e.filter(i=>i.likes>100)),t.currentFilter==="rejected"&&(e=e.filter(i=>i.likes<=100));const r=P(e,t.favorites);$(d,r)}d.addEventListener("click",e=>{const r=e.target.closest(".fav-btn");if(!r)return;const i=Number(r.dataset.id);t.favorites.includes(i)?t.favorites=t.favorites.filter(a=>a!==i):t.favorites.push(i),localStorage.setItem("favorites",JSON.stringify(t.favorites)),c()});g.forEach(e=>{e.addEventListener("click",()=>{g.forEach(r=>r.classList.remove("active")),e.classList.add("active"),t.currentView=e.dataset.view,c()})});p.forEach(e=>{e.addEventListener("click",()=>{p.forEach(r=>r.classList.remove("active")),e.classList.add("active"),t.currentFilter=e.dataset.filter,c()})});function y(){t.page*t.perPage>=t.totalHits?(N(),l.warning({message:"You've reached the end of the results",position:"topRight"})):B()}function L(){v.classList.remove("hidden")}function w(){v.classList.add("hidden")}function B(){n.classList.remove("hidden")}function N(){n.classList.add("hidden")}document.addEventListener("DOMContentLoaded",()=>{const e=localStorage.getItem("favorites");e&&(t.favorites=JSON.parse(e))});
//# sourceMappingURL=index.js.map
