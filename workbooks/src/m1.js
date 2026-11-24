// Fuller paper lessons for A1 Module 1. Pronunciation guides are English approximations.
// Key to the guides: (n) = nasal, let air through your nose and don't say the n · zh = the s in "measure"
// uh = the a in "about" · eh = the e in "bed" · ay = the a in "day" · ü = say "ee" with rounded lips · r = soft, at the back of the throat
module.exports = {
  key: [
    ["(n)", "nasal: air through your nose, don't say the n"], ["zh", "the s in “measure”"], ["uh", "the a in “about”"],
    ["eh", "the e in “bed”"], ["ay", "the a in “day”"], ["ü", "say “ee” with rounded lips"], ["r", "soft, at the back of the throat"]
  ],
  lessons: {
    l1: {
      big: "French spelling follows rules. Learn a few of them and you can read most words aloud correctly, even words you've never seen.",
      sections: [
        { h: "Most final letters are silent", p: "At the end of a word, d, g, p, s, t, x, and z are usually silent. A final e is silent too, except in tiny words like je and le, where it sounds like “uh”. The verb ending -ent is always silent.",
          ex: [["grand", "big", "gra(n)"], ["petit", "small", "puh-tee"], ["vous", "you", "voo"], ["trop", "too much", "troh"], ["deux", "two", "duh"], ["chez", "at the home of", "shay"], ["parle", "speak", "parl"], ["ils parlent", "they speak", "eel parl"]] },
        { h: "But watch for C, R, F, and L", p: "These four letters are usually said at the end of a word. Think of the English word CaReFuL. The big exception is -er at the end of a verb, which sounds like “ay”.",
          ex: [["avec", "with", "a-vek"], ["mer", "sea", "mair"], ["chef", "boss / chef", "shef"], ["sel", "salt", "sel"], ["parler", "to speak", "par-lay"], ["travailler", "to work", "tra-va-yay"]] },
        { h: "Vowel sounds", p: "Most French vowels are short and clean, without the glide English adds. Two pairs matter early: ou (like “food”) and u, which has no English match. To make the u sound, say “ee” and round your lips as if to whistle.",
          ex: [["café", "é = ay", "ka-fay"], ["mère", "è = eh", "mair"], ["fête", "ê = eh", "fet"], ["le", "e = uh", "luh"], ["ici", "i = ee", "ee-see"], ["vous", "ou = oo", "voo"], ["tu", "u = ü", "tü"], ["mais", "ai = eh", "meh"], ["eau", "eau = oh", "oh"], ["moi", "oi = wa", "mwa"]] },
        { h: "Nasal sounds", p: "When a vowel is followed by n or m in the same syllable, the n is usually not said. Instead, air goes through your nose. There are three main nasal sounds.",
          ex: [["dans", "an / en: like “on”, through the nose", "da(n)"], ["enfant", "child", "a(n)-fa(n)"], ["bonjour", "on: like “own”, through the nose", "bo(n)-zhoor"], ["nom", "name", "no(n)"], ["vin", "in / ain / un: like “van”, through the nose", "va(n)"], ["pain", "bread", "pa(n)"], ["un", "one", "a(n)"]] },
        { h: "Consonants with two sounds", p: "C and g change sound before e, i, and y. Before other letters, they're hard like in English. The cédille (ç) keeps c soft before a, o, and u.",
          ex: [["café", "c = k", "ka-fay"], ["merci", "c before i = s", "mair-see"], ["ça", "ç = s", "sa"], ["gare", "g = hard g", "gar"], ["rouge", "g before e = zh", "roozh"], ["je", "j = zh", "zhuh"], ["chat", "ch = sh", "sha"], ["qui", "qu = k", "kee"], ["thé", "th = t", "tay"], ["hôtel", "h is always silent", "oh-tel"]] },
        { h: "Accents", p: "Accents are part of the spelling, so always write them. They change the sound, or tell two words apart.",
          ex: [["é · accent aigu", "sounds like “ay”: été (summer)", "ay"], ["è · accent grave", "sounds like “eh”: mère (mother)", "eh"], ["à, où", "grave on a or u: no sound change. It tells a (has) from à (to), and ou (or) from où (where)", ""], ["ê, â, î, ô, û · circonflexe", "often replaces an old s: hôtel was hostel, forêt was forest", ""], ["ç · cédille", "makes c sound like s: français", "fra(n)-seh"], ["ë, ï · tréma", "say the vowel on its own: Noël, naïf", "no-el, na-eef"]] },
        { h: "Linking words together", p: "French links words so speech flows. Two rules matter now. Elision: small words drop their vowel before another vowel or a silent h (je → j', le → l', ne → n', de → d', que → qu'). Liaison: a silent final consonant is said when the next word starts with a vowel.",
          ex: [["j'ai", "I have (not je ai)", "zhay"], ["l'hôtel", "the hotel", "loh-tel"], ["je n'ai pas", "I don't have", "zhuh nay pa"], ["vous êtes", "you are: the s links as z", "voo-zet"], ["les amis", "the friends", "lay-za-mee"], ["deux ans", "two years", "duh-za(n)"]] },
        { h: "The alphabet", p: "You'll need letter names to spell your name on the phone or at an office. Ça s'écrit comment ? means “How do you spell it?”",
          ex: [["a, b, c, d", "", "ah, bay, say, day"], ["e, f, g, h", "", "uh, ef, zhay, ash"], ["i, j, k, l", "", "ee, zhee, ka, el"], ["m, n, o, p", "", "em, en, oh, pay"], ["q, r, s, t", "", "kü, air, es, tay"], ["u, v, w", "", "ü, vay, doo-bluh-vay"], ["x, y, z", "", "eeks, ee-grek, zed"]] }
      ],
      watch: [
        "Don't say the -ent at the end of verbs: ils parlent sounds exactly like il parle.",
        "Don't say the h: hôtel is “oh-tel”, homme is “om”.",
        "tu (you) and tout (all) are different words. Practise ü against oo.",
        "e and i are easy to mix up when spelling aloud: e is “uh”, i is “ee”. g is “zhay” and j is “zhee”."
      ],
      summary: { title: "Spelling → sound", head: ["Spelling", "Sound"], rows: [["ou", "oo"], ["u", "ü"], ["é", "ay"], ["è, ê, ai", "eh"], ["au, eau", "oh"], ["oi", "wa"], ["an, en", "nasal a(n)"], ["on", "nasal o(n)"], ["in, ain, un", "nasal a(n) as in “van”"], ["ch", "sh"], ["j, g before e/i", "zh"], ["c before e/i, ç", "s"], ["qu", "k"], ["h", "silent"]] },
      check: [
        { q: "Which letters are silent in ils parlent?", a: "The s of ils, and the -ent of parlent: eel parl." },
        { q: "How do you say ça?", a: "sa. The cédille makes c sound like s." },
        { q: "Why is it j'ai and not je ai?", a: "Elision: je drops its e before a vowel." }
      ],
      practice: [
        { task: "Copy each word, then cross out the letters you don't say.", items: ["Paris", "petit", "vous", "parle", "hôtel", "trop", "ils parlent"], key: "Paris (s) · petit (t) · vous (s) · parle (e) · hôtel (h) · trop (p) · ils parlent (s, ent)" },
        { task: "Sort these words into two groups: the ou sound or the u sound. Write each one in the right column.", items: ["vous", "tu", "rouge", "rue", "jour", "du"], cols: ["ou (oo)", "u (ü)"], key: "ou: vous, rouge, jour · u: tu, rue, du" },
        { task: "Draw a link where the words join together (liaison or elision), then say each one out loud.", items: ["vous êtes", "les amis", "deux ans", "je ai → ?", "le hôtel → ?"], key: "voo-zet · lay-za-mee · duh-za(n) · j'ai · l'hôtel" },
        { task: "Spell your first name using French letter names. Write how you'd say each letter.", lines: 2, key: "Example: K-A-I-L-A-S-H = ka, ah, ee, el, ah, es, ash" }
      ]
    },
    l2: {
      big: "Greetings change with the time of day and how well you know someone. When you're not sure, bonjour and vous are always safe.",
      sections: [
        { h: "Saying hello", p: "Bonjour works all day, until about 6 p.m. After that, use bonsoir. Salut is for friends and coworkers you know well. In Quebec, people also say allô, both in person and on the phone.",
          ex: [["Bonjour !", "Hello / Good morning", "bo(n)-zhoor"], ["Bonsoir !", "Good evening", "bo(n)-swar"], ["Salut !", "Hi (informal)", "sa-lü"], ["Allô !", "Hi / Hello on the phone (Quebec)", "a-loh"], ["Bonjour, madame.", "Hello (to a woman, polite)", "bo(n)-zhoor ma-dam"], ["Bonjour, monsieur.", "Hello (to a man, polite)", "bo(n)-zhoor muh-syuh"]] },
        { h: "Saying goodbye", p: "When you leave, you usually wish people a good day or evening. Bonne nuit is only for when someone is going to bed.",
          ex: [["Au revoir !", "Goodbye", "oh ruh-vwar"], ["Bonne journée !", "Have a good day", "bun zhoor-nay"], ["Bonne soirée !", "Have a good evening", "bun swa-ray"], ["À bientôt !", "See you soon", "a bya(n)-toh"], ["À demain !", "See you tomorrow", "a duh-ma(n)"], ["À plus tard !", "See you later", "a plü tar"], ["Salut !", "Bye (informal)", "sa-lü"], ["Bonne nuit !", "Good night (going to bed)", "bun nwee"]] },
        { h: "Your name", p: "Je m'appelle literally means “I call myself”. In casual speech, people also say Moi, c'est… (Me, I'm…). When you meet someone, say enchanté. A woman writes enchantée, but it sounds the same.",
          ex: [["Je m'appelle Paul.", "My name is Paul.", "zhuh ma-pel pol"], ["Moi, c'est Marie.", "I'm Marie. (casual)", "mwa seh ma-ree"], ["Comment tu t'appelles ?", "What's your name? (informal)", "ko-ma(n) tü ta-pel"], ["Comment vous appelez-vous ?", "What's your name? (formal)", "ko-ma(n) voo-za-play voo"], ["Vous vous appelez comment ?", "What's your name? (formal, spoken)", "voo voo-za-play ko-ma(n)"], ["Enchanté. / Enchantée.", "Nice to meet you.", "a(n)-sha(n)-tay"]] },
        { h: "How are you?", p: "Ça va ? is the everyday question, and the answer uses the same words. To ask back, say et toi ? to a friend or et vous ? politely. Comment allez-vous ? is formal.",
          ex: [["Ça va ?", "How's it going?", "sa va"], ["Ça va bien, merci.", "I'm good, thanks.", "sa va bya(n) mair-see"], ["Pas mal.", "Not bad.", "pa mal"], ["Comme ci, comme ça.", "So-so.", "kom see kom sa"], ["Pas très bien.", "Not great.", "pa treh bya(n)"], ["Et toi ? / Et vous ?", "And you? (informal / formal)", "ay twa / ay voo"], ["Comment allez-vous ?", "How are you? (formal)", "ko-ma(n)-ta-lay voo"], ["Je vais bien, merci.", "I'm well, thank you.", "zhuh veh bya(n) mair-see"]] },
        { h: "Polite words", p: "These go in almost every conversation. In Quebec, bienvenue is the usual reply to merci. In France, people say de rien.",
          ex: [["s'il vous plaît", "please (formal)", "seel voo pleh"], ["s'il te plaît", "please (informal)", "seel tuh pleh"], ["merci beaucoup", "thank you very much", "mair-see boh-koo"], ["de rien", "you're welcome", "duh rya(n)"], ["bienvenue", "you're welcome (Quebec)", "bya(n)-vuh-nü"], ["excusez-moi", "excuse me", "eks-kü-zay mwa"], ["pardon", "sorry / pardon", "par-do(n)"], ["désolé / désolée", "sorry (man / woman)", "day-zo-lay"]] },
        { h: "A conversation at work", p: "Read it out loud twice, once for each person.",
          ex: [["— Bonjour ! Je m'appelle Marc. Et vous ?", "Hello! My name is Marc. And you?", ""], ["— Bonjour, je m'appelle Kailash. Enchanté.", "Hello, my name is Kailash. Nice to meet you.", ""], ["— Enchanté. Ça va ?", "Nice to meet you. How's it going?", ""], ["— Ça va bien, merci. Et vous ?", "Good, thanks. And you?", ""], ["— Très bien ! Bonne journée !", "Very well! Have a good day!", ""], ["— Merci, vous aussi. À demain !", "Thanks, you too. See you tomorrow!", ""]] }
      ],
      watch: [
        "Bonne nuit is not a greeting. It's only for bedtime.",
        "Don't use salut with a customer or a new boss. Bonjour is safer.",
        "French puts a space before ? and ! : Ça va ?",
        "Enchanté and enchantée sound the same. Only the spelling changes."
      ],
      summary: { title: "Polite or casual", head: ["Polite (vous)", "Casual (tu)"], rows: [["Bonjour !", "Salut !"], ["Comment allez-vous ?", "Ça va ?"], ["Comment vous appelez-vous ?", "Comment tu t'appelles ?"], ["Et vous ?", "Et toi ?"], ["s'il vous plaît", "s'il te plaît"], ["Au revoir !", "Salut ! / À plus tard !"]] },
      check: [
        { q: "It's 7 p.m. and you're leaving work. What can you say?", a: "Bonne soirée ! or Au revoir, à demain !" },
        { q: "A customer says merci. What do you reply in Quebec?", a: "Bienvenue ! (or De rien !)" },
        { q: "How do you ask a new coworker's name politely?", a: "Comment vous appelez-vous ?" }
      ],
      practice: [
        { task: "Rewrite each casual phrase in its polite form.", items: ["Salut !", "Ça va ?", "Comment tu t'appelles ?", "Et toi ?", "s'il te plaît"], key: "Bonjour ! · Comment allez-vous ? · Comment vous appelez-vous ? · Et vous ? · s'il vous plaît" },
        { task: "What do you say? Write one French phrase for each situation.", items: ["You leave work at 5 p.m.", "Someone thanks you.", "You bump into someone.", "A friend is going to bed.", "You'll see a coworker tomorrow."], key: "Bonne soirée ! / Au revoir ! · De rien ! / Bienvenue ! · Pardon ! / Excusez-moi ! / Désolé(e) ! · Bonne nuit ! · À demain !" },
        { task: "Write a short introduction: say hello, give your name, say how you are, and say goodbye.", lines: 4, key: "Example: Bonjour ! Je m'appelle Kailash. Ça va bien, merci. Au revoir, bonne journée !" }
      ]
    },
    l3: {
      big: "Every French sentence needs a subject. The pronoun tells you who is doing the action, and with tu or vous, how polite you're being.",
      sections: [
        { h: "The nine subject pronouns", p: "Learn these in order. Notice that il and ils sound the same, and so do elle and elles. You usually hear the difference in the verb, or from context.",
          ex: [["je", "I", "zhuh"], ["tu", "you (one person, casual)", "tü"], ["il", "he / it", "eel"], ["elle", "she / it", "el"], ["on", "we / people (very common when speaking)", "o(n)"], ["nous", "we", "noo"], ["vous", "you (polite, or more than one person)", "voo"], ["ils", "they (men, or a mixed group)", "eel"], ["elles", "they (only women)", "el"]] },
        { h: "Je becomes j'", p: "Before a vowel or a silent h, je loses its e and joins the next word. Before a consonant, it stays je.",
          ex: [["j'ai", "I have", "zhay"], ["j'aime", "I like", "zhem"], ["j'habite", "I live", "zha-beet"], ["je suis", "I am", "zhuh swee"], ["je parle", "I speak", "zhuh parl"]] },
        { h: "Tu or vous?", p: "Use tu with one person you know well: friends, family, children, and pets. Use vous with one person you don't know well or want to respect: customers, strangers, older people, officials, and a new boss. Always use vous for more than one person, whether you know them or not.",
          ex: [["Tu es prêt ?", "Are you ready? (to a friend)", ""], ["Vous êtes prêt ?", "Are you ready? (polite, to one person)", ""], ["Vous êtes prêts ?", "Are you ready? (to a group)", ""], ["On peut se tutoyer ?", "Can we use tu with each other?", "o(n) puh suh tü-twa-yay"]] },
        { h: "Tu and vous in Quebec", p: "Quebec uses tu more, and sooner, than France does. Coworkers often use tu from the first day. A good rule: start with vous, and switch when the other person uses tu with you.", ex: [] },
        { h: "Il and elle also mean it", p: "Every French noun is masculine or feminine (you'll learn this in Module 2). So “it” is il for a masculine noun and elle for a feminine one.",
          ex: [["Le café ? Il est bon.", "The coffee? It's good.", ""], ["La machine ? Elle est ici.", "The machine? It's here.", ""]] },
        { h: "On: the everyday we", p: "In conversation, on often replaces nous. It also means “people in general”. It always uses the same verb form as il.",
          ex: [["On est prêts.", "We're ready.", ""], ["Ici, on parle français.", "Here, people speak French.", ""]] },
        { h: "Ils or elles", p: "Use elles only when everyone in the group is female. If there's even one man in the group, use ils.",
          ex: [["Marie et Julie → elles", "Marie and Julie → they", ""], ["Marie et Paul → ils", "Marie and Paul → they", ""], ["Paul et moi → nous", "Paul and I → we", ""], ["toi et Marie → vous", "you and Marie → you", ""]] }
      ],
      watch: [
        "Don't drop the pronoun. Say Je suis prêt, not Suis prêt.",
        "Vous with one person still uses the vous verb form: vous êtes.",
        "Be careful using tu with a boss or customer until they use it with you.",
        "Ils and il sound the same: “eel”."
      ],
      summary: { title: "Subject pronouns", head: ["One person", "More than one"], rows: [["je · I", "nous / on · we"], ["tu · you (casual)", "vous · you"], ["vous · you (polite)", "vous · you"], ["il · he / it", "ils · they"], ["elle · she / it", "elles · they (all female)"]] },
      check: [
        { q: "You're talking to your two children. Tu or vous?", a: "Vous. It's more than one person." },
        { q: "Paul, Marie, and Julie → ?", a: "Ils. There's a man in the group." },
        { q: "Je + habite → ?", a: "J'habite." }
      ],
      practice: [
        { task: "Tu or vous? Write the right word for each person.", items: ["your best friend", "a customer", "your mother", "two coworkers", "a child", "a police officer"], key: "tu · vous · tu · vous (more than one person) · tu · vous" },
        { task: "Replace each word with a pronoun.", items: ["Paul", "Marie", "Paul et moi", "toi et Marie", "Julie et Sophie", "Paul et Sophie", "le café", "la machine"], key: "il · elle · nous · vous · elles · ils · il · elle" },
        { task: "Write je or j' in front of each verb.", items: ["___ suis", "___ ai", "___ habite", "___ parle", "___ aime", "___ travaille"], key: "je suis · j'ai · j'habite · je parle · j'aime · je travaille" },
        { task: "Write two people you'd use tu with and two you'd use vous with.", lines: 2, key: "Example: Tu: mon frère, mon ami Raj. Vous: mon patron, un client." }
      ]
    },
    l4: {
      big: "Être (to be) is the most-used verb in French. Learn its six forms by heart. You'll use them every single day.",
      sections: [
        { h: "The six forms", p: "Être is irregular, so each form has to be memorized. Notice that es and est sound the same, because the s and t are silent. In vous êtes, the s of vous links to êtes with a z sound.",
          ex: [["je suis", "I am", "zhuh swee"], ["tu es", "you are (casual)", "tü eh"], ["il / elle / on est", "he / she / one is", "eel eh"], ["nous sommes", "we are", "noo som"], ["vous êtes", "you are (polite or plural)", "voo-zet"], ["ils / elles sont", "they are", "eel so(n)"]] },
        { h: "What you use it for", p: "Use être to say who or what someone is, where they are, and how they are.",
          ex: [["Je suis machiniste.", "I'm a machinist. (job)", ""], ["Il est canadien.", "He's Canadian. (nationality)", ""], ["Nous sommes à Toronto.", "We're in Toronto. (place)", ""], ["Je suis au travail.", "I'm at work. (place)", ""], ["Elle est fatiguée.", "She's tired. (how someone is)", ""], ["Vous êtes en retard.", "You're late.", ""], ["Tu es prêt ?", "Are you ready?", ""], ["C'est facile.", "It's easy. (c'est = ce + est)", "seh fa-seel"]] },
        { h: "No “a” before a job", p: "In English you say “I'm a machinist”. In French, there's no un or une between être and a job.",
          ex: [["Je suis machiniste.", "I'm a machinist.", ""], ["Elle est infirmière.", "She's a nurse.", ""], ["Il est électricien.", "He's an electrician.", ""]] },
        { h: "Words change for women and groups", p: "Describing words after être match the person. Add -e for a woman and -s for more than one. Words ending in -ien double the n before the e. The extra letters are often silent, but not always.",
          ex: [["Il est fatigué. / Elle est fatiguée.", "He / She is tired. (sounds the same)", ""], ["Il est prêt. / Elle est prête.", "He / She is ready. (t is said for her: pret)", ""], ["Il est canadien. / Elle est canadienne.", "He / She is Canadian.", "ka-na-dya(n) / ka-na-dyen"], ["Nous sommes prêts.", "We're ready.", ""]] },
        { h: "Saying “not”", p: "Put ne before the verb and pas after it. Ne becomes n' before a vowel, so it's n'es, n'est, and n'êtes.",
          ex: [["Je ne suis pas fatigué.", "I'm not tired.", ""], ["Tu n'es pas en retard.", "You're not late.", ""], ["Il n'est pas ici.", "He's not here.", ""], ["Nous ne sommes pas prêts.", "We're not ready.", ""], ["Vous n'êtes pas canadien ?", "You're not Canadian?", ""], ["Ils ne sont pas au travail.", "They're not at work.", ""]] },
        { h: "What you'll hear in real life", p: "In everyday speech, people often drop ne: Je suis pas prêt. In Quebec, je suis is often said so fast that it sounds like “chu”: Chu fatigué. Understand it when you hear it, but write the full form.", ex: [] }
      ],
      watch: [
        "Don't say je suis un machiniste. Say je suis machiniste.",
        "Age uses a different verb (avoir), which you'll learn in Module 2. It's J'ai vingt ans, not je suis vingt.",
        "Vous êtes needs its accent: ê.",
        "Tu es and il est sound the same but are spelled differently."
      ],
      summary: { title: "Être", head: ["Yes", "No"], rows: [["je suis", "je ne suis pas"], ["tu es", "tu n'es pas"], ["il / elle / on est", "il / elle / on n'est pas"], ["nous sommes", "nous ne sommes pas"], ["vous êtes", "vous n'êtes pas"], ["ils / elles sont", "ils / elles ne sont pas"]] },
      check: [
        { q: "Nous ___ ici.", a: "sommes" },
        { q: "Make it negative: Elle est prête.", a: "Elle n'est pas prête." },
        { q: "What's wrong with Je suis un électricien ?", a: "No un before a job: Je suis électricien." }
      ],
      practice: [
        { task: "Make each sentence negative.", items: ["Je suis fatigué.", "Elle est ici.", "Nous sommes prêts.", "Vous êtes en retard.", "Ils sont canadiens."], key: "Je ne suis pas fatigué. · Elle n'est pas ici. · Nous ne sommes pas prêts. · Vous n'êtes pas en retard. · Ils ne sont pas canadiens." },
        { task: "Change each sentence so it's about a woman.", items: ["Il est canadien.", "Il est fatigué.", "Il est prêt.", "Il est électricien."], key: "Elle est canadienne. · Elle est fatiguée. · Elle est prête. · Elle est électricienne." },
        { task: "Write three true sentences about yourself with je suis, and one with je ne suis pas.", lines: 4, key: "Examples: Je suis machiniste. Je suis à Toronto. Je suis fatigué. Je ne suis pas en retard." }
      ]
    },
    l5: {
      big: "Learn 0 to 16 by heart. 17, 18, and 19 are built from ten plus a number, and 20 is vingt. You'll use numbers everywhere: prices, times, and measurements.",
      sections: [
        { h: "Zero to ten", p: "Say each one out loud as you read it.",
          ex: [["zéro", "0", "zay-roh"], ["un / une", "1", "a(n) / ün"], ["deux", "2", "duh"], ["trois", "3", "trwa"], ["quatre", "4", "katr"], ["cinq", "5", "sank"], ["six", "6", "sees"], ["sept", "7", "set (the p is silent)"], ["huit", "8", "weet"], ["neuf", "9", "nuhf"], ["dix", "10", "dees"]] },
        { h: "Eleven to sixteen", p: "These all end in -ze. Learn them as a group.",
          ex: [["onze", "11", "o(n)z"], ["douze", "12", "dooz"], ["treize", "13", "trez"], ["quatorze", "14", "ka-torz"], ["quinze", "15", "ka(n)z"], ["seize", "16", "sez"]] },
        { h: "Seventeen to twenty", p: "Dix-sept is “ten-seven”. Write these with a hyphen. In vingt, both the g and the t are silent.",
          ex: [["dix-sept", "17", "dee-set"], ["dix-huit", "18", "dee-zweet"], ["dix-neuf", "19", "deez-nuhf"], ["vingt", "20", "va(n)"]] },
        { h: "Sounds that change", p: "Six and dix change with the next word. Alone, the x sounds like s. Before a consonant, it's silent. Before a vowel, it sounds like z. Huit also drops its t before a consonant.",
          ex: [["six", "on its own", "sees"], ["six machines", "before a consonant", "see ma-sheen"], ["six ans", "before a vowel", "see-za(n)"], ["dix minutes", "before a consonant", "dee mee-nüt"], ["huit jours", "before a consonant", "wee zhoor"]] },
        { h: "Un or une", p: "One has two forms. Use une with feminine nouns and un with masculine ones. You'll learn which nouns are which in Module 2.",
          ex: [["un outil", "one tool", ""], ["une machine", "one machine", ""]] },
        { h: "Il y a: there is, there are", p: "Il y a never changes, whether there's one thing or many. To ask how many, start with combien de.",
          ex: [["Il y a trois machines.", "There are three machines.", "eel ya trwa ma-sheen"], ["Il y a une pièce.", "There is one part.", ""], ["Il y a combien de personnes ?", "How many people are there?", ""], ["Il y a douze personnes.", "There are twelve people.", ""]] },
        { h: "Numbers in daily life", p: "Here are a few phrases you'll use often.",
          ex: [["trois dollars", "three dollars", ""], ["dix minutes", "ten minutes", ""], ["quinze centimètres", "fifteen centimetres", ""], ["la salle douze", "room twelve", ""], ["deux + trois = cinq", "deux plus trois égale cinq", "duh plüs trwa ay-gal sank"]] }
      ],
      watch: [
        "Sept: don't say the p. Vingt: don't say the g or the t.",
        "Deux (2) and douze (12) sound alike. Listen for the oo in douze.",
        "Quatre and quatorze both start with “ka”, not “kwa”.",
        "Write dix-sept, dix-huit, and dix-neuf with a hyphen."
      ],
      summary: { title: "0 to 20", head: ["Number", "In French"], rows: [["0", "zéro"], ["1", "un / une"], ["2", "deux"], ["3", "trois"], ["4", "quatre"], ["5", "cinq"], ["6", "six"], ["7", "sept"], ["8", "huit"], ["9", "neuf"], ["10", "dix"], ["11", "onze"], ["12", "douze"], ["13", "treize"], ["14", "quatorze"], ["15", "quinze"], ["16", "seize"], ["17", "dix-sept"], ["18", "dix-huit"], ["19", "dix-neuf"], ["20", "vingt"]] },
      check: [
        { q: "How do you write 14?", a: "quatorze" },
        { q: "In huit machines, do you say the t?", a: "No: wee ma-sheen." },
        { q: "There are two tools.", a: "Il y a deux outils." }
      ],
      practice: [
        { task: "Write these numbers in words.", items: ["7", "11", "14", "18", "20", "6"], key: "sept · onze · quatorze · dix-huit · vingt · six" },
        { task: "Write the number in digits.", items: ["treize", "dix-huit", "cinq", "seize", "onze", "quatre"], key: "13 · 18 · 5 · 16 · 11 · 4" },
        { task: "Do the maths, and write the answer in French.", items: ["deux + trois =", "dix − quatre =", "sept + huit =", "vingt − neuf =", "six + six ="], key: "cinq · six · quinze · onze · douze" },
        { task: "Look around you. Write two sentences with il y a about things you can see.", lines: 2, key: "Examples: Il y a deux chaises. Il y a une table ici." }
      ]
    },
    l6: {
      practice: [{ task: "Write a four-line introduction you could say to a new coworker: hello, your name, your job, and something you are. End with a goodbye.", lines: 5, key: "Example: Bonjour ! Je m'appelle Kailash. Je suis machiniste. Je suis à Toronto. Enchanté, et bonne journée !" }]
    }
  }
};
