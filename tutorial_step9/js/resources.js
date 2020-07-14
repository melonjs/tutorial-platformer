game.resources = [
	/**
	 * Graphics.
	 */
	// the main player spritesheet
	{name: "gripe_run_right",     type:"image",	src: "data/img/sprite/gripe_run_right.png"},
	// the spinning coin spritesheet
	{name: "spinning_coin_gold",  type:"image",	src: "data/img/sprite/spinning_coin_gold.png"},
	// our enemty entity
	{name: "wheelie_right",       type:"image",	src: "data/img/sprite/wheelie_right.png"},
    // game font
    { name: "PressStart2P",       type:"image", src: "data/fnt/PressStart2P.png" },
    { name: "PressStart2P",       type:"binary", src: "data/fnt/PressStart2P.fnt"},
	// title screen
	{name: "title_screen",        type:"image",	src: "data/img/gui/title_screen.png"},
	// the parallax background
	{ name: "background",      type:"image",   src: "data/img/background.png" },
    { name: "clouds",          type:"image",   src: "data/img/clouds.png" },
	// our level tileset
	{name: "area01_level_tiles",  type:"image",	src: "data/img/map/area01_level_tiles.png"},

	/*
	 * Maps.
 	 */
	{name: "area01",              type: "tmx",	src: "data/map/area01.tmx"},
	{name: "area02",              type: "tmx",	src: "data/map/area02.tmx"},

	/*
	 * Background music.
	 */
	{name: "dst-inertexponent", type: "audio", src: "data/bgm/"},

	/*
	 * Sound effects.
	 */
	{name: "cling", type: "audio", src: "data/sfx/"},
	{name: "stomp", type: "audio", src: "data/sfx/"},
	{name: "jump",  type: "audio", src: "data/sfx/"}
];
