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
  evolutionType: 0 | 1 | 2;
  levelUpMoves: [number, string][];
  eggMoves: string[];
  tmMoves: string[];
  tutorMoves: string[];
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
  divTitle.appendChild(spanTitle).className = `pokemon__name${
    pokemon.evolutionType === 1 ? " pokemon__name--mega" : ""
  }${pokemon.evolutionType === 2 ? " pokemon__name--giga" : ""}`;
  spanTitle.textContent = pokemon.name;

  let imgPokemon = document.createElement("img");
  divTitle.appendChild(imgPokemon).className = "pokemon__img";

  let divType1 = document.createElement("div");
  divTitle.appendChild(
    divType1
  ).className = `pokemon__type pokemon__type--${pokemon.type[0].toLowerCase()}`;
  divType1.title = `${pokemon.type[0]}`;

  if (pokemon.type[0] != pokemon.type[1]) {
    let divType2 = document.createElement("div");
    divTitle.appendChild(
      divType2
    ).className = `pokemon__type pokemon__type--${pokemon.type[1].toLowerCase()}`;
    divType2.title = `${pokemon.type[1]}`;
  }

  // Data
  let tableStats = document.createElement("table");
  divData.appendChild(tableStats).className = "pokemon__stats";

  pokemon.baseStats.forEach((stat, id) => {
    let trStat = document.createElement("tr");
    tableStats.appendChild(trStat);

    let tdStatName = document.createElement("td");
    trStat.appendChild(tdStatName).className = "pokemon__stat-name";
    tdStatName.textContent = statsName[id];

    let tdStatValue = document.createElement("td");
    trStat.appendChild(tdStatValue).className = "pokemon__stat-value";
    tdStatValue.textContent = stat.toString();

    let tdStatBar = document.createElement("td");
    trStat.appendChild(tdStatBar);

    let spanStatBar = document.createElement("span");
    tdStatBar.appendChild(spanStatBar);
    spanStatBar.className = `pokemon__stat-bar pokemon__stat-bar--${Math.floor(
      (clamp(stat, 10, 110) - 10) / 20
    )}`;
    spanStatBar.style.width = `${clamp(stat, 25, 120) - 20}%`;
  });

  let tableInfo = document.createElement("table");
  divData.appendChild(tableInfo).className = "pokemon__info";

  let trAbility1 = document.createElement("tr");
  tableInfo.appendChild(trAbility1);

  let tdAbilityName = document.createElement("td");
  trAbility1.appendChild(tdAbilityName).className = "pokemon__info-prop";
  tdAbilityName.textContent = "Ability";

  let tdAbility1 = document.createElement("td");
  trAbility1.appendChild(tdAbility1).className = "pokemon__info-value";
  tdAbility1.textContent = pokemon.ability[0];

  if (pokemon.ability[1] != strNull) {
    let trAbility2 = document.createElement("tr");
    tableInfo.appendChild(trAbility2);

    tdAbilityName.rowSpan = 2;

    let tdAbility2 = document.createElement("td");
    trAbility2.appendChild(tdAbility2).className = "pokemon__info-value";
    tdAbility2.textContent = pokemon.ability[1];
  }

  if (pokemon.hiddenAbility != strNull) {
    let trHAbility = document.createElement("tr");
    tableInfo.appendChild(trHAbility);

    let tdHAbilityName = document.createElement("td");
    trHAbility.appendChild(tdHAbilityName).className = "pokemon__info-prop";
    tdHAbilityName.textContent = "Hidden Ability";

    let tdHAbilityValue = document.createElement("td");
    trHAbility.appendChild(tdHAbilityValue).className = "pokemon__info-value";
    tdHAbilityValue.textContent = pokemon.hiddenAbility;
  }

  if (pokemon.item[0] != strNull || pokemon.item[1] != strNull) {
    let trItems1 = document.createElement("tr");
    tableInfo.appendChild(trItems1);

    let tdHItemName = document.createElement("td");
    trItems1.appendChild(tdHItemName).className = "pokemon__info-prop";
    tdHItemName.textContent = "Held Item";

    if (pokemon.item[0] != strNull) {
      let tdItem1 = document.createElement("td");
      trItems1.appendChild(tdItem1).className = "pokemon__info-value";
      tdItem1.textContent = pokemon.item[0];
    }

    if (pokemon.item[1] != strNull) {
      let tdItem2 = document.createElement("td");
      tdItem2.className = "pokemon__info-value";
      tdItem2.textContent = pokemon.item[1];
      if (pokemon.item[0] == strNull) {
        trItems1.appendChild(tdItem2);
      } else {
        let trItems2 = document.createElement("tr");
        tableInfo.appendChild(trItems2);

        tdHItemName.rowSpan = 2;

        trItems2.appendChild(tdItem2);
      }
    }
  }

  let trEGroup1 = document.createElement("tr");
  tableInfo.appendChild(trEGroup1);

  let tdEGroupName = document.createElement("td");
  trEGroup1.appendChild(tdEGroupName).className = "pokemon__info-prop";
  tdEGroupName.textContent = "Egg Group";

  let tdGroup1 = document.createElement("td");
  trEGroup1.appendChild(tdGroup1).className = "pokemon__info-value";
  tdGroup1.textContent = pokemon.eggGroup[0];

  if (pokemon.eggGroup[1] != pokemon.eggGroup[0]) {
    let trEGroup2 = document.createElement("tr");
    tableInfo.appendChild(trEGroup2);

    tdEGroupName.rowSpan = 2;

    let tdGroup2 = document.createElement("td");
    trEGroup2.appendChild(tdGroup2).className = "pokemon__info-value";
    tdGroup2.textContent = pokemon.eggGroup[1];
  }

  let trEvYield = document.createElement("tr");
  tableInfo.appendChild(trEvYield);

  let tdEVYieldName = document.createElement("td");
  trEvYield.appendChild(tdEVYieldName).className = "pokemon__info-prop";
  tdEVYieldName.textContent = "EV Yield";

  let evYieldRowspan = 0;

  pokemon.evYield.forEach((ev, id) => {
    if (ev) {
      if (++evYieldRowspan > 1) {
        trEvYield = document.createElement("tr");
        tableInfo.appendChild(trEvYield);
        tdEVYieldName.rowSpan = evYieldRowspan;
      }

      let tdEvGain = document.createElement("td");
      trEvYield.appendChild(tdEvGain).className = "pokemon__info-value";
      tdEvGain.textContent = `${ev} ${statsLongName[id]}`;
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
  divMoves.appendChild(divMovesAll).className = "pokemon__moves-data";

  let tableMovesTable = document.createElement("table");
  divMovesAll.appendChild(tableMovesTable).className = "pokemon__moves-table";

  let trMovesHeader = document.createElement("tr");
  tableMovesTable.appendChild(trMovesHeader);

  let thLevelUpMoves = document.createElement("th");
  trMovesHeader.appendChild(thLevelUpMoves).className =
    "pokemon__moves-title-level";
  thLevelUpMoves.colSpan = 2;
  thLevelUpMoves.textContent = "Level-up Moves";

  let thEggMoves = document.createElement("th");
  trMovesHeader.appendChild(thEggMoves).className = "pokemon__moves-title-egg";
  thEggMoves.textContent = "Egg Moves";

  let maxMoves = Math.max(pokemon.levelUpMoves.length, pokemon.eggMoves.length);

  for (let id = 0; id < maxMoves; id++) {
    let trMove = document.createElement("tr");
    tableMovesTable.appendChild(trMove);

    if (pokemon.levelUpMoves[id]) {
      let tdMoveLevel = document.createElement("td");
      trMove.appendChild(tdMoveLevel).className = "pokemon__move-level";
      tdMoveLevel.textContent = pokemon.levelUpMoves[id][0]
        ? pokemon.levelUpMoves[id][0].toString()
        : "EVO"; // Moves on level 0 are evolution moves

      let tdMoveName = document.createElement("td");
      trMove.appendChild(tdMoveName).className = "pokemon__move-level-name";
      tdMoveName.textContent = pokemon.levelUpMoves[id][1];
    } else {
      trMove.appendChild(document.createElement("td"));
      trMove.appendChild(document.createElement("td"));
    }

    if (pokemon.eggMoves[id]) {
      let tdMoveEggName = document.createElement("td");
      trMove.appendChild(tdMoveEggName).className = "pokemon__move-egg-name";
      tdMoveEggName.textContent = pokemon.eggMoves[id];
    } else {
      trMove.appendChild(document.createElement("td"));
    }
  }

  let divLearnableMoves = document.createElement("div");
  divLearnableMoves.className = "pokemon__learnable-moves";
  divMovesAll.appendChild(divLearnableMoves);

  let divTmMoves = document.createElement("div");
  divTmMoves.className = "pokemon__learnable-moves-group";

  let divTmHeader = document.createElement("span");
  divTmHeader.textContent = "TM Moves";
  divTmHeader.className = "pokemon__learnable-moves-group-header";
  
  let divTmContent = document.createElement("div");
  divTmContent.className = "pokemon__learnable-moves-group-items";
  for (let move of pokemon.tmMoves) {
    let item = document.createElement("span");
    item.className = "pokemon__learnable-moves-group-item";
    item.textContent = move;

    divTmContent.appendChild(item);
  }

  divTmMoves.appendChild(divTmHeader);
  divTmMoves.appendChild(divTmContent);

  divLearnableMoves.appendChild(divTmMoves);

  let divTutorMoves = document.createElement("div");
  divTutorMoves.className = "pokemon__learnable-moves-group";

  let divTutorHeader = document.createElement("span");
  divTutorHeader.textContent = "Tutor Moves";
  divTutorHeader.className = "pokemon__learnable-moves-group-header";

  let divTutorContent = document.createElement("div");
  divTutorContent.className = "pokemon__learnable-moves-group-items";
  for (let move of pokemon.tutorMoves) {
    let item = document.createElement("span");
    item.className = "pokemon__learnable-moves-group-item";
    item.textContent = move;

    divTutorContent.appendChild(item);
  }

  divTutorMoves.appendChild(divTutorHeader);
  divTutorMoves.appendChild(divTutorContent);

  divLearnableMoves.appendChild(divTutorMoves);

  return section;
}

//
// Preload Content
//
let loading: HTMLElement = document.querySelector(".loading")!;
let loadingBar: HTMLElement = loading.querySelector(".loading__bar-fill")!;
let loadingText: HTMLElement = loading.querySelector(".loading__text")!;
let loadingBarLength: number = 0;
let search: HTMLElement = document.querySelector(".search")!;
let credits: HTMLElement = document.querySelector(".credits")!;

interface SearchIndex {
  [index: string]: { [name: string]: number[] };
  pokemon: { [name: string]: number[] };
  items: { [name: string]: number[] };
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
      loadingText.textContent = `${(
        (pokemonCards.length / pokemonData.length) *
        100
      ).toFixed(1)}%`;
    });
    if (pokemonCards.length < pokemonData.length) {
      setTimeout(createCards, 0);
    } else {
      loading.classList.add("loading--hidden");
      search.classList.remove("search--hidden");
      credits.style.display = "none";
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
      searchText.value = "";
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
let searchBox: HTMLElement = document.querySelector(".search__box")!;
let searchText: HTMLInputElement = document.querySelector(".search__text")!;
let searchIcon: HTMLElement = document.querySelector(".search__icon")!;
let searchStrings: HTMLElement = document.querySelector(".search__strings")!;
let pokemons: HTMLDivElement = document.querySelector(".pokemons")!;
let documentFragment: DocumentFragment = document.createDocumentFragment();
let searchResults: number[] = [];
let searchResultsVisible: number = 0;
let bufferElement: HTMLElement;
let regexStr: RegExp;
let valueMap: string[] = ["pokemon", "items", "moves", "abilities"];

function updateSearchStrings(
  element: DocumentFragment | undefined = undefined
) {
  if (element && element.firstChild) {
    searchStrings.replaceChildren(element);
    searchIcon.style.borderRadius = "0 0.5rem 0 0";
  } else {
    searchStrings.replaceChildren();
    searchIcon.style.borderRadius = "";
  }
}

function updateSearch() {
  const query = searchText.value;
  if (!query) {
    searchResults = [];
  } else {
    searchResults =
      searchIndex[valueMap[+searchType.dataset.value!]][query] || [];
  }
  searchResultsVisible = 0;
  loadCards();
}

function loadCards() {
  if (!searchResults.length) {
    pokemons.replaceChildren();
    return;
  }
  if (searchResultsVisible == searchResults.length) return;

  const visibleBefore: number = searchResultsVisible;
  let id = 0;
  for (
    ;
    searchResultsVisible < Math.min(visibleBefore + 5, searchResults.length);
    searchResultsVisible++
  ) {
    documentFragment.appendChild(
      (bufferElement = pokemonCards[(id = searchResults[searchResultsVisible])])
    );
    if (!bufferElement.dataset.event) {
      (<HTMLImageElement>(
        bufferElement.querySelector(".pokemon__img")
      )).src = `images/${id}.png`;
      const header: HTMLElement = bufferElement.querySelector(
        ".pokemon__moves-header"
      )!;
      const movesData: HTMLElement = bufferElement.querySelector(
        ".pokemon__moves-data"
      )!;
      const movesIcon: HTMLElement = bufferElement.querySelector(
        ".pokemon__moves-icon"
      )!;
      header.addEventListener("click", () => {
        if (!header.dataset.visible) {
          movesData.style.maxHeight = `${movesData.scrollHeight}px`;
          movesIcon.style.transform = "rotate(180deg)";
          header.dataset.visible = "1";
        } else {
          movesData.style.maxHeight = "";
          movesIcon.style.transform = "";
          header.dataset.visible = "";
        }
      });
      bufferElement.dataset.event = "1";
    }
  }
  if (visibleBefore) {
    pokemons.appendChild(documentFragment);
  } else {
    pokemons.replaceChildren(documentFragment);
  }
}

searchText.addEventListener("input", () => {
  if (searchText.value.length) {
    regexStr = new RegExp(searchText.value, "i");
    Object.keys(searchIndex[valueMap[+searchType.dataset.value!]]).forEach(
      (name) => {
        if (name.match(regexStr)) {
          (bufferElement = document.createElement("li")).className =
            "search__string";
          documentFragment.appendChild(bufferElement);
          bufferElement.textContent = name;
        }
      }
    );
    updateSearchStrings(documentFragment);
  } else {
    updateSearchStrings();
    searchIcon.style.borderRadius = "";
  }
});

searchStrings.addEventListener("mousedown", (e) => {
  if ((<HTMLElement>e.target).className != "search__string") return;
  searchText.value = (<HTMLElement>e.target).textContent!;
  updateSearchStrings();
  updateSearch();
});

searchText.addEventListener("keyup", (e) => {
  if (e.key != "Enter") return;
  if (searchStrings.firstElementChild) {
    searchText.value = searchStrings.firstElementChild.textContent!;
    updateSearchStrings();
  }
  updateSearch();
});

window.addEventListener("click", (e) => {
  if (getPath(e).indexOf(searchBox) == -1) {
    updateSearchStrings();
  }
});

window.addEventListener(
  "scroll",
  () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 0.5 * clientHeight) {
      loadCards();
    }
  },
  { passive: true }
);
