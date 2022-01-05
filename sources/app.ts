//
// Search Dropdown
//
let searchType: HTMLElement = document.querySelector(".search__type")!;
let searchButton: HTMLElement = searchType.querySelector(".search__button")!;
let searchOptions: HTMLElement = searchType.querySelector(".search__options")!;
let firstOption: HTMLElement = searchOptions.querySelector(".search__option")!;
let searchHidden: boolean = false;

function getPath(e: Event) {
  let r: HTMLElement[] = [];
  let t: HTMLElement | null = e.target as HTMLElement;
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

// Init styles
searchButton.innerHTML = firstOption.innerHTML;
searchButton.classList.add(
  firstOption.className.match("search__option--[a-z]+")![0]
);
searchType.dataset.value = "0";
firstOption.classList.add("search__option--hidden");
searchToggle();

// Toggle when clicked on button
searchType.addEventListener("click", (e: Event) => {
  if (getPath(e).indexOf(searchButton) !== -1) {
    searchToggle();
  }
});

// Select options
searchOptions.addEventListener("click", (e: Event) => {
  getPath(e).forEach((target: HTMLElement) => {
    if (target.matches(".search__option")) {
      let lastOption: HTMLElement = searchOptions.children[
        +searchType.dataset.value!
      ] as HTMLElement;

      lastOption.classList.remove("search__option--hidden");
      searchButton.classList.remove(
        lastOption.className.match("search__option--[a-z]+")![0]
      );

      searchButton.innerHTML = target.innerHTML;
      searchButton.classList.add(
        target.className.match("search__option--[a-z]+")![0]
      );
      target.classList.add("search__option--hidden");
      searchType.dataset.value = [...searchOptions.children]
        .indexOf(target)!
        .toString();
    }
    searchToggle();
  });
});

// Hide if clicked outside
window.addEventListener("click", (e: Event) => {
  if (getPath(e).indexOf(searchType) === -1 && !searchHidden) searchToggle();
});
