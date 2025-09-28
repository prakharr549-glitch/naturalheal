import { slugify } from "./utils";

export type Remedy = {
  id: number;
  slug: string;
  name: string;
  ingredients: string;
  preparation?: string;
  howToUse: string;
};

export type RemedyCategory = {
  id: number;
  slug: string;
  name: string;
  remedies: Remedy[];
};

const rawData = [
  {
    id: 1,
    name: "Cold & Flu Remedies",
    remedies: [
      { id: 1, name: "Ginger Tea", ingredients: "1 tsp fresh grated ginger, 1 cup water, 1 tsp honey", preparation: "Boil water with grated ginger for 5 minutes. Strain the tea.", howToUse: "Add honey when slightly cooled. Drink 2 times a day for cold and sore throat." },
      { id: 2, name: "Tulsi (Holy Basil) Tea", ingredients: "8–10 fresh tulsi leaves, 1 cup water", preparation: "Boil tulsi leaves in water for 5–7 minutes. Strain.", howToUse: "Drink warm daily to fight cold and boost immunity." },
      { id: 3, name: "Steam Inhalation with Eucalyptus", ingredients: "5–6 eucalyptus leaves, 1 bowl of boiling water", preparation: "Boil leaves in water for 5 minutes. Pour into a bowl.", howToUse: "Place your face over the bowl, cover head with a towel, inhale steam for 5–10 minutes to relieve nasal congestion." },
      { id: 4, name: "Black Pepper & Honey", ingredients: "3–4 crushed black peppercorns, 1 tsp honey", preparation: "Mix pepper with honey.", howToUse: "Take 2 times a day to relieve cough and cold." },
      { id: 5, name: "Turmeric Milk (Haldi Doodh)", ingredients: "1 cup milk, ½ tsp turmeric powder", preparation: "Boil milk with turmeric for 2–3 minutes.", howToUse: "Drink warm before bedtime for cold and to strengthen immunity." },
      { id: 6, name: "Clove Water", ingredients: "3–4 cloves, 1 cup water", preparation: "Boil cloves in water for 5–7 minutes. Strain.", howToUse: "Drink warm to reduce fever and cold symptoms." },
      { id: 7, name: "Cinnamon Tea", ingredients: "1 small cinnamon stick, 1 cup water", preparation: "Boil cinnamon in water for 5–10 minutes. Strain.", howToUse: "Drink warm once a day for respiratory relief." },
      { id: 8, name: "Lemon & Honey Drink", ingredients: "Juice of ½ lemon, 1 tsp honey, 1 cup warm water", preparation: "Mix lemon juice and honey in warm water.", howToUse: "Drink in the morning to fight cold and boost immunity." },
      { id: 9, name: "Mustard Oil Chest Massage", ingredients: "2–3 tsp mustard oil", preparation: "Warm the oil slightly.", howToUse: "Massage chest and back for 5–10 minutes to relieve nasal congestion and cold." },
      { id: 10, name: "Garlic in Milk", ingredients: "1–2 garlic cloves, 1 cup milk", preparation: "Boil milk with garlic for 2 minutes. Strain.", howToUse: "Drink once daily to relieve cough and strengthen immunity." },
    ]
  },
  {
    id: 2,
    name: "Digestive Health Remedies",
    remedies: [
      { id: 11, name: "Fennel Seeds (Saunf)", ingredients: "1 tsp fennel seeds", howToUse: "Chew after meals to aid digestion and reduce bloating." },
      { id: 12, name: "Cumin Water (Jeera Water)", ingredients: "1 tsp cumin seeds, 1 cup water", preparation: "Boil cumin seeds in water for 5 minutes. Strain.", howToUse: "Drink warm before or after meals for digestion." },
      { id: 13, name: "Triphala Powder", ingredients: "½–1 tsp triphala powder, 1 cup warm water", howToUse: "Mix powder in warm water and drink at night for better digestion and bowel movement." },
      { id: 14, name: "Ginger & Jaggery", ingredients: "1 tsp grated ginger, small piece of jaggery", howToUse: "Chew together after meals to reduce gas and acidity." },
      { id: 15, name: "Ajwain Water", ingredients: "1 tsp ajwain seeds, 1 cup water", preparation: "Boil seeds in water for 5 minutes. Strain.", howToUse: "Drink warm to relieve bloating, gas, and indigestion." },
      { id: 16, name: "Amla (Indian Gooseberry) Juice", ingredients: "2 tsp fresh amla juice, ½ cup water", howToUse: "Drink daily in the morning to improve digestion and boost immunity." },
      { id: 17, name: "Coriander Water", ingredients: "1 tsp coriander seeds, 1 cup water", preparation: "Boil seeds in water for 5 minutes. Strain.", howToUse: "Drink warm to help with digestion and stomach discomfort." },
      { id: 18, name: "Buttermilk with Black Salt", ingredients: "1 cup buttermilk, pinch of black salt", howToUse: "Mix and drink after meals to aid digestion." },
      { id: 19, name: "Raw Papaya Paste", ingredients: "Small piece of raw papaya", howToUse: "Eat 1 tsp paste or chew small pieces to reduce bloating and indigestion." },
      { id: 20, name: "Mint Leaves Infusion", ingredients: "5–6 mint leaves, 1 cup water", preparation: "Boil leaves in water for 5 minutes. Strain.", howToUse: "Drink warm to soothe stomach and reduce gas." },
    ]
  },
  {
    id: 3,
    name: "Skin & Hair Remedies",
    remedies: [
        { id: 21, name: "Turmeric Paste", ingredients: "1 tsp turmeric powder, a few drops of water", preparation: "Mix to make a paste.", howToUse: "Apply on cuts, wounds, or acne to reduce inflammation and infection." },
        { id: 22, name: "Aloe Vera Gel", ingredients: "Fresh aloe vera leaf", preparation: "Extract gel from leaf.", howToUse: "Apply on burns, wounds, or dry skin for healing and moisturizing." },
        { id: 23, name: "Sandalwood Paste", ingredients: "1 tsp sandalwood powder, few drops rosewater", preparation: "Mix to form a paste.", howToUse: "Apply on face to improve skin glow and reduce pimples." },
        { id: 24, name: "Neem Paste", ingredients: "5–6 neem leaves", preparation: "Grind leaves into a paste.", howToUse: "Apply on acne or infected areas. Leave 15–20 min, then wash." },
        { id: 25, name: "Coconut Oil", ingredients: "2–3 tsp coconut oil", howToUse: "Massage scalp and hair for nourishment and to reduce hair fall." },
        { id: 26, name: "Fenugreek Hair Pack", ingredients: "2 tbsp fenugreek seeds, water", preparation: "Soak overnight. Grind into paste.", howToUse: "Apply on hair 30–40 min, then wash. Promotes hair growth." },
        { id: 27, name: "Lemon Juice", ingredients: "½ lemon", howToUse: "Apply juice on freckles or dark spots. Leave 10–15 min, rinse with water." },
        { id: 28, name: "Rosewater", ingredients: "Fresh rosewater", howToUse: "Spray or dab on face to refresh and tone skin." },
        { id: 29, name: "Gram Flour (Besan) Pack", ingredients: "2 tbsp besan, 1 tsp turmeric, water", preparation: "Mix to form a smooth paste.", howToUse: "Apply on face 15–20 min. Wash with lukewarm water. Brightens skin." },
        { id: 30, name: "Hibiscus Hair Pack", ingredients: "Hibiscus leaves, water", preparation: "Grind leaves into paste.", howToUse: "Apply on scalp and hair 30 min. Wash. Strengthens hair and promotes growth." },
    ]
  },
  {
    id: 4,
    name: "Respiratory & Throat Remedies",
    remedies: [
        { id: 31, name: "Licorice Root Tea", ingredients: "1 tsp dried licorice (mulethi), 1 cup water", preparation: "Boil mulethi in water for 5–7 minutes. Strain.", howToUse: "Drink warm 2 times/day for sore throat and cough." },
        { id: 32, name: "Honey & Ginger Mix", ingredients: "1 tsp ginger juice, 1 tsp honey", howToUse: "Mix and take 2–3 times/day to reduce cough." },
        { id: 33, name: "Turmeric & Black Pepper Steam", ingredients: "Pinch turmeric, pinch black pepper, 1 bowl boiling water", preparation: "Add turmeric and black pepper to boiling water.", howToUse: "Inhale steam 5–10 minutes to clear nasal congestion." },
        { id: 34, name: "Warm Saline Gargle", ingredients: "½ tsp salt, 1 cup warm water", preparation: "Dissolve salt in warm water.", howToUse: "Gargle 2–3 times/day to soothe sore throat." },
        { id: 35, name: "Onion Juice & Honey", ingredients: "1 tsp onion juice, 1 tsp honey", howToUse: "Mix and take daily for cough relief." },
        { id: 36, name: "Clove Oil Chest Massage", ingredients: "2–3 drops clove oil, 1 tsp coconut oil", preparation: "Mix oils.", howToUse: "Massage chest for cough and congestion." },
        { id: 37, name: "Tulsi Leaves & Rock Salt", ingredients: "5–6 tulsi leaves, pinch rock salt", howToUse: "Chew leaves with salt 1–2 times/day to strengthen immunity." },
        { id: 38, name: "Pippali Powder & Honey", ingredients: "½ tsp pippali (long pepper) powder, 1 tsp honey", howToUse: "Take daily to improve respiratory health." },
        { id: 39, name: "Mint & Ginger Steam", ingredients: "5 mint leaves, ½ tsp grated ginger, 1 bowl boiling water", preparation: "Boil leaves and ginger. Pour into a bowl.", howToUse: "Inhale steam 5–10 min to relieve nasal congestion." },
        { id: 40, name: "Black Sesame Seeds", ingredients: "1 tsp roasted black sesame seeds", howToUse: "Chew daily to strengthen lungs and respiratory system." },
    ]
  },
  {
    id: 5,
    name: "Fever & Infections Remedies",
    remedies: [
        { id: 41, name: "Tulsi & Black Pepper Tea", ingredients: "5–6 tulsi leaves, 3–4 black peppercorns, 1 cup water", preparation: "Boil leaves and pepper for 5–7 minutes. Strain.", howToUse: "Drink warm 2 times/day for fever and cold." },
        { id: 42, name: "Turmeric Milk", ingredients: "1 cup milk, ½ tsp turmeric", preparation: "Boil milk with turmeric.", howToUse: "Drink warm daily to fight infections." },
        { id: 43, name: "Giloy Juice", ingredients: "2–3 tsp fresh giloy juice", howToUse: "Take daily to improve immunity." },
        { id: 44, name: "Neem Leaf Decoction", ingredients: "5–6 neem leaves, 1 cup water", preparation: "Boil leaves 5–7 minutes. Strain.", howToUse: "Drink warm for fever and infections." },
        { id: 45, name: "Coriander Seed Water", ingredients: "1 tsp coriander seeds, 1 cup water", preparation: "Boil seeds for 5 minutes. Strain.", howToUse: "Drink warm to fight infections." },
        { id: 46, name: "Fenugreek & Honey Paste", ingredients: "1 tsp fenugreek powder, 1 tsp honey", howToUse: "Take 1–2 times/day for immunity and infection control." },
        { id: 47, name: "Warm Mustard Oil Compress", ingredients: "2–3 tsp mustard oil", preparation: "Warm oil.", howToUse: "Apply on body with cloth to reduce fever and body pain." },
        { id: 48, name: "Pomegranate Rind Powder", ingredients: "½ tsp pomegranate rind powder, ½ cup warm water", howToUse: "Drink for infections and fever reduction." },
        { id: 49, name: "Tulsi & Honey Chew", ingredients: "5–6 tulsi leaves, 1 tsp honey", howToUse: "Chew daily for respiratory health and immunity." },
        { id: 50, name: "Clove Water", ingredients: "3–4 cloves, 1 cup water", preparation: "Boil cloves 5–7 minutes. Strain.", howToUse: "Drink warm to reduce fever and infections." },
    ]
  },
  {
    id: 6,
    name: "Pain & Inflammation Remedies",
    remedies: [
        { id: 51, name: "Ginger Paste", ingredients: "Fresh ginger", preparation: "Grind fresh ginger to paste.", howToUse: "Apply on joints to reduce pain." },
        { id: 52, name: "Turmeric Paste", ingredients: "Turmeric powder, water", preparation: "Mix turmeric + water.", howToUse: "Apply on swollen or inflamed areas." },
        { id: 53, name: "Mustard Oil Massage", ingredients: "Mustard oil", preparation: "Warm oil.", howToUse: "Massage painful muscles or joints." },
        { id: 54, name: "Garlic Paste", ingredients: "Garlic cloves", preparation: "Crush garlic.", howToUse: "Apply or consume to reduce inflammation." },
        { id: 55, name: "Eucalyptus Oil Massage", ingredients: "2–3 drops eucalyptus oil, coconut oil", preparation: "Mix oils.", howToUse: "Massage sore muscles." },
        { id: 56, name: "Ashwagandha Powder", ingredients: "1 tsp ashwagandha powder, warm milk", preparation: "Mix in warm milk.", howToUse: "Drink daily to reduce body pain." },
        { id: 57, name: "Warm Water Soak with Turmeric", ingredients: "½ tsp turmeric, warm water", preparation: "Add to warm water.", howToUse: "Soak affected joint 10–15 min." },
        { id: 58, name: "Fenugreek Poultice", ingredients: "Fenugreek seeds", preparation: "Soak seeds, grind.", howToUse: "Apply on joint for 20 min." },
        { id: 59, name: "Castor Oil Massage", ingredients: "Castor oil", preparation: "Warm castor oil.", howToUse: "Massage affected area daily." },
        { id: 60, name: "Cinnamon Paste", ingredients: "Cinnamon powder, water", preparation: "Mix cinnamon powder + water.", howToUse: "Apply on inflamed areas." },
    ]
  },
  {
    id: 7,
    name: "Eye & Vision Remedies",
    remedies: [
        { id: 61, name: "Triphala Eye Wash", ingredients: "½ tsp triphala powder, 1 cup water", preparation: "Dissolve in 1 cup boiled water (cooled).", howToUse: "Use as eye wash daily." },
        { id: 62, name: "Rosewater", ingredients: "Rosewater", howToUse: "Dab on closed eyes to reduce tiredness." },
        { id: 63, name: "Cucumber Slices", ingredients: "2 cucumber slices", howToUse: "Place on eyes 10 min daily to reduce puffiness." },
        { id: 64, name: "Amla Juice", ingredients: "1–2 tsp amla juice", howToUse: "Take daily to improve vision." },
        { id: 65, name: "Honey & Water Rinse", ingredients: "1 tsp honey, water", preparation: "Mix honey in water.", howToUse: "Rinse eyes gently." },
        { id: 66, name: "Ghee in Eyes", ingredients: "1–2 drops ghee", howToUse: "Use for dry eyes (traditional remedy)." },
        { id: 67, name: "Carrot Juice", ingredients: "1 glass carrot juice", howToUse: "Drink daily for vision health." },
        { id: 68, name: "Bitter Gourd Juice", ingredients: "1–2 tsp bitter gourd juice", howToUse: "Take daily for healthy eyes." },
        { id: 69, name: "Mint Water", ingredients: "Mint-infused water", howToUse: "Rinse eyes with cooled water." },
        { id: 70, name: "Aloe Vera Juice", ingredients: "1–2 tsp aloe vera juice", howToUse: "Take daily for eye health." },
    ]
  },
  {
    id: 8,
    name: "Stress & Sleep Remedies",
    remedies: [
        { id: 71, name: "Ashwagandha Milk", ingredients: "1 tsp powder, warm milk", preparation: "Mix powder in warm milk.", howToUse: "Drink before sleep." },
        { id: 72, name: "Brahmi Tea", ingredients: "1 tsp brahmi, 1 cup water", preparation: "Boil brahmi in water.", howToUse: "Drink warm to calm mind." },
        { id: 73, name: "Warm Milk & Nutmeg", ingredients: "Milk, pinch of nutmeg", preparation: "Boil milk + pinch nutmeg.", howToUse: "Drink before sleep." },
        { id: 74, name: "Lavender Oil Massage", ingredients: "2–3 drops lavender oil", preparation: "Mix in carrier oil.", howToUse: "Massage temples and neck." },
        { id: 75, name: "Meditation & Breathing", ingredients: "None", preparation: "None", howToUse: "Practice deep breathing for 10–15 min daily." },
        { id: 76, name: "Chamomile Tea", ingredients: "1 tsp chamomile, water", preparation: "Boil chamomile in water.", howToUse: "Drink warm." },
        { id: 77, name: "Tulsi Tea", ingredients: "5–6 leaves, water", preparation: "Boil leaves in water.", howToUse: "Drink warm." },
        { id: 78, name: "Shankhpushpi Decoction", ingredients: "1 tsp herb, water", preparation: "Boil herb in water.", howToUse: "Drink warm for mental relaxation." },
        { id: 79, name: "Rose Petals in Warm Water", ingredients: "Rose petals, water", preparation: "Boil petals 5–7 min.", howToUse: "Drink warm to relax." },
        { id: 80, name: "Listening to Flowing Water", ingredients: "None", preparation: "None", howToUse: "Listen for 10–15 min daily to reduce stress." },
    ]
  },
  {
    id: 9,
    name: "Women's Health Remedies",
    remedies: [
        { id: 81, name: "Fenugreek Seeds for Menstrual Cramps", ingredients: "Fenugreek seeds, water", preparation: "Soak seeds in water.", howToUse: "Chew or drink decoction." },
        { id: 82, name: "Turmeric Milk for PMS", ingredients: "1 cup milk, ½ tsp turmeric", preparation: "Mix and drink.", howToUse: "Drink daily." },
        { id: 83, name: "Aloe Vera Juice", ingredients: "1–2 tsp aloe vera juice", howToUse: "Take daily for skin and hormonal balance." },
        { id: 84, name: "Ashoka Bark Decoction", ingredients: "1 tsp bark, water", preparation: "Boil bark in water.", howToUse: "Drink warm for menstrual health." },
        { id: 85, name: "Cinnamon Tea", ingredients: "1 small stick, water", preparation: "Boil stick in water.", howToUse: "Drink warm to regulate cycles." },
        { id: 86, name: "Ginger Paste for Cramps", ingredients: "Ginger paste, warm water", preparation: "Mix in warm water.", howToUse: "Drink or apply topically." },
        { id: 87, name: "Fennel Seed Tea", ingredients: "1 tsp seeds, water", preparation: "Boil seeds in water.", howToUse: "Drink warm for menstrual relief." },
        { id: 88, name: "Sesame Oil Massage", ingredients: "Sesame oil", preparation: "Warm oil.", howToUse: "Massage abdomen to reduce pain." },
        { id: 89, name: "Castor Oil Pack", ingredients: "Castor oil, cloth", preparation: "Warm oil, apply pack.", howToUse: "Apply on uterus area." },
        { id: 90, name: "Lemon Water", ingredients: "Fresh lemon juice", howToUse: "Drink daily for iron and energy." },
    ]
  },
  {
    id: 10,
    name: "Immunity & Miscellaneous Remedies",
    remedies: [
        { id: 91, name: "Giloy Juice", ingredients: "2–3 tsp giloy juice", howToUse: "Take daily to boost immunity." },
        { id: 92, name: "Turmeric, Honey & Black Pepper Paste", ingredients: "½ tsp turmeric, ½ tsp honey, pinch black pepper", preparation: "Mix ingredients.", howToUse: "Take daily for immunity." },
        { id: 93, name: "Amla & Honey", ingredients: "2 tsp amla juice, 1 tsp honey", howToUse: "Take daily." },
        { id: 94, name: "Garlic", ingredients: "1–2 cloves garlic", howToUse: "Eat daily for immunity." },
        { id: 95, name: "Tulsi Leaves", ingredients: "5–6 tulsi leaves", howToUse: "Chew daily." },
        { id: 96, name: "Triphala Powder", ingredients: "½–1 tsp triphala powder, warm water", howToUse: "Take at night." },
        { id: 97, name: "Sunlight Exposure", ingredients: "Sunlight", howToUse: "10–15 min morning sunlight daily for vitamin D." },
        { id: 98, name: "Mustard Oil in Food", ingredients: "Mustard oil", howToUse: "Use for cooking to strengthen immunity." },
        { id: 99, name: "Ginger & Lemon Water", ingredients: "Ginger, lemon juice, water", preparation: "Boil ginger, add lemon juice.", howToUse: "Drink warm daily." },
        { id: 100, name: "Coconut Water", ingredients: "1 glass coconut water", howToUse: "Drink daily to stay hydrated and healthy." },
    ]
  }
];

export const remediesData: RemedyCategory[] = rawData.map(category => ({
  ...category,
  slug: slugify(category.name),
  remedies: category.remedies.map(remedy => ({
    ...remedy,
    slug: slugify(remedy.name)
  }))
}));

export const getCategories = () => remediesData;

export const getCategoryBySlug = (slug: string) => remediesData.find(c => c.slug === slug);

export const getRemedyBySlugs = (categorySlug: string, remedySlug: string) => {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;
  const remedy = category.remedies.find(r => r.slug === remedySlug);
  return remedy ? { remedy, category } : null;
};

export const getAllRemedies = () => remediesData.flatMap(category => 
  category.remedies.map(remedy => ({
    ...remedy,
    categoryName: category.name,
    categorySlug: category.slug,
  }))
);
