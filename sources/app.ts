//
// Create DOM Elements
//
type Stats = [number, number, number, number, number, number];
type Pair = [string, string];

interface Pokemon {
  name: string;
  baseStats: Stats;
  type: Pair;
  evYield: Stats;
  item: Pair;
  eggGroup: Pair;
  ability: Pair;
  hiddenAbility: string;
  levelUpMoves: [number, string][];
  eggMoves: string[];
}

let statsName: string[] = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"];
let statsLongName: string[] = [
  "HP",
  "Attack",
  "Defense",
  "Special Attack",
  "Special Defense",
  "Speed",
];
let strNull: string = "-------";

function clamp(num: number, min: number, max: number) {
  return Math.max(Math.min(num, max), min);
}

function makeCard(pokemon: Pokemon): HTMLElement {
  // Container
  let section = document.createElement("section");
  section.className = "pokemon";
  if (!pokemon.name) {
    section.style.display = "none";
    return section;
  }

  // Three sections
  let divTitle = document.createElement("div");
  section.appendChild(divTitle).className = "pokemon__title";

  let divData = document.createElement("div");
  section.appendChild(divData).className = "pokemon__data";

  let divMoves = document.createElement("div");
  section.appendChild(divMoves).className = "pokemon__moves";

  // Title
  let spanTitle = document.createElement("span");
  divTitle.appendChild(spanTitle).className = "pokemon__name";
  spanTitle.textContent = pokemon.name;

  let spanType1 = document.createElement("span");
  divTitle.appendChild(spanType1).className = "pokemon__type";
  spanType1.className += ` pokemon__type--${pokemon.type[0].toLowerCase()}`;
  spanType1.textContent = pokemon.type[0];

  if (pokemon.type[0] != pokemon.type[1]) {
    let spanType2 = document.createElement("span");
    divTitle.appendChild(spanType2).className = "pokemon__type";
    spanType2.className += ` pokemon__type--${pokemon.type[1].toLowerCase()}`;
    spanType2.textContent = pokemon.type[1];
  }

  // Data
  let divStats = document.createElement("div");
  divData.appendChild(divStats).className = "pokemon__stats";

  pokemon.baseStats.forEach((stat, id) => {
    let spanStatName = document.createElement("span");
    divStats.appendChild(spanStatName).className = "pokemon__stat-name";
    spanStatName.textContent = statsName[id];

    let spanStatValue = document.createElement("span");
    divStats.appendChild(spanStatValue).className = "pokemon__stat-value";
    spanStatValue.textContent = stat.toString();

    let spanStatBar = document.createElement("span");
    divStats.appendChild(spanStatBar).className = "pokemon__stat-bar";
    spanStatBar.className += ` pokemon__stat-bar--${Math.floor(
      (clamp(stat, 10, 110) - 10) / 20
    )}`;
    spanStatBar.style.width = `${clamp(stat, 25, 120) - 20}%`;
  });

  let divInfo = document.createElement("div");
  divData.appendChild(divInfo).className = "pokemon__info";

  let spanAbilityName = document.createElement("span");
  divInfo.appendChild(spanAbilityName).className = "pokemon__info-prop";
  spanAbilityName.textContent = "Ability";

  let spanAbility1 = document.createElement("span");
  divInfo.appendChild(spanAbility1).className = "pokemon__info-value";
  spanAbility1.textContent = pokemon.ability[0];

  if (
    pokemon.ability[1] != strNull &&
    pokemon.ability[1] != pokemon.ability[0]
  ) {
    let spanAbility2 = document.createElement("span");
    divInfo.appendChild(spanAbility2).className = "pokemon__info-value";
    spanAbility2.textContent = pokemon.ability[1];
  }

  if (pokemon.hiddenAbility != strNull) {
    let spanHAbilityName = document.createElement("span");
    divInfo.appendChild(spanHAbilityName).className = "pokemon__info-prop";
    spanHAbilityName.textContent = "Hidden Ability";

    let spanHAbilityValue = document.createElement("span");
    divInfo.appendChild(spanHAbilityValue).className = "pokemon__info-value";
    spanHAbilityValue.textContent = pokemon.hiddenAbility;
  }

  if (pokemon.item[0] != strNull || pokemon.item[1] != strNull) {
    let spanHItemName = document.createElement("span");
    divInfo.appendChild(spanHItemName).className = "pokemon__info-prop";
    spanHItemName.textContent = "Held Item";

    if (pokemon.item[0] != strNull) {
      let spanItem1 = document.createElement("span");
      divInfo.appendChild(spanItem1).className = "pokemon__info-value";
      spanItem1.textContent = pokemon.item[0];
    }

    if (pokemon.item[1] != strNull) {
      let spanItem2 = document.createElement("span");
      divInfo.appendChild(spanItem2).className = "pokemon__info-value";
      spanItem2.textContent = pokemon.item[1];
    }
  }

  let spanEGroupName = document.createElement("span");
  divInfo.appendChild(spanEGroupName).className = "pokemon__info-prop";
  spanEGroupName.textContent = "Egg Group";

  let spanGroup1 = document.createElement("span");
  divInfo.appendChild(spanGroup1).className = "pokemon__info-value";
  spanGroup1.textContent = pokemon.eggGroup[0];

  if (pokemon.eggGroup[1] != pokemon.eggGroup[0]) {
    let spanGroup2 = document.createElement("span");
    divInfo.appendChild(spanGroup2).className = "pokemon__info-value";
    spanGroup2.textContent = pokemon.eggGroup[1];
  }

  let spanEVYieldName = document.createElement("span");
  divInfo.appendChild(spanEVYieldName).className = "pokemon__info-prop";
  spanEVYieldName.textContent = "EV Yield";

  pokemon.evYield.forEach((ev, id) => {
    if (ev) {
      let spanEV = document.createElement("span");
      divInfo.appendChild(spanEV).className = "pokemon__info-value";
      spanEV.textContent = `${ev} ${statsLongName[id]}`;
    }
  });

  // Moves
  let divMovesHeader = document.createElement("div");
  divMoves.appendChild(divMovesHeader).className = "pokemon__moves-header";

  let h3MovesTitle = document.createElement("h3");
  divMovesHeader.appendChild(h3MovesTitle).className = "pokemon__moves-title";
  h3MovesTitle.textContent = "Learnset";

  let chevronDown = document.createElement("i");
  divMovesHeader.appendChild(chevronDown).className =
    "ai-chevron-down pokemon__moves-icon";

  let divMovesAll = document.createElement("div");
  divMoves.appendChild(divMovesAll).className = "pokemon__moves-all";

  if (pokemon.levelUpMoves.length) {
    let h4LevelMovesName = document.createElement("h4");
    divMovesAll.appendChild(h4LevelMovesName).className =
      "pokemon__lv-moves-header";
    h4LevelMovesName.textContent = "Level-up Moves";

    pokemon.levelUpMoves.forEach(([lv, move]) => {
      let spanLevel = document.createElement("span");
      divMovesAll.appendChild(spanLevel).className = "pokemon__lv-move-lv";
      spanLevel.textContent = lv.toString();
      let spanMove = document.createElement("span");
      divMovesAll.appendChild(spanMove).className = "pokemon__lv-move-name";
      spanMove.textContent = move;
    });
  }

  if (pokemon.eggMoves.length) {
    let h4EggMovesName = document.createElement("h4");
    divMovesAll.appendChild(h4EggMovesName).className =
      "pokemon__egg-moves-header";
    h4EggMovesName.textContent = "Egg Moves";

    pokemon.eggMoves.forEach((move) => {
      let spanMove = document.createElement("span");
      divMovesAll.appendChild(spanMove).className = "pokemon__egg-move-name";
      spanMove.textContent = move;
    });
  }
  return section;
}

//
// Preload Content
//
let loading: HTMLElement = document.querySelector(".loading")!;
let loadingBar: HTMLElement = loading.querySelector(".loading__bar-fill")!;
let loadingBarLength: number = 0;
let search: HTMLElement = document.querySelector(".search")!;

interface SearchIndex {
  pokemon: { [name: string]: number[] };
}
let searchIndex: SearchIndex;
let pokemonData: Pokemon[] = [];
let pokemonCards: HTMLElement[] = [];

(async () => {
  const data = await fetch("sources/unbound.json");
  pokemonData = await data.json();
  requestAnimationFrame(() => {
    loadingBar.style.transform = `scale(${(loadingBarLength += 5)}%, 100%)`;
  });
  setTimeout(function createCards() {
    pokemonCards.push(makeCard(pokemonData[pokemonCards.length]));
    requestAnimationFrame(() => {
      loadingBar.style.transform = `scale(${(loadingBarLength +=
        90 / pokemonData.length)}%, 100%)`;
    });
    if (pokemonCards.length != pokemonData.length) {
      setTimeout(createCards, 0);
    } else {
      loading.classList.add("loading--hidden");
      search.classList.remove("search--hidden");
    }
  }, 0);
  const index = await fetch("sources/search.json");
  searchIndex = await index.json();
  requestAnimationFrame(() => {
    loadingBar.style.transform = `scale(${(loadingBarLength += 5)}%, 100%)`;
  });
})();

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

//
// Search
//
let searchText: HTMLInputElement = document.querySelector(".search__text")!;
let foundIndex: number[] = [];
let foundIndexOld: number[] = [];
let fragment = document.createDocumentFragment();
let main: HTMLElement = document.querySelector("main")!;
let movesAll: HTMLElement;
let movesIcon: HTMLElement;

searchText.addEventListener("input", () => {
  foundIndexOld = foundIndex;
  foundIndex = [];

  if (searchText.value.length >= 3) {
    Object.entries(searchIndex.pokemon).forEach(([name, index]) => {
      if (name.match(new RegExp(searchText.value, "i"))) {
        foundIndex.push(...index);
      }
    });
    foundIndex.sort((a, b) => a - b);

    if (foundIndex.length > foundIndexOld.length) {
      foundIndex.forEach((id) => {
        fragment.appendChild(pokemonCards[id]);
        pokemonCards[id]
          .querySelector(".pokemon__moves-header")!
          .addEventListener("click", () => {
            movesAll = pokemonCards[id].querySelector(".pokemon__moves-all")!;
            movesIcon = pokemonCards[id].querySelector(".pokemon__moves-icon")!;
            if (movesAll.dataset.visible != "1") {
              movesAll.style.maxHeight = `${movesAll.scrollHeight}px`;
              movesIcon.style.transform = "rotate(180deg)";
              movesAll.dataset.visible = "1";
            } else {
              movesAll.style.maxHeight = "";
              movesIcon.style.transform = "";
              movesAll.dataset.visible = "0";
            }
          });
      });
      main.appendChild(fragment);
    } else {
      foundIndexOld
        .filter((n) => !foundIndex.includes(n))
        .forEach((id) => {
          pokemonCards[id].remove();
        });
    }
  } else {
    foundIndexOld.forEach((id) => {
      pokemonCards[id].remove();
    });
  }
});
