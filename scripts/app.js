"use strict";
let searchType = document.querySelector(".search__type");
let searchButton = searchType.querySelector(".search__button");
let searchOptions = searchType.querySelector(".search__options");
let firstOption = searchOptions.querySelector(".search__option");
let searchHidden = false;
function getPath(e) {
    let r = [];
    let t = e.target;
    while (t) {
        r.push(t);
        t = t.parentElement;
    }
    return r;
}
function searchToggle() {
    searchOptions.classList.toggle("search__options--hidden");
    searchButton.classList.toggle("search__button--closed");
    searchHidden = !searchHidden;
    searchType.dataset.hidden = (+searchHidden).toString();
}
searchButton.innerHTML = firstOption.innerHTML;
searchButton.classList.add(firstOption.className.match("search__option--[a-z]+")[0]);
searchType.dataset.value = "0";
firstOption.classList.add("search__option--hidden");
searchToggle();
searchType.addEventListener("click", (e) => {
    if (getPath(e).indexOf(searchButton) !== -1) {
        searchToggle();
    }
});
searchOptions.addEventListener("click", (e) => {
    getPath(e).forEach((target) => {
        if (target.matches(".search__option")) {
            let lastOption = searchOptions.children[+searchType.dataset.value];
            lastOption.classList.remove("search__option--hidden");
            searchButton.classList.remove(lastOption.className.match("search__option--[a-z]+")[0]);
            searchButton.innerHTML = target.innerHTML;
            searchButton.classList.add(target.className.match("search__option--[a-z]+")[0]);
            target.classList.add("search__option--hidden");
            searchType.dataset.value = [...searchOptions.children]
                .indexOf(target)
                .toString();
        }
        searchToggle();
    });
});
window.addEventListener("click", (e) => {
    if (getPath(e).indexOf(searchType) === -1 && !searchHidden)
        searchToggle();
});
