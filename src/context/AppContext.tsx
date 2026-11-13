import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ExperienceMode,
  MenuItem,
  FoodSet,
  CartItem,
  FoodCustomization,
  DrinkCustomization,
  OrderReceipt
} from '../types';
import { FOOD_MENU_ITEMS } from '../data/foodData';
import { DRINKS_MENU_ITEMS } from '../data/drinksData';
import { FOOD_SETS } from '../data/setsData';
import {
  addCartItem,
  changeCartQuantity,
  computeCartTotals,
  createCartItemId,
  parseStoredCart,
  removeCartItem
} from '../lib/cart';

interface AppContextType {
  experience: ExperienceMode;
  setExperience: (exp: ExperienceMode) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  serviceFee: number;
  totalAmount: number;

  // Modals & Detail Views
  selectedFood: MenuItem | null;
  setSelectedFood: (item: MenuItem | null) => void;
  selectedDrink: MenuItem | null;
  setSelectedDrink: (item: MenuItem | null) => void;
  customizingSet: FoodSet | null;
  setCustomizingSet: (set: FoodSet | null) => void;
  
  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  // Checkout
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  latestReceipt: OrderReceipt | null;
  setLatestReceipt: (receipt: OrderReceipt | null) => void;

  // Switch helper
  toggleExperience: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always start on landing screen per explicit prompt requirement
  const [experience, setExperience] = useState<ExperienceMode>('landing');
  const [activeNav, setActiveNav] = useState<string>('home');
  
  // Cart State with localStorage hydration
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return parseStoredCart(localStorage.getItem('cravings_studio_cart'));
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<MenuItem | null>(null);
  const [customizingSet, setCustomizingSet] = useState<FoodSet | null>(null);
  const [latestReceipt, setLatestReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('cravings_studio_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (itemData: Omit<CartItem, 'cartItemId'>) => {
    const cartItemId = createCartItemId();
    setCart((prev) => addCartItem(prev, itemData, cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => changeCartQuantity(prev, cartItemId, delta));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => removeCartItem(prev, cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const { count: cartCount, subtotal, serviceFee, total: totalAmount } = computeCartTotals(cart);

  const toggleExperience = () => {
    if (experience === 'food') {
      setExperience('drinks');
      setActiveNav('home');
    } else if (experience === 'drinks') {
      setExperience('food');
      setActiveNav('home');
    } else {
      setExperience('food');
      setActiveNav('home');
    }
  };

  return (
    <AppContext.Provider
      value={{
        experience,
        setExperience,
        activeNav,
        setActiveNav,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        serviceFee,
        totalAmount,
        selectedFood,
        setSelectedFood,
        selectedDrink,
        setSelectedDrink,
        customizingSet,
        setCustomizingSet,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        latestReceipt,
        setLatestReceipt,
        toggleExperience
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
