export type ExperienceMode = 'landing' | 'food' | 'drinks';

export type FoodCategory = 
  | 'All' 
  | 'Rice & Bowls' 
  | 'Burger' 
  | 'Pasta' 
  | 'Chicken' 
  | 'Steak' 
  | 'Snacks' 
  | 'Dessert';

export type DrinkCategory = 
  | 'All' 
  | 'Matcha' 
  | 'Coffee' 
  | 'Tea' 
  | 'Non-Coffee' 
  | 'Signature' 
  | 'Cold Drinks';

export interface FoodCustomization {
  size: 'Regular' | 'Double Patty' | 'Upsize';
  spiceLevel: 'Non-Spicy' | 'Mild' | 'Medium' | 'Hot' | 'Extra Spicy';
  selectedAddons: string[];
  addonPrices: Record<string, number>;
}

export interface DrinkCustomization {
  size: 'Regular' | 'Large';
  milk: 'Fresh Milk' | 'Oat Milk' | 'Soy Milk' | 'Almond Milk';
  sweetness: '0%' | '25%' | '50%' | '75%' | '100%';
  ice: 'No Ice' | 'Less Ice' | 'Normal Ice' | 'Extra Ice';
  toppings: string[];
  toppingPrices: Record<string, number>;
}

export interface MenuItem {
  id: string;
  name: string;
  category: FoodCategory | DrinkCategory;
  type: 'food' | 'drink';
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
  calories?: string;
  prepTime?: string;
  tags?: string[];
  // For drinks
  origin?: string;
  tastingNotes?: string[];
  japaneseName?: string;
}

export interface SetOptionItem {
  id: string;
  name: string;
  extraPrice: number;
  image?: string;
}

export interface FoodSet {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  basePrice: number;
  originalPrice: number;
  image: string;
  badge?: string;
  itemsIncluded: string[];
  mains: SetOptionItem[];
  sides: SetOptionItem[];
  drinks: SetOptionItem[];
  addons: { id: string; name: string; price: number }[];
}

export interface CartItem {
  cartItemId: string;
  itemType: 'food' | 'drink' | 'set';
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  foodCustomization?: FoodCustomization;
  drinkCustomization?: DrinkCustomization;
  setSelections?: {
    main: string;
    side: string;
    drink: string;
    addons: string[];
  };
  notes?: string;
}

export interface OrderReceipt {
  orderId: string;
  customerName: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  tableOrAddress: string;
  paymentMethod: 'qris' | 'card' | 'cash';
  items: CartItem[];
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
  estimatedTime: string;
  createdAt: string;
}
