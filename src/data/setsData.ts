import { FoodSet } from '../types';

export const FOOD_SETS: FoodSet[] = [
  {
    id: 'set-lunch',
    name: 'Curated Lunch Set',
    subtitle: 'Main Course + Handcrafted Drink + Side Dish',
    description: 'Our most popular everyday dining experience. Balance your afternoon with a hot comforting main dish, accompanied by your choice of artisanal beverage and golden side.',
    basePrice: 75000,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Most Popular',
    itemsIncluded: ['1 Choice of Main Bowl or Pasta', '1 Specialty Beverage', '1 Crispy Side'],
    mains: [
      { id: 'm-gyudon', name: 'Wagyu Gyudon Truffle Bowl', extraPrice: 5000 },
      { id: 'm-teriyaki', name: 'Tokyo Teriyaki Chicken Rice Bowl', extraPrice: 0 },
      { id: 'm-carbonara', name: 'Smoked Beef Carbonara Tagliatelle', extraPrice: 4000 },
      { id: 'm-pesto', name: 'Creamy Pesto Grilled Chicken Pasta', extraPrice: 2000 }
    ],
    sides: [
      { id: 's-truffle-fries', name: 'Crispy Truffle Parmesan Fries', extraPrice: 4000 },
      { id: 's-wings', name: 'Honey Soy Garlic Wings (2 pcs)', extraPrice: 5000 },
      { id: 's-edamame', name: 'Charred Garlic Sea Salt Edamame', extraPrice: 0 }
    ],
    drinks: [
      { id: 'd-iced-tea', name: 'Peach Jasmine Iced Tea', extraPrice: 0 },
      { id: 'd-matcha', name: 'Ceremonial Matcha Latte', extraPrice: 8000 },
      { id: 'd-spanish', name: 'Iced Spanish Latte', extraPrice: 5000 },
      { id: 'd-lemonade', name: 'Yuzu Sparkling Soda', extraPrice: 3000 }
    ],
    addons: [
      { id: 'a-egg', name: '63°C Japanese Onsen Egg', price: 6000 },
      { id: 'a-cheese', name: 'Melted Gouda & Cheddar Cheese', price: 8000 },
      { id: 'a-beef', name: 'Extra 50g Wagyu Slice', price: 18000 },
      { id: 'a-truffle', name: 'Drizzle of Extra White Truffle Oil', price: 9000 }
    ]
  },
  {
    id: 'set-burger-combo',
    name: 'Artisan Burger Combo',
    subtitle: 'Craft Burger + Skin-On Fries + Beverage',
    description: 'The ultimate comfort combo. A gourmet smash or truffle burger, served with freshly tossed truffle fries and an ice-cold beverage of your choosing.',
    basePrice: 82000,
    originalPrice: 104000,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    badge: 'Chef Favorite',
    itemsIncluded: ['1 Gourmet Crafted Burger', '1 Truffle or Classic Fries', '1 Cold Beverage'],
    mains: [
      { id: 'b-truffle', name: 'Truffle Beef Gourmet Burger', extraPrice: 0 },
      { id: 'b-double', name: 'Double Smash Cheeseburger', extraPrice: 2000 },
      { id: 'b-nashville', name: 'Crispy Nashville Hot Chicken Burger', extraPrice: 0 }
    ],
    sides: [
      { id: 's-truffle-fries-combo', name: 'Truffle Parmesan Fries', extraPrice: 0 },
      { id: 's-onion-rings', name: 'Beer-Battered Onion Rings', extraPrice: 2000 },
      { id: 's-sweet-potato', name: 'Golden Sweet Potato Crisps', extraPrice: 3000 }
    ],
    drinks: [
      { id: 'd-lemon-tea', name: 'Signature Iced Lemon Tea', extraPrice: 0 },
      { id: 'd-cold-brew', name: 'Kyoto 16-Hour Cold Brew', extraPrice: 6000 },
      { id: 'd-dirty-coffee', name: 'Dirty Coffee (Double Ristretto)', extraPrice: 7000 },
      { id: 'd-matcha-cloud', name: 'Matcha Cream Cloud', extraPrice: 10000 }
    ],
    addons: [
      { id: 'a-bacon', name: 'Crispy Beef Bacon Strips', price: 10000 },
      { id: 'a-egg-combo', name: 'Sunny-Side Brioche Egg', price: 6000 },
      { id: 'a-truffle-dip', name: 'Extra Truffle Aioli Dip Jar', price: 7000 }
    ]
  },
  {
    id: 'set-matcha-lunch',
    name: 'Kyoto Matcha Lunch Set',
    subtitle: 'Signature Rice Bowl + Uji Ceremonial Matcha',
    description: 'A harmonious pairing uniting our umami-packed rice bowls with authentic ceremonial grade matcha whisked to order from Kyoto, Japan.',
    basePrice: 89000,
    originalPrice: 116000,
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80',
    badge: 'Signature Pairing',
    itemsIncluded: ['1 Signature Japanese Bowl', '1 Ceremonial Grade Matcha Drink', '1 Miso / Pickled Side'],
    mains: [
      { id: 'm-wagyu-matcha', name: 'Wagyu Gyudon Truffle Bowl', extraPrice: 0 },
      { id: 'm-prawn-matcha', name: 'Garlic Butter Tiger Prawn Bowl', extraPrice: 2000 },
      { id: 'm-teriyaki-matcha', name: 'Tokyo Teriyaki Chicken Bowl', extraPrice: -4000 }
    ],
    sides: [
      { id: 's-edamame-sea', name: 'Warm Sea Salt Edamame', extraPrice: 0 },
      { id: 's-truffle-fries-m', name: 'Crispy Truffle Fries', extraPrice: 4000 },
      { id: 's-cheesecake-slice', name: 'Mini Basque Burnt Cheesecake', extraPrice: 8000 }
    ],
    drinks: [
      { id: 'd-ceremonial', name: 'Ceremonial Matcha Latte', extraPrice: 0 },
      { id: 'd-strawberry-m', name: 'Strawberry Layered Matcha', extraPrice: 5000 },
      { id: 'd-cloud-m', name: 'Matcha Cream Cloud Float', extraPrice: 4000 },
      { id: 'd-hojicha', name: 'Tokyo Roasted Hojicha Latte', extraPrice: 0 }
    ],
    addons: [
      { id: 'a-oatmilk', name: 'Upgrade to Barista Oat Milk', price: 6000 },
      { id: 'a-matcha-foam', name: 'Extra Sweet Matcha Sea Salt Foam', price: 7000 },
      { id: 'a-onsen', name: 'Japanese Onsen Egg', price: 6000 }
    ]
  },
  {
    id: 'set-family-feast',
    name: 'Grand Family & Friends Feast',
    subtitle: '4 Main Courses + 2 Specialty Drinks + 2 Sharing Sides',
    description: 'A lavish feast designed for 3 to 4 people. Experience a symphony of gourmet burgers, pastas, and bowls accompanied by sharing sides and handcrafted drinks.',
    basePrice: 245000,
    originalPrice: 310000,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    badge: 'Feast Value',
    itemsIncluded: ['4 Main Courses of Your Choice', '2 Handcrafted Beverages', '2 Big Sharing Sides'],
    mains: [
      { id: 'f-mains-classic', name: '2 Wagyu Bowls + 2 Truffle Burgers', extraPrice: 0 },
      { id: 'f-mains-pasta', name: '2 Carbonara Pastas + 2 Nashville Hot Chicken', extraPrice: 0 },
      { id: 'f-mains-mixed', name: '1 Wagyu Bowl + 1 Truffle Burger + 1 Carbonara + 1 Chicken', extraPrice: 4000 }
    ],
    sides: [
      { id: 'f-sides-duo', name: 'Truffle Fries (L) + Soy Garlic Wings (6 pcs)', extraPrice: 0 },
      { id: 'f-sides-snack', name: 'Truffle Fries (L) + Beer-Battered Onion Rings', extraPrice: -2000 }
    ],
    drinks: [
      { id: 'f-drinks-tea', name: '2 Large Peach Jasmine Iced Teas', extraPrice: 0 },
      { id: 'f-drinks-matcha', name: '1 Ceremonial Matcha + 1 Iced Spanish Latte', extraPrice: 12000 },
      { id: 'f-drinks-coffee', name: '2 Specialty Iced Lattes (Oat Milk)', extraPrice: 14000 }
    ],
    addons: [
      { id: 'a-dessert-feast', name: 'Whole Slice Basque Burnt Cheesecake', price: 38000 },
      { id: 'a-extra-wings', name: 'Extra 4 pcs Honey Soy Garlic Wings', price: 28000 }
    ]
  }
];
