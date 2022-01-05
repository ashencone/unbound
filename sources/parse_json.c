#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <regex.h>

#include "DPE/include/types.h"
#include "DPE/include/abilities.h"
#include "DPE/include/base_stats.h"
#include "DPE/include/items.h"
#include "DPE/include/moves.h"
#include "DPE/include/species.h"

#include "DPE/src/Base_Stats.c"
#include "DPE/src/Evolution Table.c"
#include "DPE/src/Learnsets.c"
#include "DPE/src/Egg_Moves.c"

#define FALSE 0
#define TRUE 1

void load_strings(FILE *file, char list[][32], int *len, int counter);

int main(int argc, char **argv)
{
    //
    // Load necessary strings into arrays
    //

    // Pokemon names
    char string_pokemon[NUM_SPECIES][32];
    int string_pokemon_len = 0;
    FILE *f_pokemon;

    f_pokemon = fopen("DPE/strings/Pokemon_Name_Table.string", "r");
    if (f_pokemon == NULL) exit(1);
    load_strings(f_pokemon, string_pokemon, &string_pokemon_len, NUM_SPECIES);
    fclose(f_pokemon);

    // Ability names
    char string_ability[ABILITY_PASTELVEIL + 1][32];
    int string_ability_len = 0;
    FILE *f_ability;

    f_ability = fopen("CFRU/strings/ability_name_table.string", "r");
    if (f_ability == NULL) exit(1);
    load_strings(f_ability, string_ability, &string_ability_len, ABILITY_PASTELVEIL + 1);
    fclose(f_ability);

    // Move names
    char string_move[NON_Z_MOVE_COUNT][32];
    int string_move_len = 0;
    FILE *f_move;

    f_move = fopen("CFRU/strings/attack_name_table.string", "r");
    if (f_move == NULL) exit(1);
    load_strings(f_move, string_move, &string_move_len, NON_Z_MOVE_COUNT);
    fclose(f_move);

    // Item names [Hardcoded]
    char string_item[ITEMS_COUNT][32] = {
        [0] = "-------",
        [13] = "Potion",
        [24] = "Revive",
        [25] = "Max Revive",
        [29] = "Moomoo Milk",
        [44] = "Berry Juice",
        [45] = "Sacred Ash",
        [55] = "Life Orb",
        [56] = "Toxic Orb",
        [57] = "Flame Orb",
        [58] = "Black Sludge",
        [72] = "Honey",
        [90] = "Light Clay",
        [93] = "Sun Stone",
        [94] = "Moon Stone",
        [95] = "Fire Stone",
        [97] = "Water Stone",
        [98] = "Leaf Stone",
        [102] = "Oval Stone",
        [103] = "Tiny Mushroom",
        [104] = "Big Mushroom",
        [106] = "Pearl",
        [107] = "Big Pearl",
        [108] = "Stardust",
        [109] = "Star Piece",
        [110] = "Nugget",
        [111] = "Heart Scale",
        [113] = "Magmarizer",
        [133] = "Cheri Berry",
        [134] = "Chesto Berry",
        [135] = "Pecha Berry",
        [136] = "Rawst Berry",
        [137] = "Aspear Berry",
        [138] = "Leppa Berry",
        [139] = "Oran Berry",
        [140] = "Persim Berry",
        [141] = "Lum Berry",
        [142] = "Sitrus Berry",
        [179] = "Bright Powder",
        [183] = "Quick Claw",
        [185] = "Mental Herb",
        [187] = "King's Rock",
        [188] = "Silver Powder",
        [190] = "Cleanse Tag",
        [192] = "Deep Sea Tooth",
        [193] = "Deep Sea Scale",
        [194] = "Smoke Ball",
        [195] = "Everstone",
        [196] = "Focus Band",
        [197] = "Lucky Egg",
        [199] = "Metal Coat",
        [200] = "Leftovers",
        [201] = "Dragon Scale",
        [202] = "Light Ball",
        [203] = "Soft Sand",
        [204] = "Hard Stone",
        [205] = "Miracle Seed",
        [206] = "Black Glasses",
        [207] = "Black Belt",
        [208] = "Magnet",
        [209] = "Mystic Water",
        [210] = "Sharp Beak",
        [211] = "Poison Barb",
        [212] = "Never-Melt Ice",
        [213] = "Spell Tag",
        [214] = "Twisted Spoon",
        [215] = "Charcoal",
        [216] = "Dragon Fang",
        [218] = "Upgrade",
        [222] = "Lucky Punch",
        [223] = "Metal Powder",
        [224] = "Thick Club",
        [225] = "Leek",
        [230] = "Razor Claw",
        [231] = "Razor Fang",
        [234] = "Electrizer",
        [235] = "Expert Belt",
        [236] = "Power Herb",
        [237] = "Wide Lens",
        [250] = "Big Root",
        [516] = "Casteliacone",
        [540] = "Passho Berry",
        [541] = "Wacan Berry",
        [542] = "Rindo Berry",
        [543] = "Yache Berry",
        [544] = "Chople Berry",
        [545] = "Kebia Berry",
        [546] = "Shuca Berry",
        [547] = "Coba Berry",
        [548] = "Payapa Berry",
        [549] = "Tanga Berry",
        [550] = "Charti Berry",
        [552] = "Haban Berry",
        [554] = "Babiri Berry",
        [555] = "Chilan Berry",
        [563] = "Absorb Bulb",
        [564] = "Air Balloon",
        [567] = "Cell Battery",
        [571] = "Grip Claw",
        [573] = "Lagging Tail",
        [574] = "Luminous Moss",
        [575] = "Quick Powder",
        [576] = "Metronome",
        [581] = "Shed Shell",
        [582] = "Snowball",
        [583] = "Sticky Barb",
        [586] = "Electric Seed",
        [587] = "Grassy Seed",
        [588] = "Misty Seed",
        [589] = "Psychic Seed",
        [615] = "Pretty Wing",
        [618] = "Red Necter",
        [619] = "Yellow Necter",
        [620] = "Pink Necter",
        [621] = "Purple Necter"
    };

    // Type names [Hardcoded]
    char string_type[TYPE_FAIRY + 1][32] = {
        "Normal",
        "Fighting",
        "Flying",
        "Poison",
        "Ground",
        "Rock",
        "Bug",
        "Ghost",
        "Steel",
        "-------",
        "Fire",
        "Water",
        "Grass",
        "Electric",
        "Psychic",
        "Ice",
        "Dragon",
        "Dark",
        "-------",
        "-------",
        "-------",
        "-------",
        "-------",
        "Fairy"
    };

    // Egg nroups [Hardcoded]
    char string_egg[EGG_GROUP_UNDISCOVERED + 1][32] = {
        "-------",
        "Monster",
        "Water 1",
        "Bug",
        "Flying",
        "Field",
        "Fairy",
        "Grass",
        "Human-Like",
        "Water 3",
        "Mineral",
        "Amorphous",
        "Water 2",
        "Ditto",
        "Dragon",
        "Undiscovered"
    };

    //
    // Create the JSON
    //
    int i, j;
    FILE *json;
    char buffer_main[4096];
    char buffer_local[1024];
    struct BaseStats stats;
    struct LevelUpMove *lv_moves;
    u16 egg_moves[64];
    int egg_moves_count;

    json = fopen("unbound.json", "w");
    if (json == NULL) exit(3);

    fprintf(json, "[\n"); // Array opening
    for (i = 1; i < NUM_SPECIES; i++) {
        buffer_main[0] = '\0';  // Empty main buffer
        snprintf(buffer_main, 4096, "\t{"); // Object opening

        // Base stats
        stats = gBaseStats[i];
        if (!stats.baseHP) {
            strncat(buffer_main, "},\n", 4);
            fprintf(json, buffer_main); // Write buffer and continue if mon has no HP
            continue;
        } else {
            strncat(buffer_main, "\n", 2);  // Only append newline if mon has HP
        }

        snprintf(buffer_local, 1024,
            "\t\t\"name\": \"%s\",\n"
            "\t\t\"baseStats\": [%i, %i, %i, %i, %i, %i],\n"
            "\t\t\"type\": [\"%s\", \"%s\"],\n"
            "\t\t\"evYield\": [%i, %i, %i, %i, %i, %i],\n"
            "\t\t\"item\": [\"%s\", \"%s\"],\n"
            "\t\t\"eggGroup\": [\"%s\", \"%s\"],\n"
            "\t\t\"ability\": [\"%s\", \"%s\"],\n"
            "\t\t\"hiddenAbility\": \"%s\",\n",

            string_pokemon[i],
            stats.baseHP, stats.baseAttack, stats.baseDefense, stats.baseSpAttack, stats.baseSpDefense, stats.baseSpeed,
            string_type[stats.type1], string_type[stats.type2],
            stats.evYield_HP, stats.evYield_Attack, stats.evYield_Defense, stats.evYield_SpAttack, stats.evYield_SpDefense, stats.evYield_Speed,
            string_item[stats.item1], string_item[stats.item2],
            string_egg[stats.eggGroup1], string_egg[stats.eggGroup2],
            string_ability[stats.ability1], string_ability[stats.ability2],
            string_ability[stats.hiddenAbility]
        );
        strncat(buffer_main, buffer_local, 1024);

        // Level up moves
        lv_moves = gLevelUpLearnsets[i];

        strncat(buffer_main, "\t\t\"levelUpMoves\": [", 21);
        if (lv_moves->move) {
            strncat(buffer_main, "\n", 2);
            while (lv_moves->move) {
                snprintf(buffer_local, 1024,
                    "\t\t\t[%i, \"%s\"]%s\n",
                    lv_moves->level, string_move[lv_moves->move],
                    (lv_moves + 1)->move ? ",":""
                );
                strncat(buffer_main, buffer_local, 1024);
                lv_moves++;
            }
            strncat(buffer_main, "\t\t],\n", 6);
        } else {
            strncat(buffer_main, "],\n", 4);
        }

        // Egg moves
        j = GetEggSpecies(i);
        egg_moves_count = GetEggMoves(&j, egg_moves);

        strncat(buffer_main, "\t\t\"eggMoves\": [", 16);
        if (egg_moves_count) {
            strncat(buffer_main, "\n", 2);
            for (j = 0; j < egg_moves_count; j++) {
                snprintf(buffer_local, 1024, "\t\t\t\"%s\"%s\n",
                    string_move[egg_moves[j]], (j + 1 == egg_moves_count) ? "":","
                );
                strncat(buffer_main, buffer_local, 1024);
            }
            strncat(buffer_main, "\t\t]\n", 5);
        } else {
            strncat(buffer_main, "]\n", 4);
        }

        fprintf(json, buffer_main);
        fprintf(json, "\t}%s\n", (i + 1  == NUM_SPECIES) ? "" : ","); // Object closing
    }
    fprintf(json, "]\n"); // Array closing
    fclose(json);

    //
    // Create search index
    //
    char search_index[2048][32];
    int search_index_len = 0;
    char name_index[32];
    int found_pokemon[NUM_SPECIES];
    int found_pokemon_length = 0;

    json = fopen("search.json", "w");
    if (json == NULL) exit(3);

    fprintf(json, "{\n\t\"pokemon\": {\n");

    for (i = 0; i < NUM_SPECIES; i++) {
        snprintf(name_index, 32, string_pokemon[i]);
        for (j = 0; j < search_index_len; j++) {
            if (!strncmp(name_index, search_index[j], 32)) {    // Check if pokemon already added
                name_index[0] = '\0';
                break;
            }
        }
        if (name_index[0]) {
            snprintf(search_index[search_index_len++], 32, name_index);   // Add to added list

            for (j = 0, found_pokemon_length = 0; j < NUM_SPECIES; j++) {
                if (!strncmp(name_index, string_pokemon[j], 32)) {
                    found_pokemon[found_pokemon_length++] = j;  // Found every index with the pokemon
                }
            }
            snprintf(buffer_main, 4096, "%s\t\t\"%s\": [", i ? ",\n":"", name_index);
            for (j = 0; j < found_pokemon_length; j++) {
                snprintf(buffer_local, 1024, "%s%i", j ? ", ":"", found_pokemon[j]);
                strncat(buffer_main, buffer_local, 1024);
            }
            strncat(buffer_main, "]", 2);
            fprintf(json, buffer_main);
        }
    }

    fprintf(json, "\n\t}\n}\n");

    fclose(json);
    return 0;
}

// Define placeholder function to retrieve the data
u32 GetMonData(void *pokemon, s32 mon_data_species, const void *data)
{
    return *(u32 *)pokemon;
}

// Load strings
void load_strings(FILE *file, char list[][32], int *len, int counter)
{
    regex_t regx;
    int regx_ret;
    char buffer[128];
    int add_next = FALSE;

    regx_ret = regcomp(&regx, "#org[[:space:]]@[[:upper:]][[:alnum:]_]{1,}", REG_EXTENDED);

    while (fgets(buffer, 128, file) != NULL) {
        if (add_next) {
            buffer[strcspn(buffer, "\n")] = '\0';
            if (!strncmp(buffer, "Flab\\eb\\e", 32)) snprintf(buffer, 32, "Flabébé");   // Flabébé fix
            snprintf(list[(*len)++], 32, buffer);
            if (*len == counter) break;
            add_next = FALSE;
        } else {
            regx_ret = regexec(&regx, buffer, 0, NULL, 0);
            if (!regx_ret) add_next = TRUE;
        }
    }

    if (*len != counter) exit(2);
    regfree(&regx);
}
