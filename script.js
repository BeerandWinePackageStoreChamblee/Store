// Mobile menu
(function menuToggle(){
  const btn = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  btn?.addEventListener("click", () => {
    const open = menu.classList.toggle("show");
    btn.setAttribute("aria-expanded", String(open));
  });
})();

// Smooth scroll on in-page nav clicks + close mobile menu
(function smoothScroll(){
  const menu = document.getElementById("menu");
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", e=>{
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth", block:"start"});
      // close mobile menu if open
      if (menu.classList.contains("show")) menu.classList.remove("show");
      const btn = document.getElementById("menu-toggle");
      btn?.setAttribute("aria-expanded","false");
    });
  });
})();

// Lightbox for gallery (no deps)
(function lightbox(){
  const links = document.querySelectorAll("[data-lightbox]");
  if (!links.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.hidden = true;

  const img = document.createElement("img");
  const close = document.createElement("button");
  close.className = "close";
  close.textContent = "Close ×";

  overlay.append(img, close);
  document.body.appendChild(overlay);

  function open(src, alt){
    img.src = src;
    img.alt = alt || "";
    overlay.hidden = false;
  }
  function hide(){ overlay.hidden = true; img.removeAttribute("src"); }

  links.forEach(a=>{
    a.addEventListener("click", (e)=>{
      e.preventDefault();
      const src = a.getAttribute("href");
      const alt = a.querySelector("img")?.alt || "";
      open(src, alt);
    });
  });
  overlay.addEventListener("click", (e)=>{ if (e.target === overlay) hide(); });
  close.addEventListener("click", hide);
  document.addEventListener("keydown", (e)=>{ if (e.key === "Escape" && !overlay.hidden) hide(); });
})();

// Scroll to top button
(function toTop(){
  const btn = document.getElementById("to-top");
  const showAt = 400; // px
  function onScroll(){
    if (window.scrollY > showAt) btn.classList.add("show");
    else btn.classList.remove("show");
  }
  window.addEventListener("scroll", onScroll, {passive:true});
  btn.addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));
  onScroll();
})();

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
