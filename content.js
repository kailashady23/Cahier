// All course content lives here. To add a unit, add it to COURSE.units.
window.COURSE = {
  totalHours: 600,
  levels: [
    { id: "A1", hours: 90, units: ["Bonjour !", "Moi et les autres", "La vie de tous les jours", "Au travail", "Chiffres et heures", "À table", "En ville", "Ma famille", "Mon temps libre", "Bilan A1"] },
    { id: "A2", hours: 120, units: ["Hier et avant", "Bientôt", "La santé", "Les voyages", "Le logement", "Les achats", "Parler de soi", "Au téléphone", "Les souvenirs", "Comparer", "Les courriels", "Bilan A2"] },
    { id: "B1", hours: 180, units: ["Raconter", "Donner son avis", "Le monde du travail", "Si j'avais…", "Les médias", "La société", "L'environnement", "La culture", "Le Canada", "Faire des projets", "Expliquer un problème", "Les services publics", "Argumenter à l'oral", "Bilan B1"] },
    { id: "B2", hours: 210, units: ["Le subjonctif", "Nuancer", "Le monde professionnel", "L'actualité", "Lettres formelles", "Comprendre des textes longs", "Débattre", "Science et technique", "Droit et citoyenneté", "Synthèse de documents", "Préparation TEF/TCF : écoute", "Préparation TEF/TCF : lecture", "Préparation TEF/TCF : expression", "Bilan B2"] }
  ],
  units: {
    "a1-u1": {
      id: "a1-u1",
      title: "Bonjour !",
      quickCheck: ["q-l2-3", "q-l2-6", "q-l3-2", "q-l3-5", "q-l4-1", "q-l4-3", "q-l4-6", "q-l5-3", "q-l5-5", "q-l1-3"],
      lessons: [
        {
          id: "l1", title: "French sounds and the alphabet", minutes: 25,
          teach: [
            { h: "Many final letters are silent", p: "French often skips the last consonant of a word. Say what you hear, not everything you see.", ex: [["Paris", "Paris (no s sound)"], ["petit", "small (no t sound)"], ["vous", "you (no s sound)"], ["parle", "speak (final e is silent)"]] },
            { h: "Sounds to learn first", p: "Two pairs matter early. The sound ou is like the vowel in \"food\". The sound u has no English match: say \"ee\" with rounded lips. Also, é sounds like the \"ay\" in \"day\", and è sounds like the \"e\" in \"bed\".", ex: [["vous", "you"], ["tu", "you (informal)"], ["café", "coffee"], ["mère", "mother"]] },
            { h: "The letter h and the letter r", p: "The h is silent. The r is made at the back of the throat. In Canada you may also hear a rolled r, especially from older speakers.", ex: [["hôtel", "hotel"], ["homme", "man"], ["merci", "thank you"]] },
            { h: "The alphabet", p: "Tap to hear words you can spell with. For now, learn these tricky letter names: e sounds like \"uh\", g sounds like \"zhay\", i sounds like \"ee\", j sounds like \"zhee\", and u is the French u sound.", ex: [["a, b, c, d, e", "first letters"], ["g, h, i, j, k", "the tricky group"]] }
          ],
          vocab: [["bonjour", "hello"], ["merci", "thank you"], ["oui", "yes"], ["non", "no"], ["café", "coffee"], ["hôtel", "hotel"]],
          questions: [
            { id: "q-l1-1", type: "mc", topic: "Sounds", prompt: "In the word petit, which letter is silent?", options: ["p", "e", "i", "t"], answer: "t", why: "The final t of petit is silent." },
            { id: "q-l1-2", type: "mc", topic: "Sounds", prompt: "Which letter is always silent in French?", options: ["h", "r", "s", "t"], answer: "h", why: "The h is silent, as in hôtel and homme." },
            { id: "q-l1-3", type: "mc", topic: "Sounds", prompt: "Which word has the sound of the vowel in \"food\"?", options: ["vous", "tu", "café", "mère"], answer: "vous", why: "The spelling ou makes that sound." },
            { id: "q-l1-4", type: "listen", topic: "Sounds", say: "merci", prompt: "Listen. Which word did you hear?", options: ["merci", "mère", "café", "non"], answer: "merci", why: "That was merci, thank you." },
            { id: "q-l1-5", type: "mc", topic: "Sounds", prompt: "é sounds most like the vowel in…", options: ["day", "bed", "food", "car"], answer: "day", why: "é is close to the \"ay\" in day. è is close to the \"e\" in bed." }
          ]
        },
        {
          id: "l2", title: "Greetings and introducing yourself", minutes: 25,
          teach: [
            { h: "Saying hello and goodbye", p: "Bonjour works all day. Bonsoir is for the evening. Salut is informal and works for both hello and bye. In Quebec, you will also hear allô as a casual hello.", ex: [["Bonjour !", "Hello"], ["Bonsoir !", "Good evening"], ["Salut !", "Hi / Bye"], ["Au revoir !", "Goodbye"], ["À bientôt !", "See you soon"]] },
            { h: "Your name", p: "Je m'appelle means \"my name is\". Literally, it means \"I call myself\".", ex: [["Je m'appelle Paul.", "My name is Kailash."], ["Comment tu t'appelles ?", "What's your name? (informal)"], ["Comment vous appelez-vous ?", "What's your name? (formal)"], ["Enchanté.", "Nice to meet you. (a man says this)"], ["Enchantée.", "Nice to meet you. (a woman writes this, it sounds the same)"]] },
            { h: "How are you?", p: "Ça va ? is the everyday question, and you can answer with the same words. Comment allez-vous ? is formal. French puts a space before ? and ! .", ex: [["Ça va ?", "How's it going?"], ["Ça va bien, merci.", "I'm doing well, thanks."], ["Comment allez-vous ?", "How are you? (formal)"], ["S'il vous plaît.", "Please. (formal)"]] }
          ],
          vocab: [["bonsoir", "good evening"], ["salut", "hi / bye"], ["au revoir", "goodbye"], ["à bientôt", "see you soon"], ["je m'appelle", "my name is"], ["enchanté", "nice to meet you"], ["ça va ?", "how's it going?"], ["s'il vous plaît", "please (formal)"]],
          questions: [
            { id: "q-l2-1", type: "mc", topic: "Greetings", prompt: "It's 8 p.m. and you meet a client. What do you say?", options: ["Bonsoir !", "Salut !", "Au revoir !", "Merci !"], answer: "Bonsoir !", why: "Bonsoir is the polite evening greeting." },
            { id: "q-l2-2", type: "mc", topic: "Greetings", prompt: "Which one is informal?", options: ["Salut !", "Bonjour !", "Comment allez-vous ?", "Bonsoir !"], answer: "Salut !", why: "Salut is for friends and people you know well." },
            { id: "q-l2-3", type: "fill", topic: "Introductions", prompt: "My name is Marie.", before: "Je m'", after: " Marie.", accepted: ["appelle"], strict: false, why: "Je m'appelle has two p's and two l's." },
            { id: "q-l2-4", type: "translate", topic: "Greetings", prompt: "Write in French: goodbye", accepted: ["au revoir"], why: "Au revoir is two words." },
            { id: "q-l2-5", type: "translate", topic: "Greetings", prompt: "Write in French: thank you", accepted: ["merci"], why: "Merci means thank you." },
            { id: "q-l2-6", type: "order", topic: "Introductions", prompt: "Build: What's your name? (informal)", words: ["Comment", "tu", "t'appelles", "?"], accepted: ["Comment tu t'appelles ?"], why: "Comment tu t'appelles ? is the casual form." },
            { id: "q-l2-7", type: "mc", topic: "Introductions", prompt: "Which spelling would a woman write?", options: ["Enchantée", "Enchanté", "Enchantes", "Enchante"], answer: "Enchantée", why: "A woman adds an extra e in writing. It sounds the same." },
            { id: "q-l2-8", type: "match", topic: "Greetings", prompt: "Match each phrase.", pairs: [["au revoir", "goodbye"], ["merci", "thank you"], ["à bientôt", "see you soon"], ["ça va ?", "how's it going?"]], why: "Review these in your flashcards." }
          ]
        },
        {
          id: "l3", title: "Je, tu, vous: who is who", minutes: 25,
          teach: [
            { h: "The subject pronouns", p: "These words say who does the action. Je becomes j' before a vowel sound.", ex: [["je", "I"], ["tu", "you (one person, informal)"], ["il", "he / it"], ["elle", "she / it"], ["on", "we / people (very common when speaking)"], ["nous", "we"], ["vous", "you (formal, or more than one person)"], ["ils", "they (men or mixed group)"], ["elles", "they (only women)"]] },
            { h: "Tu or vous?", p: "Use tu with friends, family, and children. Use vous with strangers, customers, your boss at first, and any group. Quebec uses tu more quickly than France does, but start with vous when you aren't sure.", ex: [["Tu vas bien ?", "Are you well? (to a friend)"], ["Vous allez bien ?", "Are you well? (polite, or to a group)"]] },
            { h: "They: ils or elles", p: "If a group has even one man, French uses ils. Use elles only for a group of all women.", ex: [["Marie et Julie : elles", "Marie and Julie: they"], ["Marie et Paul : ils", "Marie and Paul: they"]] }
          ],
          vocab: [["je", "I"], ["tu", "you (informal)"], ["il", "he"], ["elle", "she"], ["nous", "we"], ["vous", "you (formal or plural)"], ["ils", "they (masc. or mixed)"], ["elles", "they (fem.)"]],
          questions: [
            { id: "q-l3-1", type: "mc", topic: "Tu or vous", prompt: "You're speaking to your new supervisor. Use…", options: ["vous", "tu", "je", "on"], answer: "vous", why: "Start with vous at work until you're invited to use tu." },
            { id: "q-l3-2", type: "mc", topic: "Tu or vous", prompt: "You're speaking to two friends. Use…", options: ["vous", "tu", "il", "je"], answer: "vous", why: "Vous is also the plural you, even with friends." },
            { id: "q-l3-3", type: "mc", topic: "Pronouns", prompt: "Paul et Sophie → ?", options: ["ils", "elles", "il", "elle"], answer: "ils", why: "A mixed group is ils." },
            { id: "q-l3-4", type: "fill", topic: "Pronouns", prompt: "Replace \"Marie\": ___ est ici.", before: "", after: " est ici.", accepted: ["elle"], strict: true, why: "Marie is she, so elle." },
            { id: "q-l3-5", type: "translate", topic: "Pronouns", prompt: "Write in French: we", accepted: ["nous", "on"], why: "Nous means we. On is also common when speaking." },
            { id: "q-l3-6", type: "mc", topic: "Pronouns", prompt: "Sophie et Julie → ?", options: ["elles", "ils", "elle", "vous"], answer: "elles", why: "A group of only women is elles." },
            { id: "q-l3-7", type: "match", topic: "Pronouns", prompt: "Match each pronoun.", pairs: [["je", "I"], ["nous", "we"], ["elle", "she"], ["il", "he"]], why: "Pronouns appear in almost every sentence." }
          ]
        },
        {
          id: "l4", title: "Être: to be", minutes: 25,
          teach: [
            { h: "The verb être", p: "Être means \"to be\". It is irregular, so you learn each form by heart. Je suis is the first one to memorize.", ex: [["je suis", "I am"], ["tu es", "you are"], ["il / elle / on est", "he / she / one is"], ["nous sommes", "we are"], ["vous êtes", "you are"], ["ils / elles sont", "they are"]] },
            { h: "Jobs and nationalities", p: "With jobs, French doesn't use a word for \"a\". Say Je suis machiniste, not Je suis un machiniste. Many job and nationality words change for women.", ex: [["Je suis machiniste.", "I'm a machinist."], ["Il est canadien.", "He is Canadian."], ["Elle est canadienne.", "She is Canadian."]] },
            { h: "Saying what you are not", p: "Put ne before the verb and pas after it. Ne becomes n' before a vowel. In everyday speech, people often drop the ne, but keep it in writing.", ex: [["Je ne suis pas ici.", "I am not here."], ["Vous n'êtes pas en retard.", "You are not late."]] }
          ],
          vocab: [["être", "to be"], ["je suis", "I am"], ["vous êtes", "you are (formal or plural)"], ["ici", "here"], ["canadien", "Canadian (man)"], ["canadienne", "Canadian (woman)"], ["machiniste", "machinist"]],
          questions: [
            { id: "q-l4-1", type: "fill", topic: "Être", prompt: "I am here.", before: "Je ", after: " ici.", accepted: ["suis"], strict: true, why: "Je goes with suis." },
            { id: "q-l4-2", type: "fill", topic: "Être", prompt: "You are late. (friend)", before: "Tu ", after: " en retard.", accepted: ["es"], strict: true, why: "Tu goes with es. Il and elle go with est." },
            { id: "q-l4-3", type: "fill", topic: "Être", prompt: "We are Canadian.", before: "Nous ", after: " canadiens.", accepted: ["sommes"], strict: true, why: "Nous goes with sommes." },
            { id: "q-l4-4", type: "fill", topic: "Être", prompt: "You are at work. (formal)", before: "Vous ", after: " au travail.", accepted: ["êtes"], strict: true, why: "Vous goes with êtes, and it needs the ê." },
            { id: "q-l4-5", type: "fill", topic: "Être", prompt: "They are here.", before: "Ils ", after: " ici.", accepted: ["sont"], strict: true, why: "Ils and elles go with sont." },
            { id: "q-l4-6", type: "mc", topic: "Être", prompt: "Choose the correct sentence.", options: ["Je suis machiniste.", "Je suis un machiniste.", "Je es machiniste.", "Je est machiniste."], answer: "Je suis machiniste.", why: "Jobs after être don't take un or une." },
            { id: "q-l4-7", type: "order", topic: "Negation", prompt: "Build: I am not here.", words: ["Je", "ne", "suis", "pas", "ici", "."], accepted: ["Je ne suis pas ici ."], why: "Ne and pas go around the verb." },
            { id: "q-l4-8", type: "translate", topic: "Être", prompt: "Write in French: I am Canadian. (choose your own form)", accepted: ["je suis canadien", "je suis canadienne"], why: "Use canadien for a man and canadienne for a woman." }
          ]
        },
        {
          id: "l5", title: "Numbers 0 to 20", minutes: 25,
          teach: [
            { h: "Zero to ten", p: "Say each one out loud. In six and dix, the x sounds like an s when the number stands alone.", ex: [["zéro", "0"], ["un", "1"], ["deux", "2"], ["trois", "3"], ["quatre", "4"], ["cinq", "5"], ["six", "6"], ["sept", "7"], ["huit", "8"], ["neuf", "9"], ["dix", "10"]] },
            { h: "Eleven to twenty", p: "Dix-sept, dix-huit, and dix-neuf are built from ten plus a number, joined by a hyphen.", ex: [["onze", "11"], ["douze", "12"], ["treize", "13"], ["quatorze", "14"], ["quinze", "15"], ["seize", "16"], ["dix-sept", "17"], ["dix-huit", "18"], ["dix-neuf", "19"], ["vingt", "20"]] },
            { h: "Il y a", p: "Il y a means \"there is\" or \"there are\". It stays the same for one thing or many.", ex: [["Il y a trois machines.", "There are three machines."], ["Il y a un café ici.", "There is a coffee shop here."]] }
          ],
          vocab: [["deux", "two"], ["trois", "three"], ["cinq", "five"], ["huit", "eight"], ["dix", "ten"], ["douze", "twelve"], ["quinze", "fifteen"], ["vingt", "twenty"], ["il y a", "there is / there are"]],
          questions: [
            { id: "q-l5-1", type: "translate", topic: "Numbers", prompt: "Write the word in French: 3", accepted: ["trois"], why: "3 is trois." },
            { id: "q-l5-2", type: "translate", topic: "Numbers", prompt: "Write the word in French: 12", accepted: ["douze"], why: "12 is douze." },
            { id: "q-l5-3", type: "translate", topic: "Numbers", prompt: "Write the word in French: 17", accepted: ["dix-sept", "dix sept"], why: "17 is dix-sept, with a hyphen." },
            { id: "q-l5-4", type: "listen", topic: "Numbers", say: "quinze", prompt: "Listen. Which number did you hear?", options: ["15", "4", "14", "5"], answer: "15", why: "That was quinze, 15." },
            { id: "q-l5-5", type: "mc", topic: "Numbers", prompt: "What is treize?", options: ["13", "3", "30", "12"], answer: "13", why: "Treize is 13." },
            { id: "q-l5-6", type: "mc", topic: "Il y a", prompt: "Choose: There are two machines.", options: ["Il y a deux machines.", "Il est deux machines.", "Ils sont deux machines.", "Je suis deux machines."], answer: "Il y a deux machines.", why: "Il y a means there is or there are." },
            { id: "q-l5-7", type: "match", topic: "Numbers", prompt: "Match each number.", pairs: [["huit", "8"], ["dix", "10"], ["seize", "16"], ["vingt", "20"]], why: "Numbers come up everywhere: prices, times, and measurements." }
          ]
        },
        {
          id: "l6", title: "Unit test", minutes: 25, isTest: true,
          teach: [
            { h: "Show what you know", p: "This test mixes all five lessons. You pass with 80%. Wrong answers go to your mistake book, so a low score still helps you." }
          ],
          vocab: [],
          questions: [
            { id: "q-l6-1", type: "mc", topic: "Greetings", prompt: "Which is a formal question?", options: ["Comment allez-vous ?", "Ça va ?", "Salut !", "Comment tu t'appelles ?"], answer: "Comment allez-vous ?", why: "Vous with allez is formal." },
            { id: "q-l6-2", type: "fill", topic: "Être", prompt: "She is here.", before: "Elle ", after: " ici.", accepted: ["est"], strict: true, why: "Elle goes with est." },
            { id: "q-l6-3", type: "fill", topic: "Être", prompt: "We are at work.", before: "Nous ", after: " au travail.", accepted: ["sommes"], strict: true, why: "Nous goes with sommes." },
            { id: "q-l6-4", type: "translate", topic: "Numbers", prompt: "Write the word in French: 19", accepted: ["dix-neuf", "dix neuf"], why: "19 is dix-neuf." },
            { id: "q-l6-5", type: "translate", topic: "Numbers", prompt: "Write the word in French: 20", accepted: ["vingt"], why: "20 is vingt." },
            { id: "q-l6-6", type: "order", topic: "Negation", prompt: "Build: You are not late. (formal)", words: ["Vous", "n'êtes", "pas", "en", "retard", "."], accepted: ["Vous n'êtes pas en retard ."], why: "Ne becomes n' before êtes." },
            { id: "q-l6-7", type: "mc", topic: "Tu or vous", prompt: "You're greeting a child. Use…", options: ["tu", "vous", "ils", "elles"], answer: "tu", why: "Use tu with children." },
            { id: "q-l6-8", type: "listen", topic: "Numbers", say: "seize", prompt: "Listen. Which number did you hear?", options: ["16", "6", "13", "7"], answer: "16", why: "That was seize, 16." },
            { id: "q-l6-9", type: "fill", topic: "Introductions", prompt: "My name is Paul.", before: "Je ", after: " Paul.", accepted: ["m'appelle"], strict: false, why: "Je m'appelle is the full phrase." },
            { id: "q-l6-10", type: "mc", topic: "Sounds", prompt: "In the word hôtel, the h is…", options: ["silent", "strong", "rolled", "doubled"], answer: "silent", why: "The h is silent." }
          ]
        }
      ]
    }
  },
  // One extra skill task per session, rotating through the four skills.
  skills: [
    { skill: "Listening", title: "Listen and repeat", task: "Tap each line, then repeat it out loud three times.", lines: ["Bonjour, je m'appelle Paul.", "Vous êtes canadien ?", "Il y a dix machines."] },
    { skill: "Speaking", title: "Introduce yourself", task: "Say these out loud without reading: your name, how you are, and your job. Use Je m'appelle, Ça va bien, and Je suis." },
    { skill: "Reading", title: "Read a short note", task: "Read this, then tap to hear it. Who is Paul?", lines: ["Bonjour ! Je m'appelle Paul. Je suis machiniste. Je suis canadien. Ça va bien, merci !"] },
    { skill: "Writing", title: "Write three sentences", task: "On paper or below, write your name, your job, and one thing you are. Your text stays in this app.", writing: true }
  ]
};
