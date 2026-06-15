export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  sales: number;
  tags: string[];
  specs: Record<string, string>;
  description: string;
  stock: number;
  isHot?: boolean;
  isNew?: boolean;
  isFlashSale?: boolean;
  flashSaleEnd?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSpec: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  subcategories: { id: string; name: string }[];
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  gradient: string;
}

export interface Order {
  id: string;
  items: { product: Product; quantity: number; spec: string; price: number }[];
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'reviewed' | 'cancelled';
  total: number;
  createdAt: string;
  address: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

export interface Coupon {
  id: string;
  type: 'fixed' | 'percent';
  value: number;
  minSpend: number;
  name: string;
  expiresAt: string;
  used: boolean;
}

export interface UserProfile {
  nickname: string;
  avatar: string;
  phone: string;
  level: number;
  levelName: string;
  points: number;
  couponCount: number;
  orderCounts: {
    pending: number;
    paid: number;
    shipped: number;
    delivered: number;
  };
}
