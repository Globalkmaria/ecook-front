import { RecipeIngredient, RECIPE_INGREDIENTS_ARRAY } from './ingredients';
import { User, users } from './users';

interface Recipe {
  name: string;
  description: string;
  filters: string[];
  ingredients: RecipeIngredient[];
  steps: string[];
  img: string;
  user: User;
}

export const RECIPES: Record<string, Recipe> = {
  1: {
    user: users[1],
    name: 'Bibimbap',
    filters: ['Vegetarian', 'Healthy', 'Easy to prepare'],
    description:
      'Bibimbap is a popular Korean dish made with rice, vegetables, and a variety of toppings.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Cook rice according to package instructions.',
      'Sauté vegetables separately with sesame oil and garlic.',
      'Fry the egg sunny-side up.',
      'Assemble the bowl with rice at the bottom, vegetables on top, and the egg in the center.',
      'Add gochujang to taste.',
      'Cook rice according to package instructions.',
      'Sauté vegetables separately with sesame oil and garlic.',
      'Fry the egg sunny-side up.',
      'Assemble the bowl with rice at the bottom, vegetables on top, and the egg in the center.',
      'Add gochujang to taste.',
      'Cook rice according to package instructions.',
      'Sauté vegetables separately with sesame oil and garlic.',
      'Fry the egg sunny-side up.',
      'Assemble the bowl with rice at the bottom, vegetables on top, and the egg in the center.',
      'Add gochujang to taste.',
      'Cook rice according to package instructions.',
      'Sauté vegetables separately with sesame oil and garlic.',
      'Fry the egg sunny-side up.',
      'Assemble the bowl with rice at the bottom, vegetables on top, and the egg in the center.',
      'Add gochujang to taste.',
      'Cook rice according to package instructions.',
      'Sauté vegetables separately with sesame oil and garlic.',
      'Fry the egg sunny-side up.',
      'Assemble the bowl with rice at the bottom, vegetables on top, and the egg in the center.',
      'Add gochujang to taste.',
      'Cook rice according to package instructions.',
      'Sauté vegetables separately with sesame oil and garlic.',
      'Fry the egg sunny-side up.',
      'Assemble the bowl with rice at the bottom, vegetables on top, and the egg in the center.',
      'Add gochujang to taste.',
    ],
    img: 'img1.png',
  },
  2: {
    user: users[2],
    name: 'Spaghetti Carbonara',
    filters: ['Italian', 'Comfort Food', 'Quick'],
    description:
      'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Cook spaghetti according to package instructions.',
      'In a pan, cook pancetta until crispy, then add garlic and sauté briefly.',
      'Whisk eggs and cheese together in a bowl.',
      'Drain pasta and add to the pan with pancetta, removing from heat.',
      'Quickly stir in the egg mixture, adding pasta water as needed for creaminess.',
      'Serve immediately with extra cheese and black pepper.',
    ],
    img: 'img2.png',
  },
  3: {
    user: users[2],
    name: 'Chicken Tikka Masala',
    filters: ['Indian', 'Spicy', 'Comfort Food'],
    description:
      'A flavorful curry made with marinated chicken pieces in a creamy tomato sauce.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Marinate chicken in yogurt and spices for at least 1 hour.',
      'Sauté onions, garlic, and ginger in butter until soft.',
      'Add marinated chicken and cook until browned.',
      'Stir in tomato sauce and simmer for 20 minutes.',
      'Add heavy cream and simmer for another 10 minutes.',
      'Serve with basmati rice or naan bread.',
    ],
    img: 'img3.png',
  },
  4: {
    user: users[2],
    name: 'Caesar Salad',
    filters: ['Salad', 'Healthy', 'Quick'],
    description:
      'A classic Caesar salad with romaine lettuce, croutons, and a creamy dressing.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Whisk together garlic, mustard, Worcestershire, egg yolk, lemon juice, and olive oil to make dressing.',
      'Toss lettuce with dressing, Parmesan, and croutons.',
      'Season with salt and pepper.',
      'Serve immediately.',
    ],
    img: 'img4.png',
  },
  5: {
    user: users[3],
    name: 'Beef Stroganoff',
    filters: ['Comfort Food', 'Russian', 'Rich'],
    description:
      'A rich and creamy dish made with tender beef and mushrooms in a sour cream sauce.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Sauté beef strips in butter until browned, then remove from pan.',
      'Sauté onions and mushrooms in the same pan.',
      'Sprinkle with flour, then gradually add beef broth and bring to a boil.',
      'Stir in mustard and sour cream, then return beef to the pan.',
      'Simmer for 10 minutes and serve over egg noodles.',
    ],
    img: 'img5.png',
  },
  6: {
    user: users[6],
    name: 'Pad Thai',
    filters: ['Thai', 'Noodles', 'Spicy'],
    description:
      'A popular Thai stir-fry noodle dish with shrimp, tofu, peanuts, and a tangy sauce.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Soak rice noodles in warm water until soft, then drain.',
      'Sauté shrimp and tofu in oil until cooked, then remove from pan.',
      'Add garlic to the pan, then pour in beaten eggs and scramble.',
      'Add noodles, shrimp, tofu, and sauce mixture (fish sauce, tamarind paste, sugar, soy sauce) to the pan.',
      'Stir in bean sprouts and green onions, cooking until heated through.',
      'Serve with chopped peanuts and lime wedges.',
    ],
    img: 'img6.png',
  },
  7: {
    user: users[4],
    name: 'Shakshuka',
    filters: ['Breakfast', 'Middle Eastern', 'Spicy'],
    description:
      'A North African and Middle Eastern dish of poached eggs in a spicy tomato sauce.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Sauté onion and bell pepper in olive oil until soft.',
      'Add garlic, cumin, paprika, and chili powder, and cook for 1 minute.',
      'Pour in crushed tomatoes and simmer for 10 minutes.',
      'Make wells in the sauce and crack an egg into each well.',
      'Cover and cook until eggs are set to your liking.',
      'Garnish with parsley and serve with bread.',
    ],
    img: 'img7.png',
  },
  8: {
    user: users[4],
    name: 'Chicken Alfredo',
    filters: ['Italian', 'Creamy', 'Comfort Food'],
    description:
      'A rich and creamy pasta dish made with grilled chicken and Alfredo sauce.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Cook fettuccine according to package instructions.',
      'In a pan, melt butter and sauté garlic until fragrant.',
      'Stir in heavy cream and bring to a simmer.',
      'Add Parmesan cheese and stir until melted and smooth.',
      'Toss in cooked fettuccine and sliced chicken.',
      'Season with salt and pepper and garnish with parsley.',
    ],
    img: 'img8.png',
  },
  9: {
    user: users[5],
    name: 'Greek Salad',
    filters: ['Salad', 'Healthy', 'Mediterranean'],
    description:
      'A refreshing salad with cucumbers, tomatoes, olives, feta cheese, and a lemon vinaigrette.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Combine cucumber, tomatoes, onion, and olives in a large bowl.',
      'In a small bowl, whisk together olive oil, vinegar, lemon juice, oregano, salt, and pepper.',
      'Pour dressing over salad and toss to coat.',
      'Top with crumbled feta cheese and serve.',
    ],
    img: 'img9.png',
  },
  10: {
    user: users[5],
    name: 'Ramen',
    filters: ['Japanese', 'Soup', 'Comfort Food'],
    description:
      'A Japanese noodle soup with broth, noodles, meat, and various toppings.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'In a large pot, combine broth, water, soy sauce, garlic, and ginger. Bring to a boil.',
      'Add ramen noodles and cook according to package instructions.',
      'Divide noodles and broth into bowls.',
      'Top with meat, mushrooms, green onions, and soft-boiled eggs.',
      'Garnish with nori and serve hot.',
    ],
    img: 'img10.png',
  },
  11: {
    user: users[5],
    name: 'French Toast',
    filters: ['Breakfast', 'Sweet', 'Quick'],
    description:
      'A classic breakfast dish made with bread soaked in eggs and milk, then fried.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Whisk together eggs, milk, cinnamon, and vanilla in a shallow bowl.',
      'Dip each slice of bread in the egg mixture, coating both sides.',
      'Melt butter in a pan and cook the bread until golden brown on both sides.',
      'Serve hot with maple syrup and powdered sugar.',
    ],
    img: 'img11.png',
  },
  12: {
    user: users[3],
    name: 'Lasagna',
    filters: ['Italian', 'Baked', 'Comfort Food'],
    description:
      'A layered pasta dish with rich meat sauce, ricotta, mozzarella, and Parmesan cheese.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Cook lasagna noodles according to package instructions.',
      'In a large pan, cook ground beef, onion, and garlic until browned.',
      'Stir in marinara sauce and simmer for 10 minutes.',
      'In a bowl, mix ricotta, egg, and Parmesan cheese.',
      'In a baking dish, layer noodles, meat sauce, ricotta mixture, and mozzarella.',
      'Repeat layers and top with remaining mozzarella.',
      'Bake at 375°F for 25-30 minutes or until bubbly and golden.',
    ],
    img: 'img12.png',
  },
  13: {
    user: users[5],
    name: 'Guacamole',
    filters: ['Mexican', 'Dip', 'Healthy'],
    description:
      'A classic Mexican dip made with mashed avocados, lime juice, onions, and cilantro.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'In a large bowl, mash avocados with lime juice.',
      'Stir in onion, garlic, jalapeño, and cilantro.',
      'Season with salt and serve immediately with tortilla chips.',
    ],
    img: 'img13.png',
  },
  14: {
    user: users[5],
    name: 'Chocolate Chip Cookies',
    filters: ['Dessert', 'Baked', 'Sweet'],
    description:
      'Classic cookies with a chewy texture and loaded with chocolate chips.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Preheat oven to 350°F.',
      'In a large bowl, cream together butter, brown sugar, and granulated sugar.',
      'Beat in eggs one at a time, then stir in vanilla.',
      'Combine flour, baking soda, and salt; gradually stir into the creamed mixture.',
      'Fold in chocolate chips.',
      'Drop by spoonfuls onto ungreased baking sheets.',
      'Bake for 10-12 minutes, or until edges are golden.',
      'Cool on wire racks.',
    ],
    img: 'img14.png',
  },
  15: {
    user: users[5],
    name: 'Margarita Pizza',
    filters: ['Pizza', 'Vegetarian', 'Italian'],
    description:
      'A simple yet delicious pizza topped with fresh tomatoes, mozzarella, and basil.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Preheat oven to 475°F.',
      'Roll out pizza dough and place on a pizza stone or baking sheet.',
      'Spread tomato sauce evenly over the dough.',
      'Top with sliced tomatoes and mozzarella.',
      'Drizzle with olive oil and season with salt and pepper.',
      'Bake for 10-15 minutes, or until crust is golden and cheese is bubbly.',
      'Garnish with fresh basil before serving.',
    ],
    img: 'img15.png',
  },
  16: {
    user: users[5],
    name: 'Sushi Rolls',
    filters: ['Japanese', 'Seafood', 'Healthy'],
    description:
      'Traditional Japanese rolls made with sushi rice, seaweed, and various fillings.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Rinse sushi rice until water runs clear.',
      'Combine rice and water in a pot and bring to a boil.',
      'Reduce heat and simmer, covered, for 20 minutes.',
      'Mix rice vinegar, sugar, and salt; stir into cooked rice.',
      'Place a sheet of nori on a bamboo mat, shiny side down.',
      'Spread a thin layer of rice over the nori.',
      'Arrange fish, cucumber, and avocado in a line on the rice.',
      'Roll tightly and slice into bite-sized pieces.',
      'Serve with soy sauce.',
    ],
    img: 'img16.png',
  },
  17: {
    user: users[5],
    name: 'Tom Yum Soup',
    filters: ['Thai', 'Soup', 'Spicy'],
    description:
      'A hot and sour Thai soup made with shrimp, lemongrass, and fresh herbs.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Bring chicken broth to a boil with lemongrass, lime leaves, galangal, and chilies.',
      'Add mushrooms and shrimp, cooking until shrimp are pink.',
      'Stir in fish sauce and lime juice.',
      'Garnish with fresh cilantro and serve hot.',
    ],
    img: 'img17.png',
  },
  18: {
    user: users[5],
    name: 'Tacos al Pastor',
    filters: ['Mexican', 'Spicy', 'Street Food'],
    description:
      'Mexican street tacos made with marinated pork, pineapple, and onions.',
    ingredients: RECIPE_INGREDIENTS_ARRAY,
    steps: [
      'Marinate pork in pineapple juice, vinegar, chili powder, cumin, oregano, and garlic for at least 2 hours.',
      'Grill or sauté pork until cooked through.',
      'Warm tortillas and fill with pork, pineapple, and onions.',
      'Garnish with cilantro and serve with lime wedges.',
    ],
    img: 'img18.png',
  },
};

export const RECIPE_IDS = Object.keys(RECIPES);
