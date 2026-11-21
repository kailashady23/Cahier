// A1 Modules 2 and 3. Lesson and question ids start with the module (m2-, m3-) so they never clash.
(function (C) {
  C.units["a1-u2"] = {
    id: "a1-u2",
    title: "Moi et les autres",
    quickCheck: ["q-m2-l1-1", "q-m2-l2-2", "q-m2-l3-3", "q-m2-l3-7", "q-m2-l4-2", "q-m2-l4-4", "q-m2-l5-1", "q-m2-l5-3", "q-m2-l6-3", "q-m2-l6-5"],
    lessons: [
      {
        id: "m2-l1", icon: "tag", desc: "Un or une, le or la, and why every noun has a gender", title: "Masculine and feminine", minutes: 25,
        teach: [
          { h: "Every noun is masculine or feminine", p: "French nouns have a gender, even for objects. Un means \"a\" for masculine nouns, and une is for feminine ones.", ex: [["un livre", "a book"], ["un outil", "a tool"], ["une machine", "a machine"], ["une voiture", "a car"], ["une pièce", "a part (also: a room)"]] },
          { h: "The: le, la, and l'", p: "Le is masculine and la is feminine. Both become l' before a vowel or a silent h, so l' doesn't tell you the gender.", ex: [["le livre", "the book"], ["la machine", "the machine"], ["l'outil", "the tool (masculine)"], ["l'eau", "the water (feminine)"], ["l'hôtel", "the hotel (masculine)"]] },
          { h: "Learn each noun with its article", p: "Many nouns ending in -e are feminine, but not all of them. Learning le problème instead of just problème saves you from guessing later.", ex: [["le problème", "the problem (masculine)"], ["le fromage", "the cheese (masculine)"], ["la table", "the table (feminine)"]] }
        ],
        vocab: [["un livre", "a book"], ["un outil", "a tool"], ["une voiture", "a car"], ["une pièce", "a part / a room"], ["l'eau", "the water"], ["le problème", "the problem"], ["un ordinateur", "a computer"]],
        questions: [
          { id: "q-m2-l1-1", type: "mc", topic: "Gender", prompt: "___ voiture (a car)", options: ["une", "un", "le", "l'"], answer: "une", why: "Voiture is feminine, so it takes une." },
          { id: "q-m2-l1-2", type: "mc", topic: "Gender", prompt: "___ ordinateur (a computer)", options: ["un", "une", "la", "les"], answer: "un", why: "Ordinateur is masculine, so it takes un." },
          { id: "q-m2-l1-3", type: "fill", topic: "Gender", prompt: "the water", before: "", after: "eau", accepted: ["l'"], strict: true, why: "Le and la become l' before a vowel." },
          { id: "q-m2-l1-4", type: "mc", topic: "Gender", prompt: "Choose: the book", options: ["le livre", "la livre", "l'livre", "un livre"], answer: "le livre", why: "Livre is masculine. La livre is a different word that means a pound." },
          { id: "q-m2-l1-5", type: "translate", topic: "Gender", prompt: "Write in French: a car", accepted: ["une voiture"], why: "Voiture is feminine: une voiture." },
          { id: "q-m2-l1-6", type: "mc", topic: "Gender", prompt: "Which noun is masculine, even though it ends in -e?", options: ["problème", "table", "voiture", "machine"], answer: "problème", why: "It's le problème. That's why you learn the article with each noun." },
          { id: "q-m2-l1-7", type: "match", topic: "Vocabulary", prompt: "Match each word.", pairs: [["un outil", "a tool"], ["une pièce", "a part"], ["l'eau", "water"], ["un livre", "a book"]], why: "These words come back in your flashcards." }
        ]
      },
      {
        id: "m2-l2", icon: "stack", desc: "Les and des, and the -s you don't say", title: "One or many", minutes: 25,
        teach: [
          { h: "Les and des", p: "For more than one, le, la, and l' all become les. Un and une become des, which means \"some\".", ex: [["le livre → les livres", "the books"], ["la machine → les machines", "the machines"], ["un outil → des outils", "some tools"], ["une voiture → des voitures", "some cars"]] },
          { h: "Add -s, but don't say it", p: "The plural -s is silent. You hear the plural in the article instead. Before a vowel, les and des link with a z sound.", ex: [["les machines", "the machines"], ["les outils", "the tools (say lay-zoo-tee)"], ["des amis", "some friends (say day-zah-mee)"]] },
          { h: "Two common patterns", p: "Words ending in -eau add -x. Most words ending in -al change to -aux.", ex: [["un gâteau → des gâteaux", "cakes"], ["un bureau → des bureaux", "desks / offices"], ["un journal → des journaux", "newspapers"]] }
        ],
        vocab: [["un ami", "a friend (man)"], ["une amie", "a friend (woman)"], ["un gâteau", "a cake"], ["un bureau", "a desk / an office"], ["un journal", "a newspaper"]],
        questions: [
          { id: "q-m2-l2-1", type: "mc", topic: "Plural", prompt: "une machine → ?", options: ["des machines", "des machine", "les machine", "une machines"], answer: "des machines", why: "Une becomes des, and the noun adds -s." },
          { id: "q-m2-l2-2", type: "fill", topic: "Plural", prompt: "the tools", before: "", after: " outils", accepted: ["les"], strict: true, why: "The plural of le, la, and l' is les." },
          { id: "q-m2-l2-3", type: "translate", topic: "Plural", prompt: "Write in French: some books", accepted: ["des livres"], why: "Some books is des livres." },
          { id: "q-m2-l2-4", type: "mc", topic: "Plural", prompt: "un journal → ?", options: ["des journaux", "des journals", "des journauxs", "les journal"], answer: "des journaux", why: "Most words ending in -al change to -aux." },
          { id: "q-m2-l2-5", type: "fill", topic: "Plural", prompt: "two cakes", before: "deux ", after: "", accepted: ["gâteaux"], strict: true, why: "Words ending in -eau add -x: gâteaux." },
          { id: "q-m2-l2-6", type: "listen", topic: "Plural", say: "les amis", prompt: "Listen. What did you hear?", options: ["les amis", "l'ami", "un ami", "des amis"], answer: "les amis", why: "That was les amis, with a z sound linking the words." },
          { id: "q-m2-l2-7", type: "order", topic: "Plural", prompt: "Build: The tools are here.", words: ["Les", "outils", "sont", "ici", "."], accepted: ["Les outils sont ici ."], why: "Les outils is plural, so the verb is sont." }
        ]
      },
      {
        id: "m2-l3", icon: "hand", desc: "J'ai, tu as, and how to say your age", title: "Avoir: to have", minutes: 25,
        teach: [
          { h: "The verb avoir", p: "Avoir means \"to have\". Like être, it's irregular, so learn each form by heart. Je becomes j' because ai starts with a vowel.", ex: [["j'ai", "I have"], ["tu as", "you have"], ["il / elle / on a", "he / she / one has"], ["nous avons", "we have"], ["vous avez", "you have"], ["ils / elles ont", "they have"]] },
          { h: "Ils ont or ils sont", p: "Listen for the difference. Ils ont (they have) links with a z sound. Ils sont (they are) has an s sound.", ex: [["ils ont", "they have"], ["ils sont", "they are"]] },
          { h: "Age uses avoir", p: "In French, you have your age. Never say je suis vingt.", ex: [["J'ai vingt ans.", "I'm 20 years old."], ["Quel âge avez-vous ?", "How old are you?"]] },
          { h: "Not any: pas de", p: "After pas, un, une, and des become de. De becomes d' before a vowel.", ex: [["J'ai une voiture.", "I have a car."], ["Je n'ai pas de voiture.", "I don't have a car."], ["Je n'ai pas d'outil.", "I don't have a tool."]] }
        ],
        vocab: [["avoir", "to have"], ["j'ai", "I have"], ["un an", "a year"], ["quel âge ?", "how old?"], ["une question", "a question"]],
        questions: [
          { id: "q-m2-l3-1", type: "fill", topic: "Avoir", prompt: "I have a tool.", before: "J'", after: " un outil.", accepted: ["ai"], strict: true, why: "Je becomes j' before ai." },
          { id: "q-m2-l3-2", type: "fill", topic: "Avoir", prompt: "We have a question.", before: "Nous ", after: " une question.", accepted: ["avons"], strict: true, why: "Nous goes with avons." },
          { id: "q-m2-l3-3", type: "fill", topic: "Avoir", prompt: "They have tools.", before: "Ils ", after: " des outils.", accepted: ["ont"], strict: true, why: "Ils and elles go with ont." },
          { id: "q-m2-l3-4", type: "fill", topic: "Avoir", prompt: "You have a car. (formal)", before: "Vous ", after: " une voiture.", accepted: ["avez"], strict: true, why: "Vous goes with avez." },
          { id: "q-m2-l3-5", type: "mc", topic: "Avoir", prompt: "Choose: I'm 20 years old.", options: ["J'ai vingt ans.", "Je suis vingt ans.", "J'ai vingt.", "Je suis vingt."], answer: "J'ai vingt ans.", why: "Age uses avoir and needs ans." },
          { id: "q-m2-l3-6", type: "listen", topic: "Avoir", say: "Ils ont des outils.", prompt: "Listen. What did you hear?", options: ["Ils ont des outils.", "Ils sont des outils.", "Il a des outils.", "Elle a des outils."], answer: "Ils ont des outils.", why: "Ils ont links with a z sound." },
          { id: "q-m2-l3-7", type: "mc", topic: "Negation", prompt: "Choose: I don't have a car.", options: ["Je n'ai pas de voiture.", "Je n'ai pas une voiture.", "Je ne ai pas de voiture.", "Je n'ai de voiture."], answer: "Je n'ai pas de voiture.", why: "After pas, une becomes de." },
          { id: "q-m2-l3-8", type: "order", topic: "Avoir", prompt: "Build: How old are you? (formal)", words: ["Quel", "âge", "avez-vous", "?"], accepted: ["Quel âge avez-vous ?"], why: "Quel âge avez-vous ? is the polite way to ask." }
        ]
      },
      {
        id: "m2-l4", icon: "globe", desc: "Where you live, where you're from, and nationalities", title: "Countries and nationalities", minutes: 25,
        teach: [
          { h: "Where you live: à, au, en", p: "Use à with cities. Use en with feminine countries, au with masculine countries, and aux with plural ones.", ex: [["J'habite à Toronto.", "I live in Toronto."], ["J'habite au Canada.", "I live in Canada."], ["Elle habite en France.", "She lives in France."], ["Il habite aux États-Unis.", "He lives in the United States."]] },
          { h: "Where you're from: venir de", p: "Je viens de means \"I come from\". De + le becomes du, and de becomes d' before a vowel.", ex: [["Je viens de Montréal.", "I come from Montreal."], ["Je viens du Canada.", "I come from Canada."], ["Il vient de France.", "He comes from France."], ["Vous venez d'Inde ?", "Do you come from India?"]] },
          { h: "Nationalities change for women", p: "Add -e for a woman. Words ending in -ien double the n first. Nationalities don't take a capital letter in French.", ex: [["canadien / canadienne", "Canadian"], ["français / française", "French"], ["indien / indienne", "Indian"], ["américain / américaine", "American"]] }
        ],
        vocab: [["habiter", "to live (somewhere)"], ["venir de", "to come from"], ["un pays", "a country"], ["une ville", "a city"], ["le Canada", "Canada"], ["la France", "France"]],
        questions: [
          { id: "q-m2-l4-1", type: "mc", topic: "Places", prompt: "J'habite ___ Toronto.", options: ["à", "au", "en", "aux"], answer: "à", why: "Use à with cities." },
          { id: "q-m2-l4-2", type: "mc", topic: "Places", prompt: "J'habite ___ Canada.", options: ["au", "à", "en", "aux"], answer: "au", why: "Canada is masculine: au Canada." },
          { id: "q-m2-l4-3", type: "mc", topic: "Places", prompt: "Elle habite ___ France.", options: ["en", "au", "à", "aux"], answer: "en", why: "France is feminine: en France." },
          { id: "q-m2-l4-4", type: "fill", topic: "Places", prompt: "I come from Canada.", before: "Je viens ", after: " Canada.", accepted: ["du"], strict: true, why: "De + le becomes du." },
          { id: "q-m2-l4-5", type: "mc", topic: "Nationality", prompt: "Marie is French. Elle est…", options: ["française", "français", "France", "françaises"], answer: "française", why: "Add -e for a woman: française." },
          { id: "q-m2-l4-6", type: "translate", topic: "Places", prompt: "Write in French: I live in Canada.", accepted: ["J'habite au Canada."], why: "J'habite au Canada." },
          { id: "q-m2-l4-7", type: "match", topic: "Vocabulary", prompt: "Match each phrase.", pairs: [["un pays", "a country"], ["une ville", "a city"], ["j'habite", "I live"], ["je viens de", "I come from"]], why: "You'll use these to introduce yourself." }
        ]
      },
      {
        id: "m2-l5", icon: "ruler", desc: "Big, small, easy, and fast, matched to each noun", title: "Describing things", minutes: 25,
        teach: [
          { h: "Adjectives match the noun", p: "Add -e for feminine and -s for plural. If the adjective already ends in -e, it doesn't change for feminine.", ex: [["un petit outil", "a small tool"], ["une petite pièce", "a small part"], ["des petites pièces", "small parts"], ["un travail facile", "an easy job"], ["une question facile", "an easy question"]] },
          { h: "Most adjectives go after the noun", p: "A few short, common ones go before it: grand, petit, bon, and jeune. Bon becomes bonne for feminine.", ex: [["une machine rapide", "a fast machine"], ["un travail difficile", "a difficult job"], ["un bon outil", "a good tool"], ["une bonne idée", "a good idea"]] },
          { h: "C'est or il est", p: "Use c'est before a noun with un or une, or for a general comment. Use il est or elle est with an adjective about one specific person or thing.", ex: [["C'est un bon outil.", "It's a good tool."], ["C'est facile !", "It's easy!"], ["Il est grand.", "He is tall."], ["Elle est rapide.", "It (the machine) is fast."]] }
        ],
        vocab: [["grand", "big / tall"], ["petit", "small"], ["bon / bonne", "good"], ["facile", "easy"], ["difficile", "difficult"], ["rapide", "fast"], ["une idée", "an idea"]],
        questions: [
          { id: "q-m2-l5-1", type: "fill", topic: "Adjectives", prompt: "a small machine", before: "une ", after: " machine", accepted: ["petite"], strict: true, why: "Machine is feminine, so petit becomes petite." },
          { id: "q-m2-l5-2", type: "mc", topic: "Adjectives", prompt: "Choose: a fast machine", options: ["une machine rapide", "une rapide machine", "un machine rapide", "une machine rapides"], answer: "une machine rapide", why: "Most adjectives go after the noun." },
          { id: "q-m2-l5-3", type: "fill", topic: "Adjectives", prompt: "The parts are small.", before: "Les pièces sont ", after: ".", accepted: ["petites"], strict: true, why: "Pièces is feminine and plural: petites." },
          { id: "q-m2-l5-4", type: "mc", topic: "Adjectives", prompt: "It's easy! C'est…", options: ["facile !", "facil !", "faciles !", "une facile !"], answer: "facile !", why: "Facile already ends in -e." },
          { id: "q-m2-l5-5", type: "translate", topic: "Adjectives", prompt: "Write in French: a good idea", accepted: ["une bonne idée"], why: "Idée is feminine, so bon becomes bonne." },
          { id: "q-m2-l5-6", type: "mc", topic: "C'est / il est", prompt: "Choose: He is tall.", options: ["Il est grand.", "Il est grande.", "Il grand.", "Il a grand."], answer: "Il est grand.", why: "Use il est with an adjective about a person." },
          { id: "q-m2-l5-7", type: "order", topic: "C'est / il est", prompt: "Build: It's a good tool.", words: ["C'est", "un", "bon", "outil", "."], accepted: ["C'est un bon outil ."], why: "Use c'est before un or une. Bon goes before the noun." }
        ]
      },
      {
        id: "m2-l6", icon: "question", desc: "Est-ce que, où, qui, and other question words", title: "Asking questions", minutes: 25,
        teach: [
          { h: "Three ways to ask yes or no", p: "Raise your voice at the end, add est-ce que, or swap the verb and pronoun. The first is the most common when speaking. The last is formal.", ex: [["Vous êtes canadien ?", "Are you Canadian? (voice goes up)"], ["Est-ce que vous êtes canadien ?", "Are you Canadian?"], ["Êtes-vous canadien ?", "Are you Canadian? (formal)"]] },
          { h: "Question words", p: "Put the question word first, followed by est-ce que. Est-ce que becomes est-ce qu' before a vowel.", ex: [["Où ?", "Where?"], ["Qui ?", "Who?"], ["Quand ?", "When?"], ["Comment ?", "How?"], ["Pourquoi ?", "Why?"], ["Combien ?", "How much? / How many?"]] },
          { h: "Useful questions", p: "You'll hear these every day. In casual speech, people often put the question word at the end: Tu habites où ?", ex: [["Où est-ce que tu habites ?", "Where do you live?"], ["Qu'est-ce que c'est ?", "What is it?"], ["Qui est-ce ?", "Who is it?"], ["Est-ce qu'il est ici ?", "Is he here?"]] }
        ],
        vocab: [["où", "where"], ["qui", "who"], ["quand", "when"], ["comment", "how"], ["pourquoi", "why"], ["combien", "how much / how many"]],
        questions: [
          { id: "q-m2-l6-1", type: "mc", topic: "Questions", prompt: "Where?", options: ["Où ?", "Qui ?", "Quand ?", "Comment ?"], answer: "Où ?", why: "Où means where. Don't mix it up with ou, which means or." },
          { id: "q-m2-l6-2", type: "mc", topic: "Questions", prompt: "Why?", options: ["Pourquoi ?", "Combien ?", "Comment ?", "Quand ?"], answer: "Pourquoi ?", why: "Pourquoi means why." },
          { id: "q-m2-l6-3", type: "fill", topic: "Questions", prompt: "Is he here?", before: "Est-ce ", after: " il est ici ?", accepted: ["qu'"], strict: true, why: "Que becomes qu' before a vowel." },
          { id: "q-m2-l6-4", type: "order", topic: "Questions", prompt: "Build: Where do you live?", words: ["Où", "est-ce", "que", "tu", "habites", "?"], accepted: ["Où est-ce que tu habites ?"], why: "Question word, then est-ce que, then the rest." },
          { id: "q-m2-l6-5", type: "mc", topic: "Questions", prompt: "Choose: What is it?", options: ["Qu'est-ce que c'est ?", "Qui est-ce ?", "Où est-ce ?", "Comment c'est ?"], answer: "Qu'est-ce que c'est ?", why: "Qu'est-ce que c'est ? asks what something is. Qui est-ce ? asks who." },
          { id: "q-m2-l6-6", type: "match", topic: "Questions", prompt: "Match each word.", pairs: [["qui", "who"], ["quand", "when"], ["comment", "how"], ["combien", "how many"]], why: "Question words come up in almost every conversation." },
          { id: "q-m2-l6-7", type: "translate", topic: "Questions", prompt: "Write in French: Who is it?", accepted: ["Qui est-ce ?", "C'est qui ?"], why: "Qui est-ce ? or, casually, C'est qui ?" }
        ]
      },
      {
        id: "m2-l7", icon: "test", isTest: true, desc: "Mixed questions from all six lessons", title: "Module test", minutes: 25,
        teach: [{ h: "Show what you know", p: "This test mixes all six lessons in this module. You pass with 80%. Wrong answers go to your mistake book." }],
        vocab: [],
        questions: [
          { id: "q-m2-l7-1", type: "mc", topic: "Gender", prompt: "Choose: the car", options: ["la voiture", "le voiture", "l'voiture", "les voiture"], answer: "la voiture", why: "Voiture is feminine." },
          { id: "q-m2-l7-2", type: "fill", topic: "Avoir", prompt: "We have two machines.", before: "Nous ", after: " deux machines.", accepted: ["avons"], strict: true, why: "Nous goes with avons." },
          { id: "q-m2-l7-3", type: "fill", topic: "Negation", prompt: "I don't have a car.", before: "Je n'ai pas ", after: " voiture.", accepted: ["de"], strict: true, why: "After pas, une becomes de." },
          { id: "q-m2-l7-4", type: "mc", topic: "Places", prompt: "J'habite ___ France.", options: ["en", "au", "à", "aux"], answer: "en", why: "France is feminine: en France." },
          { id: "q-m2-l7-5", type: "fill", topic: "Nationality", prompt: "She is Canadian.", before: "Elle est ", after: ".", accepted: ["canadienne"], strict: true, why: "Canadien doubles the n and adds -e for a woman." },
          { id: "q-m2-l7-6", type: "order", topic: "Questions", prompt: "Build: Are you Canadian? (man, formal)", words: ["Est-ce", "que", "vous", "êtes", "canadien", "?"], accepted: ["Est-ce que vous êtes canadien ?"], why: "Est-ce que goes at the start of the question." },
          { id: "q-m2-l7-7", type: "translate", topic: "Plural", prompt: "Write in French: some friends", accepted: ["des amis", "des amies"], why: "Des amis, or des amies if they're all women." },
          { id: "q-m2-l7-8", type: "listen", topic: "Questions", say: "Où est-ce que tu habites ?", prompt: "Listen. What did you hear?", options: ["Où est-ce que tu habites ?", "Qui est-ce ?", "Qu'est-ce que c'est ?", "Tu es canadien ?"], answer: "Où est-ce que tu habites ?", why: "That asked where you live." },
          { id: "q-m2-l7-9", type: "mc", topic: "Plural", prompt: "un gâteau → ?", options: ["des gâteaux", "des gâteaus", "des gâteau", "les gâteau"], answer: "des gâteaux", why: "Words ending in -eau add -x." },
          { id: "q-m2-l7-10", type: "fill", topic: "Avoir", prompt: "I'm 20 years old.", before: "J'ai vingt ", after: ".", accepted: ["ans"], strict: true, why: "Age needs ans." }
        ]
      }
    ]
  };

  C.units["a1-u3"] = {
    id: "a1-u3",
    title: "La vie de tous les jours",
    quickCheck: ["q-m3-l1-1", "q-m3-l1-2", "q-m3-l2-1", "q-m3-l2-3", "q-m3-l3-4", "q-m3-l4-2", "q-m3-l4-5", "q-m3-l5-1", "q-m3-l6-1", "q-m3-l6-5"],
    lessons: [
      {
        id: "m3-l1", icon: "chat", desc: "Parler, travailler, and the most common verb pattern", title: "Regular -er verbs", minutes: 25,
        teach: [
          { h: "Most verbs end in -er", p: "Take off -er, then add the ending for each person. Parler means \"to speak\".", ex: [["je parle", "I speak"], ["tu parles", "you speak"], ["il / elle / on parle", "he / she / one speaks"], ["nous parlons", "we speak"], ["vous parlez", "you speak"], ["ils / elles parlent", "they speak"]] },
          { h: "Four forms sound the same", p: "Parle, parles, and parlent all sound exactly alike. The -ent ending is silent on verbs. Only parlons and parlez sound different.", ex: [["Il parle.", "He speaks."], ["Ils parlent.", "They speak. (sounds the same)"]] },
          { h: "Useful -er verbs", p: "Je becomes j' before a vowel or a silent h.", ex: [["travailler", "to work"], ["j'habite", "I live"], ["j'utilise", "I use"], ["regarder", "to watch"], ["écouter", "to listen to"], ["étudier", "to study"], ["mesurer", "to measure"]] }
        ],
        vocab: [["parler", "to speak"], ["travailler", "to work"], ["utiliser", "to use"], ["regarder", "to watch"], ["écouter", "to listen to"], ["étudier", "to study"], ["mesurer", "to measure"]],
        questions: [
          { id: "q-m3-l1-1", type: "fill", topic: "-er verbs", prompt: "I speak French.", before: "Je ", after: " français.", accepted: ["parle"], strict: true, why: "Je takes -e: je parle." },
          { id: "q-m3-l1-2", type: "fill", topic: "-er verbs", prompt: "We work here.", before: "Nous ", after: " ici.", accepted: ["travaillons"], strict: true, why: "Nous takes -ons: travaillons." },
          { id: "q-m3-l1-3", type: "fill", topic: "-er verbs", prompt: "You use a machine. (formal)", before: "Vous ", after: " une machine.", accepted: ["utilisez"], strict: true, why: "Vous takes -ez: utilisez." },
          { id: "q-m3-l1-4", type: "fill", topic: "-er verbs", prompt: "They watch TV.", before: "Ils ", after: " la télé.", accepted: ["regardent"], strict: true, why: "Ils takes -ent, which is silent: regardent." },
          { id: "q-m3-l1-5", type: "fill", topic: "-er verbs", prompt: "You listen to the radio. (friend)", before: "Tu ", after: " la radio.", accepted: ["écoutes"], strict: true, why: "Tu takes -es: écoutes." },
          { id: "q-m3-l1-6", type: "mc", topic: "-er verbs", prompt: "Choose: I live in Toronto.", options: ["J'habite à Toronto.", "Je habite à Toronto.", "J'habites à Toronto.", "J'habite en Toronto."], answer: "J'habite à Toronto.", why: "Je becomes j' before a silent h, and cities take à." },
          { id: "q-m3-l1-7", type: "listen", topic: "-er verbs", say: "nous parlons", prompt: "Listen. What did you hear?", options: ["nous parlons", "vous parlez", "je parle", "tu parles"], answer: "nous parlons", why: "The -ons ending is one you can hear." },
          { id: "q-m3-l1-8", type: "mc", topic: "-er verbs", prompt: "Which forms sound exactly the same?", options: ["parle, parles, parlent", "parlons, parlez", "parle, parlez", "parlons, parlent"], answer: "parle, parles, parlent", why: "The endings -e, -es, and -ent are all silent." }
        ]
      },
      {
        id: "m3-l2", icon: "pen", desc: "Mangeons, commençons, préfère, and casual on", title: "Verbs with spelling changes", minutes: 25,
        teach: [
          { h: "Manger keeps its e", p: "Verbs ending in -ger keep an e before -ons, so the g stays soft.", ex: [["nous mangeons", "we eat"], ["nous voyageons", "we travel"]] },
          { h: "Commencer adds a ç", p: "Verbs ending in -cer change c to ç before -ons, so the c still sounds like s.", ex: [["nous commençons", "we start"], ["je commence", "I start"]] },
          { h: "Préférer changes its accent", p: "The é before the ending becomes è for je, tu, il, elle, on, ils, and elles. Nous and vous keep é.", ex: [["je préfère", "I prefer"], ["tu préfères", "you prefer"], ["nous préférons", "we prefer"], ["vous préférez", "you prefer"], ["ils préfèrent", "they prefer"]] },
          { h: "On often means we", p: "In everyday speech, on is used instead of nous. It takes the il form of the verb.", ex: [["On mange à midi.", "We eat at noon."], ["On travaille demain.", "We're working tomorrow."]] }
        ],
        vocab: [["manger", "to eat"], ["commencer", "to start"], ["voyager", "to travel"], ["préférer", "to prefer"], ["demain", "tomorrow"], ["à midi", "at noon"]],
        questions: [
          { id: "q-m3-l2-1", type: "fill", topic: "Spelling changes", prompt: "We eat at noon.", before: "Nous ", after: " à midi.", accepted: ["mangeons"], strict: true, why: "Manger keeps the e: mangeons." },
          { id: "q-m3-l2-2", type: "fill", topic: "Spelling changes", prompt: "We start tomorrow.", before: "Nous ", after: " demain.", accepted: ["commençons"], strict: true, why: "Commencer needs ç before -ons." },
          { id: "q-m3-l2-3", type: "fill", topic: "Spelling changes", prompt: "I prefer coffee.", before: "Je ", after: " le café.", accepted: ["préfère"], strict: true, why: "Je préfère: é, then è." },
          { id: "q-m3-l2-4", type: "fill", topic: "Spelling changes", prompt: "Do you prefer tea? (formal)", before: "Vous ", after: " le thé ?", accepted: ["préférez"], strict: true, why: "Vous keeps both é: préférez." },
          { id: "q-m3-l2-5", type: "mc", topic: "On", prompt: "We start at eight. On ___ à huit heures.", options: ["commence", "commençons", "commencent", "commences"], answer: "commence", why: "On takes the il form: commence." },
          { id: "q-m3-l2-6", type: "mc", topic: "Spelling changes", prompt: "nous + voyager", options: ["voyageons", "voyagons", "voyagez", "voyagent"], answer: "voyageons", why: "Voyager keeps the e, like manger." },
          { id: "q-m3-l2-7", type: "match", topic: "Vocabulary", prompt: "Match each word.", pairs: [["manger", "to eat"], ["commencer", "to start"], ["voyager", "to travel"], ["demain", "tomorrow"]], why: "These verbs are everywhere in daily life." }
        ]
      },
      {
        id: "m3-l3", icon: "calendar", desc: "Lundi to dimanche, and morning to night", title: "Days and times of day", minutes: 25,
        teach: [
          { h: "Days of the week", p: "French days don't take a capital letter. The week starts on Monday.", ex: [["lundi", "Monday"], ["mardi", "Tuesday"], ["mercredi", "Wednesday"], ["jeudi", "Thursday"], ["vendredi", "Friday"], ["samedi", "Saturday"], ["dimanche", "Sunday"]] },
          { h: "Lundi or le lundi", p: "Without le, it means one specific day. With le, it means every week on that day.", ex: [["Lundi, je travaille.", "I'm working (this) Monday."], ["Le lundi, je travaille.", "I work on Mondays."]] },
          { h: "Parts of the day", p: "In Quebec, the weekend is usually la fin de semaine. In France, it's le week-end.", ex: [["le matin", "the morning"], ["l'après-midi", "the afternoon"], ["le soir", "the evening"], ["la nuit", "the night"], ["aujourd'hui", "today"], ["hier", "yesterday"], ["la fin de semaine", "the weekend (Quebec)"]] }
        ],
        vocab: [["lundi", "Monday"], ["mardi", "Tuesday"], ["mercredi", "Wednesday"], ["jeudi", "Thursday"], ["vendredi", "Friday"], ["samedi", "Saturday"], ["dimanche", "Sunday"], ["le matin", "the morning"], ["le soir", "the evening"], ["aujourd'hui", "today"], ["la fin de semaine", "the weekend (Quebec)"]],
        questions: [
          { id: "q-m3-l3-1", type: "mc", topic: "Days", prompt: "Which day comes after mardi?", options: ["mercredi", "jeudi", "lundi", "samedi"], answer: "mercredi", why: "Lundi, mardi, mercredi." },
          { id: "q-m3-l3-2", type: "translate", topic: "Days", prompt: "Write in French: Friday", accepted: ["vendredi"], why: "Friday is vendredi." },
          { id: "q-m3-l3-3", type: "translate", topic: "Days", prompt: "Write in French: Sunday", accepted: ["dimanche"], why: "Sunday is dimanche." },
          { id: "q-m3-l3-4", type: "mc", topic: "Days", prompt: "Choose: I work on Mondays. (every week)", options: ["Le lundi, je travaille.", "Lundi, je travaille.", "Les lundi, je travaille.", "En lundi, je travaille."], answer: "Le lundi, je travaille.", why: "Le lundi means every Monday." },
          { id: "q-m3-l3-5", type: "mc", topic: "Times of day", prompt: "In Quebec, the weekend is usually…", options: ["la fin de semaine", "la semaine", "le soir", "le dimanche"], answer: "la fin de semaine", why: "Literally, the end of the week." },
          { id: "q-m3-l3-6", type: "fill", topic: "Times of day", prompt: "I work in the morning.", before: "Je travaille le ", after: ".", accepted: ["matin"], strict: false, why: "Le matin means in the morning." },
          { id: "q-m3-l3-7", type: "match", topic: "Times of day", prompt: "Match each word.", pairs: [["aujourd'hui", "today"], ["demain", "tomorrow"], ["le soir", "the evening"], ["la nuit", "the night"]], why: "You'll use these to talk about plans." },
          { id: "q-m3-l3-8", type: "listen", topic: "Days", say: "jeudi", prompt: "Listen. Which day did you hear?", options: ["jeudi", "mardi", "lundi", "samedi"], answer: "jeudi", why: "That was jeudi, Thursday." }
        ]
      },
      {
        id: "m3-l4", icon: "ban", desc: "Ne… pas, jamais, plus, and rien with verbs", title: "Saying no", minutes: 25,
        teach: [
          { h: "Ne … pas goes around the verb", p: "Ne becomes n' before a vowel or a silent h.", ex: [["Je ne travaille pas le dimanche.", "I don't work on Sundays."], ["Je n'habite pas ici.", "I don't live here."]] },
          { h: "Other ways to say no", p: "Swap pas for another word to change the meaning.", ex: [["Je ne mange jamais le matin.", "I never eat in the morning."], ["Il ne travaille plus ici.", "He doesn't work here anymore."], ["Je ne mange rien.", "I'm not eating anything."]] },
          { h: "Un, une, and des become de", p: "After a negative, un, une, and des become de, or d' before a vowel. Le, la, and les don't change.", ex: [["J'ai un outil. → Je n'ai pas d'outil.", "I don't have a tool."], ["Je regarde la télé. → Je ne regarde pas la télé.", "I don't watch TV."]] },
          { h: "Spoken French often drops ne", p: "You'll hear Je travaille pas a lot, especially in Quebec. Keep ne when you write.", ex: [["Je sais pas.", "I don't know. (casual)"]] }
        ],
        vocab: [["ne … pas", "not"], ["ne … jamais", "never"], ["ne … plus", "no longer / not anymore"], ["ne … rien", "nothing"]],
        questions: [
          { id: "q-m3-l4-1", type: "order", topic: "Negation", prompt: "Build: I don't work on Sundays.", words: ["Je", "ne", "travaille", "pas", "le", "dimanche", "."], accepted: ["Je ne travaille pas le dimanche ."], why: "Ne and pas go around the verb." },
          { id: "q-m3-l4-2", type: "fill", topic: "Negation", prompt: "I never eat in the morning.", before: "Je ne mange ", after: " le matin.", accepted: ["jamais"], strict: true, why: "Ne … jamais means never." },
          { id: "q-m3-l4-3", type: "fill", topic: "Negation", prompt: "He doesn't work here anymore.", before: "Il ne travaille ", after: " ici.", accepted: ["plus"], strict: true, why: "Ne … plus means not anymore." },
          { id: "q-m3-l4-4", type: "mc", topic: "Negation", prompt: "Choose: I don't live here.", options: ["Je n'habite pas ici.", "Je ne habite pas ici.", "Je n'habite ici pas.", "Je pas habite ici."], answer: "Je n'habite pas ici.", why: "Ne becomes n' before a silent h." },
          { id: "q-m3-l4-5", type: "mc", topic: "Negation", prompt: "Choose: I don't have a tool.", options: ["Je n'ai pas d'outil.", "Je n'ai pas un outil.", "Je n'ai pas de outil.", "Je n'ai d'outil pas."], answer: "Je n'ai pas d'outil.", why: "Un becomes de, and de becomes d' before a vowel." },
          { id: "q-m3-l4-6", type: "mc", topic: "Negation", prompt: "Choose: I don't watch TV.", options: ["Je ne regarde pas la télé.", "Je ne regarde la télé pas.", "Je regarde ne pas la télé.", "Je ne pas regarde la télé."], answer: "Je ne regarde pas la télé.", why: "La doesn't change after a negative." },
          { id: "q-m3-l4-7", type: "translate", topic: "Negation", prompt: "Write in French: nothing", accepted: ["rien"], why: "Rien means nothing." }
        ]
      },
      {
        id: "m3-l5", icon: "heart", desc: "Aimer, adorer, détester, and j'aime bien", title: "Likes and dislikes", minutes: 25,
        teach: [
          { h: "Aimer, adorer, and détester", p: "These are regular -er verbs.", ex: [["j'aime", "I like / I love"], ["tu aimes", "you like"], ["nous aimons", "we like"], ["j'adore", "I love"], ["je déteste", "I hate"]] },
          { h: "Use le, la, or les after them", p: "When you talk about things in general, French needs the article. Never say J'aime café.", ex: [["J'aime le café.", "I like coffee."], ["J'adore la musique.", "I love music."], ["Je déteste les lundis.", "I hate Mondays."]] },
          { h: "Verb + verb", p: "To say you like doing something, put the second verb in its -er form.", ex: [["J'aime voyager.", "I like to travel."], ["Nous aimons écouter la radio.", "We like listening to the radio."]] },
          { h: "Careful with people", p: "With a person, j'aime means I love them. J'aime bien means you like them as a friend or coworker.", ex: [["J'aime bien Marie.", "I like Marie."], ["J'aime Marie.", "I love Marie."]] }
        ],
        vocab: [["aimer", "to like / to love"], ["adorer", "to love"], ["détester", "to hate"], ["j'aime bien", "I like (milder)"], ["la musique", "music"], ["le sport", "sport"], ["le travail", "work"]],
        questions: [
          { id: "q-m3-l5-1", type: "mc", topic: "Likes", prompt: "Choose: I like coffee.", options: ["J'aime le café.", "J'aime café.", "J'aime du café.", "Je aime le café."], answer: "J'aime le café.", why: "Likes need le, la, or les." },
          { id: "q-m3-l5-2", type: "fill", topic: "Likes", prompt: "We like music.", before: "Nous ", after: " la musique.", accepted: ["aimons"], strict: true, why: "Nous takes -ons: aimons." },
          { id: "q-m3-l5-3", type: "fill", topic: "Likes", prompt: "She hates sport.", before: "Elle ", after: " le sport.", accepted: ["déteste"], strict: true, why: "Elle takes -e: déteste." },
          { id: "q-m3-l5-4", type: "order", topic: "Likes", prompt: "Build: I like to travel.", words: ["J'aime", "voyager", "."], accepted: ["J'aime voyager ."], why: "The second verb stays in its -er form." },
          { id: "q-m3-l5-5", type: "mc", topic: "Likes", prompt: "To say you like a coworker as a friend:", options: ["J'aime bien Marie.", "J'aime Marie.", "J'adore Marie.", "Je déteste Marie."], answer: "J'aime bien Marie.", why: "J'aime with a person means love. J'aime bien is safer." },
          { id: "q-m3-l5-6", type: "translate", topic: "Likes", prompt: "Write in French: I love music.", accepted: ["J'adore la musique.", "J'aime la musique."], why: "J'adore la musique, or j'aime la musique." },
          { id: "q-m3-l5-7", type: "match", topic: "Vocabulary", prompt: "Match each word.", pairs: [["aimer", "to like"], ["adorer", "to love"], ["détester", "to hate"], ["le travail", "work"]], why: "Use these to talk about yourself." }
        ]
      },
      {
        id: "m3-l6", icon: "walk", desc: "Je vais, je fais, and going au travail", title: "Aller and faire", minutes: 25,
        teach: [
          { h: "Aller: to go", p: "Aller is irregular, even though it ends in -er. You already know it from Ça va ?", ex: [["je vais", "I go"], ["tu vas", "you go"], ["il / elle / on va", "he / she / one goes"], ["nous allons", "we go"], ["vous allez", "you go"], ["ils / elles vont", "they go"]] },
          { h: "À + le = au", p: "À and le always join into au. À and les join into aux. À la and à l' don't change.", ex: [["Je vais au travail.", "I'm going to work."], ["Je vais à la banque.", "I'm going to the bank."], ["Je vais à l'usine.", "I'm going to the factory."], ["Je vais à l'atelier.", "I'm going to the workshop."]] },
          { h: "Faire: to do, to make", p: "Faire is also irregular. Vous faites is a common mistake, so learn it well.", ex: [["je fais", "I do"], ["tu fais", "you do"], ["il / elle / on fait", "he / she / one does"], ["nous faisons", "we do"], ["vous faites", "you do"], ["ils / elles font", "they do"], ["Qu'est-ce que tu fais ?", "What are you doing?"], ["Je fais du sport.", "I play sports."]] }
        ],
        vocab: [["aller", "to go"], ["faire", "to do / to make"], ["l'usine", "the factory"], ["l'atelier", "the workshop"], ["la banque", "the bank"]],
        questions: [
          { id: "q-m3-l6-1", type: "fill", topic: "Aller", prompt: "I'm going to work.", before: "Je ", after: " au travail.", accepted: ["vais"], strict: true, why: "Je goes with vais." },
          { id: "q-m3-l6-2", type: "fill", topic: "Aller", prompt: "We're going to the bank.", before: "Nous ", after: " à la banque.", accepted: ["allons"], strict: true, why: "Nous goes with allons." },
          { id: "q-m3-l6-3", type: "fill", topic: "Aller", prompt: "They're going to the factory.", before: "Ils ", after: " à l'usine.", accepted: ["vont"], strict: true, why: "Ils goes with vont." },
          { id: "q-m3-l6-4", type: "mc", topic: "Aller", prompt: "Choose: I'm going to the workshop.", options: ["Je vais à l'atelier.", "Je vais au l'atelier.", "Je vais à le atelier.", "Je va à l'atelier."], answer: "Je vais à l'atelier.", why: "Before a vowel, use à l'." },
          { id: "q-m3-l6-5", type: "mc", topic: "Aller", prompt: "à + le travail = ?", options: ["au travail", "à le travail", "aux travail", "à la travail"], answer: "au travail", why: "À and le always join into au." },
          { id: "q-m3-l6-6", type: "fill", topic: "Faire", prompt: "What are you doing? (formal)", before: "Qu'est-ce que vous ", after: " ?", accepted: ["faites"], strict: true, why: "Vous goes with faites, not faisez." },
          { id: "q-m3-l6-7", type: "fill", topic: "Faire", prompt: "I play sports.", before: "Je ", after: " du sport.", accepted: ["fais"], strict: true, why: "Je goes with fais." },
          { id: "q-m3-l6-8", type: "listen", topic: "Faire", say: "ils font", prompt: "Listen. What did you hear?", options: ["ils font", "ils vont", "il fait", "il va"], answer: "ils font", why: "Font, with an f, is faire. Vont, with a v, is aller." }
        ]
      },
      {
        id: "m3-l7", icon: "test", isTest: true, desc: "Mixed questions from all six lessons", title: "Module test", minutes: 25,
        teach: [{ h: "Show what you know", p: "This test mixes all six lessons in this module. You pass with 80%. Wrong answers go to your mistake book." }],
        vocab: [],
        questions: [
          { id: "q-m3-l7-1", type: "fill", topic: "-er verbs", prompt: "Do you speak French? (friend)", before: "Tu ", after: " français ?", accepted: ["parles"], strict: true, why: "Tu takes -es: parles." },
          { id: "q-m3-l7-2", type: "fill", topic: "Spelling changes", prompt: "We travel to France.", before: "Nous ", after: " en France.", accepted: ["voyageons"], strict: true, why: "Voyager keeps the e: voyageons." },
          { id: "q-m3-l7-3", type: "mc", topic: "Days", prompt: "Choose: Every Saturday, I go to the bank.", options: ["Le samedi, je vais à la banque.", "Samedi, je va à la banque.", "Le samedi, je vais au banque.", "Les samedi, je vais à la banque."], answer: "Le samedi, je vais à la banque.", why: "Le samedi means every Saturday, and banque takes à la." },
          { id: "q-m3-l7-4", type: "order", topic: "Negation", prompt: "Build: He doesn't work here anymore.", words: ["Il", "ne", "travaille", "plus", "ici", "."], accepted: ["Il ne travaille plus ici ."], why: "Ne and plus go around the verb." },
          { id: "q-m3-l7-5", type: "mc", topic: "Negation", prompt: "Choose: She doesn't have friends.", options: ["Elle n'a pas d'amis.", "Elle n'a pas des amis.", "Elle n'a pas de amis.", "Elle ne pas a d'amis."], answer: "Elle n'a pas d'amis.", why: "Des becomes de, then d' before a vowel." },
          { id: "q-m3-l7-6", type: "fill", topic: "Likes", prompt: "I like music.", before: "J'aime ", after: " musique.", accepted: ["la"], strict: true, why: "Likes need the article: la musique." },
          { id: "q-m3-l7-7", type: "fill", topic: "Aller", prompt: "Are you going to work? (formal)", before: "Vous ", after: " au travail ?", accepted: ["allez"], strict: true, why: "Vous goes with allez." },
          { id: "q-m3-l7-8", type: "fill", topic: "Faire", prompt: "They play sports.", before: "Ils ", after: " du sport.", accepted: ["font"], strict: true, why: "Ils goes with font." },
          { id: "q-m3-l7-9", type: "translate", topic: "Days", prompt: "Write in French: Wednesday", accepted: ["mercredi"], why: "Wednesday is mercredi." },
          { id: "q-m3-l7-10", type: "listen", topic: "Negation", say: "Je ne mange jamais le matin.", prompt: "Listen. What did you hear?", options: ["Je ne mange jamais le matin.", "Je mange le matin.", "Je ne mange pas le matin.", "Je ne mange jamais le soir."], answer: "Je ne mange jamais le matin.", why: "Jamais means never." }
        ]
      }
    ]
  };

  C.order = ["a1-u1", "a1-u2", "a1-u3"];
  C.skills.push(
    { skill: "Speaking", title: "Talk about your week", task: "Say out loud which days you work, what you do in the evening, and one thing you like. Use Le lundi, je travaille, Le soir, je… and J'aime…" },
    { skill: "Writing", title: "Write about your day", task: "Write four sentences about a normal day: when you start work, what you use, where you go, and one thing you don't do.", writing: true },
    { skill: "Listening", title: "Listen and repeat", task: "Tap each line, then repeat it out loud. Try it at a slower voice speed first.", lines: ["Où est-ce que tu habites ?", "J'habite au Canada.", "Le samedi, je fais du sport."] }
  );
})(window.COURSE);
