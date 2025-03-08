
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  products: Product[];
  featuredProducts: Product[];
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isAuthenticated: boolean;
  user: { id: string; name: string; email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Sample product data for demo purposes
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Noise-cancelling wireless headphones with superior sound quality and comfort for extended use.",
    price: 159.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals, heart rate, sleep patterns, and receive notifications on this advanced smart watch.",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.6
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Eco-friendly, soft organic cotton t-shirt available in multiple colors.",
    price: 29.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.3
  },
  {
    id: "4",
    name: "Smartphone Gimbal Stabilizer",
    description: "Capture professional-quality videos with this 3-axis smartphone gimbal stabilizer.",
    price: 89.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.5
  },
  {
    id: "5",
    name: "Premium Coffee Maker",
    description: "Programmable coffee maker with built-in grinder for the freshest coffee experience.",
    price: 149.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.7
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Fast-charging wireless pad compatible with all Qi-enabled devices.",
    price: 39.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.4
  },
  {
    id: "7",
    name: "Ergonomic Office Chair",
    description: "Adjustable office chair with lumbar support and breathable mesh back.",
    price: 199.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.9
  },
  {
    id: "8",
    name: "Insulated Water Bottle",
    description: "Double-walled stainless steel water bottle that keeps drinks hot or cold for hours.",
    price: 34.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.2
  }
];

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Initialize featured products
  useEffect(() => {
    // For demo, select products with rating > 4.5 as featured
    const featured = products.filter(product => product.rating > 4.5);
    setFeaturedProducts(featured);
  }, [products]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }

    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity of existing item
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Mock authentication functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful login for demo purposes
        const mockUser = {
          id: '123',
          name: 'Demo User',
          email: email
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(true);
      }, 1000);
    });
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful registration for demo purposes
        const mockUser = {
          id: '123',
          name: name,
          email: email
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    products,
    featuredProducts,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isAuthenticated,
    user,
    login,
    register,
    logout
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
