export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  old_price: number | null;
  rating: number;
  reviews: number;
  badge: string | null;
  discount: number;
  image: string;
  hover_image: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  city: string;
  postal_code: string | null;
  country: string;
  delivery_notes: string | null;
  payment_method: 'card' | 'momo' | 'cash_on_delivery';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

export type ProductInput = Omit<Product, 'id' | 'created_at'>;
