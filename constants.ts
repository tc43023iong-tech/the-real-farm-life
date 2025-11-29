
import { PhonicsRule, StorySegment, VocabularyWord, WarmUpQuestion } from "./types";

export const STORY_DATA: StorySegment[] = [
  {
    id: "s1",
    type: "narrative",
    text: "Jacky and his family are making plans for an outing (郊遊) 🎒 on Saturday.",
    chinese: "Jacky 和他的家人正在計劃週六的郊遊。"
  },
  {
    id: "s2",
    speaker: "Family",
    type: "dialogue",
    text: "What should we do on Saturday? 📅",
    chinese: "我們週六應該做什麼？"
  },
  {
    id: "s3",
    speaker: "Mum",
    type: "dialogue",
    text: "Let's go to the beach (海灘) 🏖️. I want to go swimming 🏊‍♀️.",
    chinese: "我們去海灘吧。我想去游泳。"
  },
  {
    id: "s4",
    speaker: "Brother",
    type: "dialogue",
    text: "Good idea! I want to look at shells (貝殼) 🐚 and build a sandcastle (沙堡) 🏰.",
    chinese: "好主意！我想去看貝殼和堆沙堡。"
  },
  {
    id: "s5",
    speaker: "Jacky",
    type: "dialogue",
    text: "I want to stay home 🏠 because I want to play my new game, Farm Life 🎮. I can build my own farm. I can feed animals 🐷, pick fruit (水果) 🍎 and ride horses 🐎!",
    chinese: "我想待在家裡，因為我想玩我的新遊戲《農場生活》。我可以建自己的農場。我可以餵動物、摘水果和騎馬！"
  },
  {
    id: "s6",
    speaker: "Sister",
    type: "dialogue",
    text: "Boo! 👎 😒",
    chinese: "噓！(反對的聲音)"
  },
  {
    id: "s7",
    speaker: "Sister",
    type: "dialogue",
    text: "Double boo! 👎👎 😒😒",
    chinese: "雙重噓！"
  },
  {
    id: "s8",
    speaker: "Dad",
    type: "dialogue",
    text: "I have an idea 💡. Let's go to a real farm (農場) 🚜.",
    chinese: "我有個主意。我們去真正的農場吧。"
  },
  {
    id: "s9",
    speaker: "Family",
    type: "dialogue",
    text: "Sounds like fun! 🤩",
    chinese: "聽起來很有趣！"
  },
  {
    id: "s10",
    speaker: "Jacky",
    type: "dialogue",
    text: "Triple boo! 👎👎👎 😒😒😒",
    chinese: "三重噓！"
  },
  {
    id: "s11",
    type: "narrative",
    text: "On Saturday, Dad says, 'Leave your phone 📱 at home please, Jacky.'",
    chinese: "週六，爸爸說：「Jacky，請把你的手機留在家裡。」"
  },
  {
    id: "s12",
    speaker: "Jacky",
    type: "dialogue",
    text: "'I don't want to go to a farm because it's boring (無聊) 🥱!' says Jacky.",
    chinese: "Jacky 說：「我不想去農場，因為那很無聊！」"
  },
  {
    id: "s13",
    speaker: "Dad",
    type: "dialogue",
    text: "'Come on! Let's go!' Dad says.",
    chinese: "爸爸說：「來吧！我們走！」"
  },
  {
    id: "s14",
    type: "narrative",
    text: "At the farm, the family go on a tour. First, they feed cows 🐄. Jacky feels the cows' wet tongue (舌頭) 👅 on his hands.",
    chinese: "在農場，家人進行參觀。首先，他們餵牛。Jacky 感覺到牛濕濕的舌頭在他手上。"
  },
  {
    id: "s15",
    type: "narrative",
    text: "Then, they pick and eat apples 🍎. The apples are fresh (新鮮) ✨ and sweet.",
    chinese: "然後，他們摘蘋果吃。蘋果又新鮮又甜。"
  },
  {
    id: "s16",
    type: "narrative",
    text: "Next, they ride horses 🐎. Finally, they have a barbecue (燒烤) 🍖. The chicken wings 🍗 and sweet potatoes 🍠 are yummy!",
    chinese: "接著，他們騎馬。最後，他們烤肉。雞翅和番薯真好吃！"
  },
  {
    id: "s17",
    speaker: "Mum",
    type: "dialogue",
    text: "'Do you still want to play Farm Life?' Mum asks.",
    chinese: "媽媽問：「你還想玩《農場生活》嗎？」"
  },
  {
    id: "s18",
    speaker: "Jacky",
    type: "dialogue",
    text: "'No way! 🙅‍♂️' Jacky says. 'Can we come again next weekend?'",
    chinese: "Jacky 說：「才不要！我們下週末可以再來嗎？」"
  },
];

export const VOCABULARY_DATA: VocabularyWord[] = [
  { 
    word: "boo", 
    emoji: "👎",
    phonetic: "/buː/", 
    chinese: "噓! (喝倒彩/不贊同)", 
    example: "People say 'Boo!' when they don't like something.",
    image: "https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "outing", 
    emoji: "🎒",
    phonetic: "/ˈaʊtɪŋ/", 
    chinese: "郊遊", 
    example: "We plan an outing to the park.",
    image: "https://images.unsplash.com/photo-1596464716127-f9a0859b4afd?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "sandcastle", 
    emoji: "🏰",
    phonetic: "/ˈsændˌkæsəl/", 
    chinese: "沙堡", 
    example: "I build a sandcastle on the beach.",
    image: "https://images.unsplash.com/photo-1599597276711-2d7fd5a62f52?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "beach", 
    emoji: "🏖️",
    phonetic: "/biːtʃ/", 
    chinese: "海灘", 
    example: "The sand is hot.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "shells", 
    emoji: "🐚",
    phonetic: "/ʃɛlz/", 
    chinese: "貝殼", 
    example: "Look at this pretty shell.",
    image: "https://images.unsplash.com/photo-1596463059283-da2572b83981?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "tongue", 
    emoji: "👅",
    phonetic: "/tʌŋ/", 
    chinese: "舌頭", 
    example: "The cow has a long tongue.",
    image: "https://images.unsplash.com/photo-1616428359216-24c5222956f1?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "barbecue", 
    emoji: "🍖",
    phonetic: "/ˈbɑːrbɪkjuː/", 
    chinese: "燒烤 (BBQ)", 
    example: "We eat chicken wings at the barbecue.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "boring", 
    emoji: "🥱",
    phonetic: "/ˈbɔːrɪŋ/", 
    chinese: "無聊的", 
    example: "This game is not boring, it is fun!",
    image: "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "fresh", 
    emoji: "✨",
    phonetic: "/freʃ/", 
    chinese: "新鮮的", 
    example: "The apples are fresh.",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "farm", 
    emoji: "🚜",
    phonetic: "/fɑːrm/", 
    chinese: "農場", 
    example: "The animals live on the farm.",
    image: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "fruit", 
    emoji: "🍎",
    phonetic: "/fruːt/", 
    chinese: "水果", 
    example: "Apples and oranges are fruit.",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=400"
  },
  
  // Warm Up Specific Phrases
  { 
    word: "plant vegetables", 
    emoji: "🥕",
    phonetic: "/plænt ˈvɛdʒtəbəlz/", 
    chinese: "種植蔬菜", 
    example: "Farmers plant vegetables.",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "pick fruit", 
    emoji: "🍇",
    phonetic: "/pɪk fruːt/", 
    chinese: "摘水果", 
    example: "Let's pick fruit from the tree.",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "feed animals", 
    emoji: "🐄",
    phonetic: "/fiːd ˈænɪməlz/", 
    chinese: "餵動物", 
    example: "I like to feed animals.",
    image: "https://images.unsplash.com/photo-1534981146460-70803c407c57?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "ride a horse", 
    emoji: "🏇",
    phonetic: "/raɪd ə hɔːrs/", 
    chinese: "騎馬", 
    example: "Can you ride a horse?",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "build a sandcastle", 
    emoji: "🏖️",
    phonetic: "/bɪld ə ˈsændˌkæsəl/", 
    chinese: "堆沙堡", 
    example: "We build a sandcastle on the beach.",
    image: "https://images.unsplash.com/photo-1599597276711-2d7fd5a62f52?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "look at shells", 
    emoji: "🐚",
    phonetic: "/lʊk æt ʃɛlz/", 
    chinese: "看貝殼", 
    example: "I look at shells in the sand.",
    image: "https://images.unsplash.com/photo-1596463059283-da2572b83981?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "go swimming", 
    emoji: "🏊",
    phonetic: "/ɡoʊ ˈswɪmɪŋ/", 
    chinese: "去游泳", 
    example: "I want to go swimming in the sea.",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "take photos", 
    emoji: "📸",
    phonetic: "/teɪk ˈfoʊtoʊz/", 
    chinese: "拍照", 
    example: "Mum likes to take photos.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "have a picnic", 
    emoji: "🧺",
    phonetic: "/hæv ə ˈpɪknɪk/", 
    chinese: "去野餐", 
    example: "We have a picnic in the park.",
    image: "https://images.unsplash.com/photo-1592881269389-c4547902d33b?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "go camping", 
    emoji: "⛺",
    phonetic: "/ɡoʊ ˈkæmpɪŋ/", 
    chinese: "去露營", 
    example: "We go camping in the holiday.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "have a barbecue", 
    emoji: "🔥",
    phonetic: "/hæv ə ˈbɑːrbɪkjuː/", 
    chinese: "去燒烤", 
    example: "Let's have a barbecue tonight.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400"
  },
  
  // Phonics Words - ENSURING ALL HAVE IMAGES
  { 
    word: "park", 
    emoji: "🏞️",
    phonetic: "/pɑːrk/", 
    chinese: "公園", 
    example: "We play in the park.",
    image: "https://images.unsplash.com/photo-1571216521361-417c8b073289?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "start", 
    emoji: "🏁",
    phonetic: "/stɑːrt/", 
    chinese: "開始", 
    example: "Press the button to start.",
    image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "meat", 
    emoji: "🥩",
    phonetic: "/miːt/", 
    chinese: "肉", 
    example: "I like to eat meat.",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "clean", 
    emoji: "🧹",
    phonetic: "/kliːn/", 
    chinese: "清潔", 
    example: "My room is clean.",
    image: "https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "cow", 
    emoji: "🐄",
    phonetic: "/kaʊ/", 
    chinese: "母牛", 
    example: "The cow says moo.",
    image: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "now", 
    emoji: "⏱️",
    phonetic: "/naʊ/", 
    chinese: "現在", 
    example: "Do it now.",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "eat", 
    emoji: "🍽️",
    phonetic: "/iːt/", 
    chinese: "吃", 
    example: "I eat an apple.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "how", 
    emoji: "❓",
    phonetic: "/haʊ/", 
    chinese: "如何", 
    example: "How are you?",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "brown", 
    emoji: "🟤",
    phonetic: "/braʊn/", 
    chinese: "棕色", 
    example: "The bear is brown.",
    image: "https://images.unsplash.com/photo-1564600982-629235e13028?auto=format&fit=crop&q=80&w=400"
  }
];

export const PHONICS_DATA: PhonicsRule[] = [
  {
    symbol: "ar",
    soundName: "/ɑː/",
    description: "Open your mouth wide and say 'Ah'.",
    examples: ["Farm 🚜", "Park 🏞️", "Start 🏁", "Barbecue 🍖"] 
  },
  {
    symbol: "ea",
    soundName: "/iː/",
    description: "Smile big and make a long 'E' sound.",
    examples: ["Beach 🏖️", "Meat 🥩", "Clean 🧹", "Eat 🍽️"]
  },
  {
    symbol: "ow",
    soundName: "/aʊ/",
    description: "Like when you get hurt: 'Ow!'",
    examples: ["Cow 🐄", "Now ⏱️", "How ❓", "Brown 🟤"]
  }
];

export const WARMUP_QUESTIONS: WarmUpQuestion[] = [
  {
    id: "wq1",
    question: "Do you like playing games?",
    chineseQuestion: "你喜歡玩遊戲嗎？",
    answers: [
      { text: "Yes, I love games!", icon: "🎮" },
      { text: "No, I like sports.", icon: "⚽" },
      { text: "I like reading books.", icon: "📚" },
      { text: "I like watching TV.", icon: "📺" },
      { text: "I like drawing.", icon: "🎨" },
      { text: "I like cooking.", icon: "🍳" }
    ]
  },
  {
    id: "wq2",
    question: "Have you been to a farm?",
    chineseQuestion: "你有去過農場嗎？",
    answers: [
      { text: "Yes, I have!", icon: "🚜" },
      { text: "No, never.", icon: "❌" },
      { text: "I want to go!", icon: "🤩" },
      { text: "I saw a cow there!", icon: "🐄" },
      { text: "It was smelly!", icon: "🤢" },
      { text: "I picked strawberries!", icon: "🍓" }
    ]
  }
];

export const HARD_WORDS = [
  "plant vegetables",
  "pick fruit",
  "feed animals",
  "ride a horse",
  "build a sandcastle",
  "look at shells",
  "go swimming",
  "take photos",
  "have a picnic",
  "go camping",
  "have a barbecue"
];
