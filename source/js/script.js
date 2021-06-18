const container = document.querySelector(".text-container");
const text = document.querySelector(".text-container__text");
const modalList = document.querySelector(".modal__list");
const pages = document.querySelector(".modal__pagination-pages");

window.addEventListener("input", (e) => {
    const value = 100 - e.target.value;
    container.scrollTop = (container.scrollHeight - container.clientHeight) / 100 * value;
});

const modal = document.querySelector(".modal");
const openModal = document.querySelector(".slide3__btn");
const closeModal = document.querySelector(".modal__close");
openModal.addEventListener("click", () => {
    modal.style.display = "inline";
});
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});
const itemsPerPage = 3;
const countPages = Math.ceil(modalList.children.length / itemsPerPage);
if (countPages) {
    for (let i = 1; i <= countPages; i++) {
        const link = `<a href="#" id="${i}" class="modal__pagination-link"></a>`;
        pages.insertAdjacentHTML('beforeend', link);
    }
}
const links = Array.prototype.slice.call(document.querySelectorAll(".modal__pagination-link"));
const modalListItems = Array.prototype.slice.call(document.querySelector(".modal__list").children);
links[0].classList.add("_active");
let currentItems = modalListItems.slice(0, 3);
currentItems.forEach(item => item.classList.add("_visible"));
const prev = document.querySelector("._prev");
const next = document.querySelector("._next");
const controls = document.querySelectorAll(".modal__pagination-arrow");
controls.forEach(control => {
   control.addEventListener("click", (e) => {
       let currentLink = links.find(link => link.classList.contains("_active"));
       if (e.target.classList.contains("_prev") && currentLink.id > 1) {
           currentLink.classList.remove("_active");
           currentLink.previousSibling.classList.add("_active");
           currentLink = currentLink.previousSibling;
       }
       else if(e.target.classList.contains("_next") && currentLink.id < countPages) {
           currentLink.classList.remove("_active");
           currentLink.nextSibling.classList.add("_active");
           currentLink = currentLink.nextSibling;
       }
       let i = 3 * (currentLink.id - 1);
       currentItems.forEach(item => item.classList.remove("_visible"));
       currentItems = modalListItems.slice(i, i + 3);
       currentItems.forEach(item => item.classList.add("_visible"));
   })
});
document.querySelectorAll('a[href^="#"]').forEach(elem => {
    elem.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(elem.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });
});