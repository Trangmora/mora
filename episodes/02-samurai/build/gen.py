import json,base64,subprocess,concurrent.futures as cf,os,sys
ST="Flat 2D vector illustration like a hand-made paper-cut animated documentary: bold simple geometric shapes with clean dark-brown outlines, visible soft paper grain and faint hand-drawn crackle lines, evenly lit bright mid-tone warm colors, muted earthy palette of terracotta red, ochre, cream, sage green, indigo and black ink, characters with minimal faces made of a few simple lines, flat colors with slight soft shading, gentle vignette. Historical Japan. Wide 16:9, no text, no letters, no writing on banners. "
S={
"o0":"A medieval Japanese battlefield at dawn seen from a low grassy ridge: rows of tall red and white nobori banners fluttering, silhouettes of mounted samurai warriors in lacquered armor and horned helmets in a line, a huge pale red rising sun low on the horizon behind thin layers of mist, ochre and pink sky, a single raised sword catching light.",
"a1":"A calm samurai in a dark indigo kimono kneeling on a tatami floor, two swords (one long, one short) laid beside him, writing a poem with a brush on paper, a small cup of green tea in front of him, sliding paper doors and a pine branch behind, front view.",
"b1":"Split composition: on the left an elegant ancient Kyoto imperial palace with nobles in wide court robes enjoying a banquet under cherry blossoms; on the right, far away rural provinces with burning straw huts and masked bandits on horseback raiding rice fields at dusk.",
"b2":"Several early Japanese mounted warriors in simple armor riding horses along the dike of green rice paddies, guarding the fields, a landowner in a straw hat pointing at them, farmers working behind, bright ochre sky.",
"b3":"A dynamic close view of an early Japanese mounted archer in red-laced armor galloping and drawing a very long asymmetrical yumi bow, arrow ready, quiver of arrows on his back, dust clouds, bright sky.",
"c1":"A huge growing army of samurai warriors marching toward an ancient imperial palace gate, worried court nobles in tall black hats peeking from behind the gate, banners, strong sense of power shifting.",
"c2":"Two rival samurai clans facing each other on an open field: on the left warriors under many tall RED banners, on the right warriors under many tall WHITE banners, generals on horses in front, tense standoff, symmetrical composition.",
"c3":"A great medieval sea battle in a narrow strait: many wooden boats with red banners and white banners clashing, samurai with bows and swords on the boats, big stylized curling waves, arrows flying, dramatic sky.",
"c4":"A powerful shogun in black lacquered armor seated front-facing on a raised platform with a war fan, samurai kneeling in rows, and far behind him a small faded emperor figure sitting behind a bamboo screen.",
"d1":"Warring states Japan: many white Japanese castles with curved roofs on hills across a wide landscape, armies with colorful banners clashing in the valleys, smoke rising, a messenger on horseback.",
"d2":"Peaceful Edo period town: a big castle in the background, a busy wooden bridge over a river with merchants, women in kimono, kites in the sky, cherry trees in bloom, calm bright mood.",
"d3":"An Edo period samurai official in formal kamishimo with stiff shoulder wings sitting at a low desk doing paperwork with brush and abacus, a pile of straw rice bales stacked beside him, two swords resting on a rack, front view, slightly bored face.",
"d4":"A proud samurai standing front-facing in a street wearing two swords at his left hip, one long katana and one short wakizashi, common townspeople and merchants bowing respectfully on both sides.",
"e1":"The legendary female samurai Tomoe Gozen riding a galloping horse into battle, long black hair flowing, wearing armor and holding a long naginata glaive, other warriors behind her, dynamic.",
"e2":"An African samurai named Yasuke, a tall dark-skinned man in Japanese armor, standing respectfully beside the warlord Oda Nobunaga who sits in an ornate castle hall, retainers kneeling, warm light.",
"e3":"The swordsman Miyamoto Musashi standing on a beach at sunrise holding two swords, one long one short, in a calm fighting stance, his opponent facing him, boats on the shore, waves.",
"e4":"A Japanese swordsmith in white clothes and a black eboshi cap hammering a glowing orange katana blade on an anvil in a dark forge, bright sparks flying, an apprentice pumping the bellows, a finished katana on a stand.",
"e5":"Forty-seven ronin warriors in black and white triangle-patterned coats marching quietly through a snowy night street toward a mansion gate, lanterns, falling snow, determined mood, deep indigo night with bright white snow.",
"e6":"A quiet Buddhist temple graveyard with rows of small stone gravestones, smoke rising from many incense sticks, visitors with hands together praying, red maple leaves, peaceful soft light.",
"f1":"Meiji era Japan: a samurai sitting sadly as his topknot is cut off with scissors, his sword laid down beside him on a cloth, in the background soldiers in western uniforms with rifles marching past a western-style brick building.",
"f2":"The last samurai rebellion: a group of samurai with swords charging down a hill at sunset against a line of modern soldiers with rifles and cannons, smoke, dramatic red sky, the leader Saigo Takamori, a big sturdy man, in front. No flags at all.",
"g1":"A modern Japanese kendo dojo: two kendo fighters in dark blue armor and face masks clashing with bamboo shinai swords, students kneeling in rows watching, wooden floor, bright light.",
"g2":"A lone samurai in armor standing on a hill under a blooming cherry tree, seen from behind, looking at a large red sun setting over a misty plain, petals drifting, peaceful and noble mood.",
}
only=sys.argv[1:] or list(S)
def one(k):
    if os.path.exists(k+'.png') and not sys.argv[1:]: return k,'skip'
    json.dump({"model":"gpt-image-2","size":"1536x1024","quality":"medium","n":1,"prompt":ST+S[k]},open(k+'.json','w'))
    r=subprocess.run(['curl','-s','-m','300','https://api.openai.com/v1/images/generations','-H','Content-Type: application/json','-d','@'+k+'.json'],capture_output=True)
    try: d=json.loads(r.stdout)
    except Exception: return k,'bad '+r.stdout[:100].decode()
    if 'data' in d: open(k+'.png','wb').write(base64.b64decode(d['data'][0]['b64_json'])); return k,'ok'
    return k,str(d)[:200]
with cf.ThreadPoolExecutor(6) as ex:
    for r in ex.map(one,only): print(r,flush=True)
