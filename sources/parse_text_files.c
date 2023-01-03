#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <regex.h>

#include <sys/types.h>
#include <dirent.h>

#include "DPE/include/moves.h"
#include "CFRU/include/constants/species.h"

#include "species_names.h"

#define FALSE 0
#define TRUE 1

typedef struct node
{
    char *value;
    struct node *next;
} node_t;

typedef struct LearnableMove
{
    char move_name[32];
    char learning_source[32];
} LearnableMove_t;

void list_append(node_t *head, char *value)
{
    // first move - list head without value
    if (head->value == NULL)
    {
        if ((head->value = (char *)(malloc(sizeof(char) * (strlen(value) + 1)))) == NULL)
        {
            fprintf(stderr, "name array malloc fail");
            exit(1);
        }

        snprintf(head->value, strlen(value), "%s", value);
        return;
    }

    // goto end of list
    node_t *current = head;
    while (current->next != NULL)
    {
        current = current->next;
    }

    // add new node at end of the list
    if ((current->next = (node_t *)(malloc(sizeof(node_t)))) == NULL)
    {
        fprintf(stderr, "new node malloc fail");
        exit(1);
    }

    current->next->next = NULL;
    if ((current->next->value = (char *)(malloc(sizeof(char) * (strlen(value) + 1)))) == NULL)
    {
        fprintf(stderr, "name array malloc fail");
        exit(1);
    }
    snprintf(current->next->value, strlen(value), "%s", value);
}

void freeMemory(node_t *learnable_moves[NUM_SPECIES])
{
    for (int i = 0; i < NUM_SPECIES; i++)
    {
        node_t *current = learnable_moves[i];
        node_t *next;
        while (current != NULL)
        {
            next = current->next;
            free(current->value);
            free(current);
            current = next;
        }
    }
}

void get_text_files(
    char *directory_path,
    char paths[150][256],
    int *count)
{
    struct dirent *dirEntry;
    DIR *dir = opendir(directory_path);
    if (dir != NULL)
    {
        while ((dirEntry = readdir(dir)) != NULL)
        {
            if (dirEntry->d_name[0] == '.')
            {
                continue;
            }
            snprintf(paths[(*count)++], 255, "%s/%s", directory_path, dirEntry->d_name);
        }

        closedir(dir);
    }
}

void parse_learnable_moves(
    char *fileName,
    node_t *learnable_moves[NUM_SPECIES],
    char string_pokemon[NUM_SPECIES][32])
{

    FILE *file = fopen(fileName, "r");
    if (file == NULL)
        exit(1);

    char line_buffer[128];
    char name_buffer[33];

    if (fgets(line_buffer, 128, file) == NULL)
    {
        fclose(file);
        exit(0);
    }

    // read move data from line
    // ie. 'TM01: Focus Punch'
    // or  'Tutor 1: Fire Punch'
    // consists of 2 parts  - source and move name

    // Note:
    // there is odd value in DPE repository: file "121 - Cut.txt" starts with "3HM01" instead of "HM01"
    // most likely it's a bug, because of that this logic is faulty

    LearnableMove_t learnable_move;

    int colon_pos = strcspn(line_buffer, ":");

    snprintf(learnable_move.learning_source, colon_pos, "%s", line_buffer);                                          // source
    snprintf(learnable_move.move_name, 32, "%s", (char *)(line_buffer + sizeof(char) * (colon_pos + strlen(": ")))); // name (after ': ')

    while (fgets(line_buffer, 128, file) != NULL)
    {
        int written = snprintf(name_buffer, 32, "%s", line_buffer);
        if (written > 0)
        {
            // cut name before EOL
            name_buffer[strcspn(name_buffer, "\r")] = '\0';
            name_buffer[strcspn(name_buffer, "\n")] = '\0';

            // remove space from end of name
            name_buffer[strcspn(name_buffer, " ")] = '\0';

            int index = get_pokemon_index(name_buffer);
            if (index == -1)
            {
                fprintf(stderr, "failed to find pokemon %s\n", name_buffer);
                exit(1);
            }

            // if empty list of moves create first node
            if (learnable_moves[index] == NULL)
            {
                if ((learnable_moves[index] = (node_t *)(malloc(sizeof(node_t)))) == NULL)
                {
                    fprintf(stderr, "failed to alloc for next pokemon in tm list");
                    exit(1);
                }
                learnable_moves[index]->value = NULL;
                learnable_moves[index]->next = NULL;
            }

            list_append(learnable_moves[index], learnable_move.move_name);
        }
    }

    fclose(file);
}

void parse_text_files_from_directory(
    char *directory_path,
    char pokemon_names[NUM_SPECIES][32],
    node_t *learnable_moves[NUM_SPECIES])
{
    char paths[160][256];
    int count = 0;
    get_text_files(directory_path, paths, &count);

    for (int i = 0; i < count; i++)
    {
        parse_learnable_moves(paths[i], learnable_moves, pokemon_names);
    }
}