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
let statsName = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"];
let statsLongName = [
    "HP",
    "Attack",
    "Defense",
    "Special Attack",
    "Special Defense",
    "Speed",
];
let strNull = "-------";
function clamp(num, min, max) {
    return Math.max(Math.min(num, max), min);
}
function makeCard(pokemon, fragment) {
    let section = document.createElement("section");
    fragment.appendChild(section).className = "pokemon";
    if (!pokemon.name) {
        section.style.display = "none";
        return;
    }
    let divTitle = document.createElement("div");
    section.appendChild(divTitle).className = "pokemon__title";
    let divData = document.createElement("div");
    section.appendChild(divData).className = "pokemon__data";
    let divMoves = document.createElement("div");
    section.appendChild(divMoves).className = "pokemon__moves";
    let spanTitle = document.createElement("span");
    divTitle.appendChild(spanTitle).className = "pokemon__name";
    spanTitle.innerHTML = pokemon.name;
    let spanType1 = document.createElement("span");
    divTitle.appendChild(spanType1).className = "pokemon__type";
    spanType1.className += ` pokemon__type--${pokemon.type[0].toLowerCase()}`;
    spanType1.innerHTML = pokemon.type[0];
    if (pokemon.type[0] != pokemon.type[1]) {
        let spanType2 = document.createElement("span");
        divTitle.appendChild(spanType2).className = "pokemon__type";
        spanType2.className += ` pokemon__type--${pokemon.type[1].toLowerCase()}`;
        spanType2.innerHTML = pokemon.type[1];
    }
    let divStats = document.createElement("div");
    divData.appendChild(divStats).className = "pokemon__stats";
    pokemon.baseStats.forEach((stat, id) => {
        let spanStatName = document.createElement("span");
        divStats.appendChild(spanStatName).className = "pokemon__stat-name";
        spanStatName.innerHTML = statsName[id];
        let spanStatValue = document.createElement("span");
        divStats.appendChild(spanStatValue).className = "pokemon__stat-value";
        spanStatValue.innerHTML = stat.toString();
        let spanStatBar = document.createElement("span");
        divStats.appendChild(spanStatBar).className = "pokemon__stat-bar";
        spanStatBar.className += ` pokemon__stat-bar--${Math.floor((clamp(stat, 10, 110) - 10) / 20)}`;
        spanStatBar.style.width = `${clamp(stat, 35, 120) - 20}%`;
    });
    let divInfo = document.createElement("div");
    divData.appendChild(divInfo).className = "pokemon__info";
    let spanAbilityName = document.createElement("span");
    divInfo.appendChild(spanAbilityName).className = "pokemon__info-prop";
    spanAbilityName.innerHTML = "Ability";
    let spanAbility1 = document.createElement("span");
    divInfo.appendChild(spanAbility1).className = "pokemon__info-value";
    spanAbility1.innerHTML = pokemon.ability[0];
    if (pokemon.ability[1] != strNull &&
        pokemon.ability[1] != pokemon.ability[0]) {
        let spanAbility2 = document.createElement("span");
        divInfo.appendChild(spanAbility2).className = "pokemon__info-value";
        spanAbility2.innerHTML = pokemon.ability[1];
    }
    if (pokemon.hiddenAbility != strNull) {
        let spanHAbilityName = document.createElement("span");
        divInfo.appendChild(spanHAbilityName).className = "pokemon__info-prop";
        spanHAbilityName.innerHTML = "Hidden Ability";
        let spanHAbilityValue = document.createElement("span");
        divInfo.appendChild(spanHAbilityValue).className = "pokemon__info-value";
        spanHAbilityValue.innerHTML = pokemon.hiddenAbility;
    }
    if (pokemon.item[0] != strNull || pokemon.item[1] != strNull) {
        let spanHItemName = document.createElement("span");
        divInfo.appendChild(spanHItemName).className = "pokemon__info-prop";
        spanHItemName.innerHTML = "Held Item";
        if (pokemon.item[0] != strNull) {
            let spanItem1 = document.createElement("span");
            divInfo.appendChild(spanItem1).className = "pokemon__info-value";
            spanItem1.innerHTML = pokemon.item[0];
        }
        if (pokemon.item[1] != strNull) {
            let spanItem2 = document.createElement("span");
            divInfo.appendChild(spanItem2).className = "pokemon__info-value";
            spanItem2.innerHTML = pokemon.item[1];
        }
    }
    let spanEGroupName = document.createElement("span");
    divInfo.appendChild(spanEGroupName).className = "pokemon__info-prop";
    spanEGroupName.innerHTML = "Egg Group";
    let spanGroup1 = document.createElement("span");
    divInfo.appendChild(spanGroup1).className = "pokemon__info-value";
    spanGroup1.innerHTML = pokemon.eggGroup[0];
    if (pokemon.eggGroup[1] != pokemon.eggGroup[0]) {
        let spanGroup2 = document.createElement("span");
        divInfo.appendChild(spanGroup2).className = "pokemon__info-value";
        spanGroup2.innerHTML = pokemon.eggGroup[1];
    }
    let spanEVYieldName = document.createElement("span");
    divInfo.appendChild(spanEVYieldName).className = "pokemon__info-prop";
    spanEVYieldName.innerHTML = "EV Yield";
    pokemon.evYield.forEach((ev, id) => {
        if (ev) {
            let spanEV = document.createElement("span");
            divInfo.appendChild(spanEV).className = "pokemon__info-value";
            spanEV.innerHTML = `${ev} ${statsLongName[id]}`;
        }
    });
    let divMovesHeader = document.createElement("div");
    divMoves.appendChild(divMovesHeader).className = "pokemon__moves-header";
    let h3MovesTitle = document.createElement("h3");
    divMovesHeader.appendChild(h3MovesTitle).className = "pokemon__moves-title";
    h3MovesTitle.innerHTML = "Learnset";
    let chevronDown = document.createElement("i");
    divMovesHeader.appendChild(chevronDown).className =
        "ai-chevron-down pokemon__moves-icon";
    let divMovesAll = document.createElement("div");
    divMoves.appendChild(divMovesAll).className = "pokemon__moves-all";
    if (pokemon.levelUpMoves.length) {
        let h4LevelMovesName = document.createElement("h4");
        divMovesAll.appendChild(h4LevelMovesName).className =
            "pokemon__lv-moves-header";
        h4LevelMovesName.innerHTML = "Level-up Moves";
        pokemon.levelUpMoves.forEach(([lv, move]) => {
            let spanLevel = document.createElement("span");
            divMovesAll.appendChild(spanLevel).className = "pokemon__lv-move-lv";
            spanLevel.innerHTML = lv.toString();
            let spanMove = document.createElement("span");
            divMovesAll.appendChild(spanMove).className = "pokemon__lv-move-name";
            spanMove.innerHTML = move;
        });
    }
    if (pokemon.eggMoves.length) {
        let h4EggMovesName = document.createElement("h4");
        divMovesAll.appendChild(h4EggMovesName).className =
            "pokemon__egg-moves-header";
        h4EggMovesName.innerHTML = "Egg Moves";
        pokemon.eggMoves.forEach((move) => {
            let spanMove = document.createElement("span");
            divMovesAll.appendChild(spanMove).className = "pokemon__egg-move-name";
            spanMove.innerHTML = move;
        });
    }
}
let searchText = document.querySelector(".search__text");
let searchIndex;
let foundIndex;
let pokemonData;
let pokemonCards;
let main = document.querySelector("main");
let frag = document.createDocumentFragment();
(async () => {
    const search = await fetch("sources/search.json");
    searchIndex = await search.json();
    const data = await fetch("sources/unbound.json");
    pokemonData = await data.json();
})();
searchText.addEventListener("input", async (e) => {
    if (searchText.value.length >= 3) {
        if (!searchIndex) {
            const res = await fetch("sources/search.json");
            searchIndex = await res.json();
        }
        foundIndex = [];
        for (let name in searchIndex.pokemon) {
            if (name.match(new RegExp(`${searchText.value}`, "i"))) {
                foundIndex.push(...searchIndex.pokemon[name]);
            }
        }
        foundIndex.sort((a, b) => a - b);
        if (!pokemonData) {
            const res = await fetch("sources/unbound.json");
            pokemonData = await res.json();
        }
        if (!pokemonCards) {
            pokemonCards = Array.apply(null, Array(pokemonData.length));
        }
        pokemonCards.forEach((elem) => {
            if (elem)
                elem.remove();
        });
        foundIndex.forEach((id) => {
            if (!pokemonCards[id]) {
                makeCard(pokemonData[id], frag);
                main.appendChild(frag);
                let card = main.lastElementChild;
                pokemonCards[id] = card;
                card
                    .querySelector(".pokemon__moves-header")
                    .addEventListener("click", () => {
                    let movesAll = card.querySelector(".pokemon__moves-all");
                    let movesIcon = card.querySelector(".pokemon__moves-icon");
                    if (!movesAll.style.maxHeight) {
                        movesAll.style.maxHeight = `${movesAll.scrollHeight}px`;
                        movesIcon.classList.add("pokemon__moves-icon--flip");
                    }
                    else {
                        movesAll.style.maxHeight = "";
                        movesIcon.classList.remove("pokemon__moves-icon--flip");
                    }
                });
            }
            else {
                main.appendChild(pokemonCards[id]);
            }
        });
    }
    else {
        pokemonCards.forEach((elem) => {
            if (elem)
                elem.remove();
        });
    }
});
