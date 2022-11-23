sources/parse_json: sources/parse_json.c sources/DPE sources/CFRU
	gcc sources/parse_json.c -o sources/parse_json
	(cd sources && ./parse_json)

debug: sources/parse_json.c sources/DPE sources/CFRU
	gcc sources/parse_json.c -g -o sources/parse_json
	(cd sources && gdb --quiet ./parse_json)

refresh: dpe cfru
	gcc sources/parse_json.c -o sources/parse_json
	(cd sources && ./parse_json)

dpe: sources/DPE
	(cd sources/DPE/ && git clean -fd && git fetch origin Unbound && git reset --hard origin/Unbound)

cfru: sources/CFRU
	(cd sources/CFRU/ && git clean -fd && git fetch origin master && git reset --hard origin/master)

images: sources/DPE
	(cd sources && python3 parse_sprite.py)

sources/DPE:
	git clone -b Unbound --single-branch https://github.com/Skeli789/Dynamic-Pokemon-Expansion.git sources/DPE/

sources/CFRU:
	git clone -b dev --single-branch https://github.com/Skeli789/Complete-Fire-Red-Upgrade.git sources/CFRU/
