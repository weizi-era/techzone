import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartItem, Product, Address, Order, Coupon, UserProfile } from '@/types/shop';

interface ShopState {
  cart: CartItem[];
  favorites: string[];
  history: string[];
  addresses: Address[];
  orders: Order[];
  coupons: Coupon[];
  user: UserProfile | null;
  isLoggedIn: boolean;
}

type ShopAction =
  | { type: 'ADD_TO_CART'; product: Product; spec: string; quantity: number }
  | { type: 'REMOVE_FROM_CART'; productId: string; spec: string }
  | { type: 'UPDATE_CART_QTY'; productId: string; spec: string; quantity: number }
  | { type: 'TOGGLE_CART_SELECT'; productId: string; spec: string }
  | { type: 'SELECT_ALL_CART'; selected: boolean }
  | { type: 'CLEAR_INVALID_CART' }
  | { type: 'TOGGLE_FAVORITE'; productId: string }
  | { type: 'ADD_HISTORY'; productId: string }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'ADD_ADDRESS'; address: Address }
  | { type: 'REMOVE_ADDRESS'; id: string }
  | { type: 'SET_DEFAULT_ADDRESS'; id: string }
  | { type: 'LOGIN'; user: UserProfile }
  | { type: 'LOGOUT' }
  | { type: 'USE_COUPON'; id: string };

const defaultUser: UserProfile = {
  nickname: '数码爱好者',
  avatar: '',
  phone: '138****8888',
  level: 3,
  levelName: '黄金会员',
  points: 2680,
  couponCount: 5,
  orderCounts: { pending: 2, paid: 1, shipped: 3, delivered: 8 },
};

const initialState: ShopState = {
  cart: [],
  favorites: [],
  history: [],
  addresses: [
    { id: 'a1', name: '张三', phone: '13800138000', province: '广东省', city: '深圳市', district: '南山区', detail: '科技园路100号A栋12层', isDefault: true },
  ],
  orders: [
    {
      id: 'ORD20260610001', status: 'shipped', total: 9999, createdAt: '2026-06-10 14:30',
      address: '广东省深圳市南山区科技园路100号', items: [{ product: { id: 'p1', name: 'Galaxy S25 Ultra', brand: 'Samsung', category: 'phone', price: 9999, originalPrice: 10999, image: '', images: [], rating: 4.9, reviewCount: 12680, sales: 38920, tags: ['旗舰'], specs: {}, description: '', stock: 256 }, quantity: 1, spec: '钛金灰 512GB', price: 9999 }],
    },
    {
      id: 'ORD20260608002', status: 'delivered', total: 1899, createdAt: '2026-06-08 09:15',
      address: '广东省深圳市南山区科技园路100号', items: [{ product: { id: 'p3', name: 'AirPods Pro 3', brand: 'Apple', category: 'headphone', price: 1899, originalPrice: 1999, image: '', images: [], rating: 4.8, reviewCount: 23560, sales: 89320, tags: ['降噪'], specs: {}, description: '', stock: 512 }, quantity: 1, spec: '白色', price: 1899 }],
    },
  ],
  coupons: [
    { id: 'c1', type: 'fixed', value: 200, minSpend: 1000, name: '满1000减200', expiresAt: '2026-07-01', used: false },
    { id: 'c2', type: 'fixed', value: 50, minSpend: 300, name: '满300减50', expiresAt: '2026-06-30', used: false },
    { id: 'c3', type: 'percent', value: 10, minSpend: 500, name: '全场9折券', expiresAt: '2026-07-15', used: false },
    { id: 'c4', type: 'fixed', value: 100, minSpend: 0, name: '新人无门槛100元', expiresAt: '2026-08-01', used: false },
    { id: 'c5', type: 'fixed', value: 500, minSpend: 3000, name: '满3000减500', expiresAt: '2026-07-20', used: false },
  ],
  user: defaultUser,
  isLoggedIn: true,
};

function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(i => i.product.id === action.product.id && i.selectedSpec === action.spec);
      if (existing) {
        return { ...state, cart: state.cart.map(i => i.product.id === action.product.id && i.selectedSpec === action.spec ? { ...i, quantity: i.quantity + action.quantity } : i) };
      }
      return { ...state, cart: [...state.cart, { product: action.product, quantity: action.quantity, selectedSpec: action.spec }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => !(i.product.id === action.productId && i.selectedSpec === action.spec)) };
    case 'UPDATE_CART_QTY':
      return { ...state, cart: state.cart.map(i => i.product.id === action.productId && i.selectedSpec === action.spec ? { ...i, quantity: Math.max(1, action.quantity) } : i) };
    case 'TOGGLE_CART_SELECT':
      return { ...state, cart: state.cart.map(i => i.product.id === action.productId && i.selectedSpec === action.spec ? { ...i, selected: !i.selected } : i) };
    case 'SELECT_ALL_CART':
      return { ...state, cart: state.cart.map(i => ({ ...i, selected: action.selected })) };
    case 'CLEAR_INVALID_CART':
      return { ...state, cart: state.cart.filter(i => i.product.stock > 0) };
    case 'TOGGLE_FAVORITE':
      return { ...state, favorites: state.favorites.includes(action.productId) ? state.favorites.filter(id => id !== action.productId) : [...state.favorites, action.productId] };
    case 'ADD_HISTORY':
      return { ...state, history: [action.productId, ...state.history.filter(id => id !== action.productId)].slice(0, 50) };
    case 'CLEAR_HISTORY':
      return { ...state, history: [] };
    case 'ADD_ADDRESS':
      return { ...state, addresses: [...state.addresses, action.address] };
    case 'REMOVE_ADDRESS':
      return { ...state, addresses: state.addresses.filter(a => a.id !== action.id) };
    case 'SET_DEFAULT_ADDRESS':
      return { ...state, addresses: state.addresses.map(a => ({ ...a, isDefault: a.id === action.id })) };
    case 'LOGIN':
      return { ...state, user: action.user, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, user: null, isLoggedIn: false };
    case 'USE_COUPON':
      return { ...state, coupons: state.coupons.map(c => c.id === action.id ? { ...c, used: true } : c) };
    default:
      return state;
  }
}

const ShopContext = createContext<{ state: ShopState; dispatch: React.Dispatch<ShopAction> } | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);
  return <ShopContext.Provider value={{ state, dispatch }}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be inside ShopProvider');
  return ctx;
}

export function useCart() {
  const { state, dispatch } = useShop();
  const selectedItems = state.cart.filter(i => i.selected);
  const total = selectedItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const totalCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  return { cart: state.cart, selectedItems, total, totalCount, dispatch };
}
