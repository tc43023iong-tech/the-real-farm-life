
import { PhonicsRule, StorySegment, VocabularyWord, WarmUpQuestion, InlineQuestion } from "./types";

export const STORY_QUESTIONS: Record<string, InlineQuestion> = {
  "s1": {
    question: "When is the outing? (他們星期幾出去郊遊?)",
    options: ["Saturday", "Sunday", "Monday", "Friday"],
    correctAnswer: "Saturday"
  },
  "s3": {
    question: "What does Mum want to do? (媽媽想做什麼?)",
    options: ["Go swimming", "Go hiking", "Watch TV", "Sleep"],
    correctAnswer: "Go swimming"
  },
  "s4": {
    question: "What does Sister want to do? (姊姊想做什麼?)",
    options: ["Build a sandcastle", "Play football", "Eat ice cream", "Read books"],
    correctAnswer: "Build a sandcastle"
  },
  "s5": {
    question: "What does Jacky want to do? (Jacky 想做什麼?)",
    options: ["Play Farm Life", "Go to school", "Ride a real horse", "Swim"],
    correctAnswer: "Play Farm Life"
  },
  "s7": {
    question: "Do Mum and Sister like Jacky's idea? (她們喜歡 Jacky 的想法嗎?)",
    options: ["No", "Yes", "Maybe", "They love it"],
    correctAnswer: "No"
  },
  "s8": {
    question: "What does Dad suggest? (爸爸建議做什麼?)",
    options: ["Go to a real farm", "Go to the cinema", "Stay home", "Go to the park"],
    correctAnswer: "Go to a real farm"
  },
  "s10": {
    question: "Does Jacky like Dad's idea? (Jacky 喜歡這個主意嗎?)",
    options: ["No", "Yes", "He is happy", "He is excited"],
    correctAnswer: "No"
  },
  "s12": {
    question: "How does Jacky feel about the farm? (Jacky 覺得農場怎麼樣?)",
    options: ["Boring", "Fun", "Exciting", "Scary"],
    correctAnswer: "Boring"
  },
  "s14b": {
    question: "What did they do first? (他們首先做了什麼?)",
    options: ["Feed cows", "Eat apples", "Ride horses", "Sleep"],
    correctAnswer: "Feed cows"
  },
  "s15": {
    question: "What did they do then? How were the apples? (他們接著做了什麼？蘋果味道如何？)",
    options: ["Picked apples, fresh and sweet", "Ate bananas, yummy", "Drank water, cold", "Fed cows, wet"],
    correctAnswer: "Picked apples, fresh and sweet"
  },
  "s16a": {
    question: "What did they do next? (他們然後做了什麼？)",
    options: ["Ride horses", "Swim", "Run", "Drive"],
    correctAnswer: "Ride horses"
  },
  "s16b": {
    question: "What did they do finally? What did they eat? (他們最後做了什麼？吃了什麼？)",
    options: ["BBQ (chicken wings & sweet potatoes)", "Pizza", "Burger", "Salad"],
    correctAnswer: "BBQ (chicken wings & sweet potatoes)"
  },
  "s18": {
    question: "How does Jacky feel at the end? (Jacky 最後覺得怎麼樣？)",
    options: ["He loves the farm", "He hates it", "He is sad", "He is angry"],
    correctAnswer: "He loves the farm"
  }
};

export const STORY_DATA: StorySegment[] = [
  {
    id: "s1",
    type: "narrative",
    text: "Jacky and his family are making plans (計畫) for an outing (郊遊) 🎒 on Saturday.",
    chinese: "Jacky 和他的家人正在計劃週六的郊遊。"
  },
  {
    id: "s2",
    speaker: "Dad",
    type: "dialogue",
    side: "left",
    text: "What should (應該) we do on Saturday? 📅",
    chinese: "我們週六應該做什麼？"
  },
  {
    id: "s3",
    speaker: "Mum",
    type: "dialogue",
    side: "right",
    text: "Let's go to the beach 🏖️.|I want to go swimming (去游泳) 🏊‍♀️.",
    chinese: "我們去海灘吧。|我想去游泳。"
  },
  {
    id: "s4",
    speaker: "Sister",
    type: "dialogue",
    side: "left",
    text: "Good idea!|I want to look at shells (觀賞貝殼) 🐚 and build (建造) a sandcastle (沙堡) 🏰.",
    chinese: "好主意！|我想去看貝殼和堆沙堡。"
  },
  {
    id: "s4_new",
    speaker: "Dad",
    type: "dialogue",
    side: "right",
    text: "Jacky?",
    chinese: "Jacky 呢？"
  },
  {
    id: "s5",
    speaker: "Jacky",
    type: "dialogue",
    side: "left",
    text: "I want to stay home 🏠 because I want to play my new game, Farm Life 🎮.|I can build (建造) my own (自己的) farm.|I can feed animals (餵飼動物) 🐷, pick fruit (摘水果) 🍎 and ride horses (騎馬) 🐎!",
    chinese: "我想待在家裡，因為我想玩我的新遊戲《農場生活》。|我可以建自己的農場。|我可以餵動物、摘水果和騎馬！"
  },
  {
    id: "s6",
    speaker: "Mum",
    type: "dialogue",
    side: "right",
    text: "Boo! 👎 😒",
    chinese: "噓！(反對的聲音)"
  },
  {
    id: "s7",
    speaker: "Sister",
    type: "dialogue",
    side: "left",
    text: "Double boo! 👎👎 😒😒",
    chinese: "雙重噓！"
  },
  {
    id: "s8",
    speaker: "Dad",
    type: "dialogue",
    side: "right",
    text: "I have an idea 💡.|Let's go to a real (真實的) farm 🚜.",
    chinese: "我有個主意。|我們去真正的農場吧。"
  },
  {
    id: "s9",
    speaker: "Mum",
    type: "dialogue",
    side: "left",
    text: "Sounds (聽起來) 👂 like fun! 🤩",
    chinese: "聽起來很有趣！"
  },
  {
    id: "s10",
    speaker: "Jacky",
    type: "dialogue",
    side: "right", 
    text: "Triple (三倍) 3️⃣ boo! 👎👎👎 😒😒😒",
    chinese: "三重噓！"
  },
  {
    id: "s11",
    type: "narrative",
    text: "On Saturday, Dad says, 'Leave (留下) your phone (電話) 📱 at home please, Jacky.'",
    chinese: "週六，爸爸說：「Jacky，請把你的手機留在家裡。」"
  },
  {
    id: "s12",
    speaker: "Jacky",
    type: "dialogue",
    side: "left",
    text: "'I don't want to go to a farm because it's boring (無聊) 🥱!' says Jacky.",
    chinese: "Jacky 說：「我不想去農場，因為那很無聊！」"
  },
  {
    id: "s13",
    speaker: "Dad",
    type: "dialogue",
    side: "right",
    text: "'Come on! Let's go!' Dad says.",
    chinese: "爸爸說：「來吧！我們走！」"
  },
  {
    id: "s14a",
    type: "narrative",
    text: "At the farm, the family go on a tour (參觀).",
    chinese: "在農場，家人進行參觀。"
  },
  {
    id: "s14b",
    type: "narrative",
    text: "First, they feed cows 🐄.|Jacky feels (觸摸) the cows' wet (濕的) tongue (舌頭) 👅 on his hands.",
    chinese: "首先，他們餵牛。|Jacky 感覺到牛濕濕的舌頭在他手上。"
  },
  {
    id: "s15",
    type: "narrative",
    text: "Then, they pick and eat apples 🍎.|The apples are fresh (新鮮) ✨ and sweet.",
    chinese: "然後，他們摘蘋果吃。|蘋果又新鮮又甜。"
  },
  {
    id: "s16a",
    type: "narrative",
    text: "Next, they ride horses 🐎.",
    chinese: "接著，他們騎馬。"
  },
  {
    id: "s16b",
    type: "narrative",
    text: "Finally, they have a barbecue (燒烤) 🍖.|The chicken wings 🍗 and sweet potatoes (番薯) 🍠 are yummy!",
    chinese: "最後，他們烤肉。|雞翅和番薯真好吃！"
  },
  {
    id: "s17",
    speaker: "Mum",
    type: "dialogue",
    side: "left",
    text: "'Do you still want to play Farm Life?' Mum asks.",
    chinese: "媽媽問：「你還想玩《農場生活》嗎？」"
  },
  {
    id: "s18",
    speaker: "Jacky",
    type: "dialogue",
    side: "right",
    text: "'No way (絕不) 🙅‍♂️!' Jacky says. 'Can we come again next weekend (週末)?'",
    chinese: "Jacky 說：「才不要！我們下週末可以再來嗎？」"
  },
];

export const VOCABULARY_DATA: VocabularyWord[] = [
  // --- 1-12 Outdoor Activities (User Provided) ---
  { 
    word: "outdoor activities", 
    emoji: "🏞️",
    phonetic: "/ˌaʊtˈdɔːr ækˈtɪvətiz/", 
    chinese: "戶外活動 (activity)", 
    example: "We love outdoor activities.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "plant vegetables", 
    emoji: "🥕",
    phonetic: "/plɑːnt ˈvedʒtəbəlz/", 
    chinese: "種植蔬菜 (vegetable)", 
    example: "We plant vegetables in the garden.",
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
    phonetic: "/fiːd ˈænəməlz/", 
    chinese: "餵飼動物 (animal)", 
    example: "I like to feed animals.",
    image: "https://images.unsplash.com/photo-1534981146460-70803c407c57?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "ride a horse", 
    emoji: "🏇",
    phonetic: "/raɪd ə hɔːs/", 
    chinese: "騎馬", 
    example: "Can you ride a horse?",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "build a sandcastle", 
    emoji: "🏰",
    phonetic: "/bɪld ə ˈsændˌkɑːsəl/", 
    chinese: "堆沙城堡", 
    example: "We build a sandcastle on the beach.",
    image: "https://images.unsplash.com/photo-1599597276711-2d7fd5a62f52?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "look at shells", 
    emoji: "🐚",
    phonetic: "/lʊk ət ʃelz/", 
    chinese: "觀賞貝殼 (shell)", 
    example: "I look at shells in the sand.",
    image: "https://images.unsplash.com/photo-1596463059283-da2572b83981?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "go swimming", 
    emoji: "🏊",
    phonetic: "/ɡəʊ ˈswɪmɪŋ/", 
    chinese: "去游泳", 
    example: "I want to go swimming in the sea.",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "take photos", 
    emoji: "📸",
    phonetic: "/teɪk ˈfəʊtəʊz/", 
    chinese: "拍照 (photo)", 
    example: "Mum likes to take photos.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "have a picnic", 
    emoji: "🧺",
    phonetic: "/həv ə ˈpɪknɪk/", 
    chinese: "野餐", 
    example: "We have a picnic in the park.",
    image: "https://images.unsplash.com/photo-1592881269389-c4547902d33b?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "go camping", 
    emoji: "⛺",
    phonetic: "/ɡəʊ ˈkæmpɪŋ/", 
    chinese: "去露營", 
    example: "We go camping in the holiday.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "have a barbecue", 
    emoji: "🔥",
    phonetic: "/həv ə ˈbɑːbɪkjuː/", 
    chinese: "燒烤", 
    example: "Let's have a barbecue tonight.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400"
  },

  // --- Specific Words (User Provided) ---
  { 
    word: "real", 
    emoji: "✨",
    phonetic: "/riːəl/", 
    chinese: "真實的", 
    example: "This is a real farm.",
    image: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "plans", 
    emoji: "🗺️",
    phonetic: "/plænz/", 
    chinese: "計畫", 
    example: "We are making plans.",
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "outing", 
    emoji: "🎒",
    phonetic: "/ˈaʊtɪŋ/", 
    chinese: "郊遊", 
    example: "We plan an outing.",
    image: "https://images.unsplash.com/photo-1596464716127-f9a0859b4afd?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "leave", 
    emoji: "🚪",
    phonetic: "/liːv/", 
    chinese: "留下", 
    example: "Leave your phone.",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "feels", 
    emoji: "🤚",
    phonetic: "/fiːlz/", 
    chinese: "觸摸", 
    example: "He feels the fur.",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "no way", 
    emoji: "🙅‍♂️",
    phonetic: "/nəʊ weɪ/", 
    chinese: "決不", 
    example: "No way!",
    image: "https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "weekend", 
    emoji: "🗓️",
    phonetic: "/ˈwiːkend/", 
    chinese: "週末", 
    example: "Have a nice weekend.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "use", 
    emoji: "🛠️",
    phonetic: "/juːz/", 
    chinese: "使用", 
    example: "Use a pen.",
    image: "https://images.unsplash.com/photo-1584697964400-2af6a2f6204c?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "busy", 
    emoji: "🐝",
    phonetic: "/ˈbɪzi/", 
    chinese: "忙碌", 
    example: "I am busy.",
    image: "https://images.unsplash.com/photo-1513258496098-3681207605b6?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "phone", 
    emoji: "📱",
    phonetic: "/fəʊn/", 
    chinese: "電話", 
    example: "Answer the phone.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "sunrise", 
    emoji: "🌅",
    phonetic: "/ˈsʌnraɪz/", 
    chinese: "日出", 
    example: "Look at the sunrise.",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "sunset", 
    emoji: "🌇",
    phonetic: "/ˈsʌnset/", 
    chinese: "日落", 
    example: "The sunset is pretty.",
    image: "https://images.unsplash.com/photo-1472120435266-53112dc2de39?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "goat", 
    emoji: "🐐",
    phonetic: "/ɡəʊt/", 
    chinese: "山羊", 
    example: "The goat has horns.",
    image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "boo", 
    emoji: "👎",
    phonetic: "/buː/", 
    chinese: "噓!", 
    example: "Boo!",
    image: "https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "tongue", 
    emoji: "👅",
    phonetic: "/tʌŋ/", 
    chinese: "舌頭", 
    example: "My tongue is red.",
    image: "https://images.unsplash.com/photo-1616428359216-24c5222956f1?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "boring", 
    emoji: "🥱",
    phonetic: "/ˈbɔːrɪŋ/", 
    chinese: "無聊的", 
    example: "It is boring.",
    image: "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "sounds", 
    emoji: "👂",
    phonetic: "/saʊndz/", 
    chinese: "聽起來", 
    example: "It sounds good.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "triple", 
    emoji: "3️⃣",
    phonetic: "/ˈtrɪpəl/", 
    chinese: "三倍的", 
    example: "Triple means three.",
    image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=400"
  },
  { 
    word: "sweet potato", 
    emoji: "🍠",
    phonetic: "/swiːt pəˈteɪtəʊ/", 
    chinese: "番薯", 
    example: "Yummy sweet potato.",
    image: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&q=80&w=400"
  },
  // Helpers for interaction - Hidden items to trigger highlighting on parts of phrases
  {
    word: "build",
    emoji: "🔨",
    phonetic: "/bɪld/",
    chinese: "建造",
    example: "Build a house.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
  },
  {
    word: "sandcastle",
    emoji: "🏰",
    phonetic: "/ˈsændˌkæsəl/",
    chinese: "沙堡",
    example: "Sandcastle.",
    image: "https://images.unsplash.com/photo-1599597276711-2d7fd5a62f52?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
  },
  {
    word: "should",
    emoji: "❓",
    phonetic: "/ʃʊd/",
    chinese: "應該",
    example: "You should go.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
  },
  {
    word: "swimming",
    emoji: "🏊‍♀️",
    phonetic: "/ˈswɪmɪŋ/",
    chinese: "游泳",
    example: "I like swimming.",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
  },
  {
    word: "shells",
    emoji: "🐚",
    phonetic: "/ʃelz/",
    chinese: "貝殼",
    example: "Sea shells.",
    image: "https://images.unsplash.com/photo-1596463059283-da2572b83981?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
  },
  {
    word: "own",
    emoji: "🏠",
    phonetic: "/əʊn/",
    chinese: "自己的",
    example: "My own car.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
  },
  {
    word: "animals",
    emoji: "🐄",
    phonetic: "/ˈænɪməlz/",
    chinese: "動物",
    example: "Farm animals.",
    image: "https://images.unsplash.com/photo-1534981146460-70803c407c57?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
  },
  {
    word: "fruit",
    emoji: "🍎",
    phonetic: "/fruːt/",
    chinese: "水果",
    example: "Fresh fruit.",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
  },
  {
    word: "horses",
    emoji: "🐎",
    phonetic: "/ˈhɔːsɪz/",
    chinese: "馬",
    example: "Riding horses.",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
  },
  {
    word: "look",
    emoji: "👀",
    phonetic: "/lʊk/",
    chinese: "看",
    example: "Look at this.",
    image: "https://images.unsplash.com/photo-1627645835237-0743e52b991f?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
  },
  {
    word: "go",
    emoji: "🚶",
    phonetic: "/ɡəʊ/",
    chinese: "去",
    example: "Go out.",
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
  },
  {
    word: "fresh",
    emoji: "✨",
    phonetic: "/freʃ/",
    chinese: "新鮮",
    example: "Fresh fruit.",
    image: "https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
  },
  {
    word: "go on a tour",
    emoji: "🚜",
    phonetic: "/ɡəʊ ɒn ə tʊər/",
    chinese: "去參觀",
    example: "We go on a tour.",
    image: "https://images.unsplash.com/photo-1533552084795-305716e91f6e?auto=format&fit=crop&q=80&w=400",
    hideFromList: true
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
      { text: "I like cooking.", icon: "🍳" },
      { text: "I like music.", icon: "🎵" },
      { text: "I like dancing.", icon: "💃" },
      { text: "I like sleeping.", icon: "😴" },
      { text: "I like swimming.", icon: "🏊" },
      { text: "I like hiking.", icon: "🥾" }
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
      { text: "I picked strawberries!", icon: "🍓" },
      { text: "I rode a horse!", icon: "🐎" },
      { text: "I fed the sheep.", icon: "🐑" },
      { text: "I ate ice cream.", icon: "🍦" },
      { text: "I scared of bugs.", icon: "🐛" },
      { text: "It was too hot.", icon: "☀️" }
    ]
  }
];

// EXCLUDED: boo, tongue, boring, sounds, triple, sweet potato
export const HARD_WORDS = [
  "outdoor activities",
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
  "have a barbecue",
  "real",
  "plans",
  "outing",
  "leave",
  "feels",
  "no way",
  "weekend",
  "use",
  "busy",
  "phone",
  "sunrise",
  "sunset",
  "goat"
];
