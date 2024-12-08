import{a as v,S as b,i as a}from"./assets/vendor-DEenWwFD.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const B="47432797-7b7ae49ed8d9ca3634e43854b",$="https://pixabay.com/api/",h=async(r,e=1)=>{const o=new URLSearchParams({key:B,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e});try{return(await v.get(`${$}?${o}`)).data}catch{throw new Error("Failed to fetch images")}};let m;const S=r=>r.map(e=>`
    <li class="li">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" />
      </a>
      <div class="div">
        <p class="p">Likes: ${e.likes}</p>
        <p class="p">Views: ${e.views}</p>
        <p class="p">Comments: ${e.comments}</p>
        <p class="p">Downloads: ${e.downloads}</p>
      </div>
    </li>
  `).join(""),f=(r,e)=>{const o=S(e);r.innerHTML=o,m?m.refresh():m=new b(".gallery a")},p=document.getElementById("search-form"),l=document.getElementById("gallery"),g=document.getElementById("loader"),u=document.getElementById("load-more");let n=1,c="";const y=()=>g.classList.remove("hidden"),L=()=>g.classList.add("hidden"),w=()=>u.classList.remove("hidden"),E=()=>u.classList.add("hidden"),I=()=>{const{height:r}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})},M=async r=>{if(r.preventDefault(),c=p.elements["search-input"].value.trim(),!c){a.error({title:"Error",message:"Please enter a search query!"});return}n=1,l.innerHTML="",E(),y();try{const{hits:e,totalHits:o}=await h(c,n);e.length===0?a.warning({title:"No Results",message:"No images match your query. Try again!"}):(f(l,e),a.success({title:"Success",message:`Found ${o} images!`}),e.length<o&&w())}catch{a.error({title:"Error",message:"Something went wrong!"})}finally{L()}},P=async()=>{n+=1,y(),E();try{const{hits:r,totalHits:e}=await h(c,n);f(l,r),I(),n*15>=e?a.info({title:"End of Results",message:"You've reached the end of search results."}):w()}catch{a.error({title:"Error",message:"Failed to load more images!"})}finally{L()}};p.addEventListener("submit",M);u.addEventListener("click",P);
//# sourceMappingURL=index.js.map
