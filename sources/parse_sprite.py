import re
import os

def main():
    # Compile regex
    re_line = re.compile(r"(?<!//\s)(\[\w+\]\s+=\s+\{.+\})")
    re_tile = re.compile(r"(?<!/\*)(g(Front)?Sprite\w+)Tiles(?!\*/)")

    # Append sprite file names
    sprite_files = []
    with open("DPE/src/Front_Pic_Table.c") as sprites_table:
        for line in sprites_table:
            if (match := re.search(re_line, line)):
                tile = re.search(re_tile, match.group()).group(1)
                sprite_files.append(f"{tile}.png")

    # Create images
    for (i, file) in enumerate(sprite_files):
        if (i == 385): continue # Castform failsafe
        print(f"Converting images: [{i:04}/{len(sprite_files):04}]", end="\r")
        os.system(f"convert ./DPE/graphics/frontspr/{file} \
            -fill none -draw 'color 0,0 replace' ../images/{i}.png")

    # Castform
    os.system("convert ./DPE/graphics/castform/gFrontSprite385Castform.png \
        -crop 64x64+0+0 -fill none -draw 'color 0,0 replace' ../images/385.png")

    return 0

if __name__ == "__main__":
    main()