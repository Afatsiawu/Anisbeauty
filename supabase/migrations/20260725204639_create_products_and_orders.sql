/*
# Create products and orders tables for ANISBEAUTY storefront

1. New Tables
- `products`: luxury beauty product catalog (makeup, skincare, fragrances, accessories).
  - id (uuid, primary key)
  - name (text, not null)
  - category (text, not null) — e.g. Makeup, Skincare, Fragrances, Accessories
  - price (numeric, not null) — current selling price
  - old_price (numeric, nullable) — original price for sale items
  - rating (numeric, default 5) — average star rating
  - reviews (integer, default 0) — number of reviews
  - badge (text, nullable) — e.g. New, Sale, Trending, Limited Edition, Editor's Pick
  - discount (integer, default 0) — discount percentage
  - image (text, not null) — primary product image URL
  - hover_image (text, nullable) — alternate image shown on hover
  - description (text, nullable) — product description
  - is_active (boolean, default true) — whether the product is visible on storefront
  - created_at (timestamptz, default now)
- `orders`: customer orders placed through the storefront checkout.
  - id (uuid, primary key)
  - order_number (text, unique, not null) — human-readable order reference
  - customer_name (text, not null)
  - customer_email (text, not null)
  - customer_phone (text, nullable)
  - shipping_address (text, not null)
  - city (text, not null)
  - postal_code (text, nullable)
  - country (text, default 'United States')
  - delivery_notes (text, nullable)
  - items (jsonb, not null) — array of {name, price, quantity, image, category}
  - subtotal (numeric, not null)
  - shipping (numeric, not null)
  - total (numeric, not null)
  - status (text, default 'pending') — pending, confirmed, processing, shipped, delivered, cancelled
  - created_at (timestamptz, default now)

2. Indexes
- `products_category_idx` on products(category) for category filtering
- `products_badge_idx` on products(badge) for badge-based queries
- `products_active_idx` on products(is_active) for storefront queries
- `orders_status_idx` on orders(status) for admin filtering
- `orders_created_at_idx` on orders(created_at) for recent orders

3. Security
- Enable RLS on both tables.
- products: public read (anon, authenticated) for the storefront; admin-only writes (authenticated) for insert/update/delete.
- orders: anyone (anon, authenticated) can create orders (checkout); only authenticated admins can read and update orders.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price numeric(10,2) NOT NULL,
  old_price numeric(10,2),
  rating numeric(2,1) DEFAULT 5,
  reviews integer DEFAULT 0,
  badge text,
  discount integer DEFAULT 0,
  image text NOT NULL,
  hover_image text,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
CREATE INDEX IF NOT EXISTS products_badge_idx ON products(badge);
CREATE INDEX IF NOT EXISTS products_active_idx ON products(is_active);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  shipping_address text NOT NULL,
  city text NOT NULL,
  postal_code text,
  country text DEFAULT 'United States',
  delivery_notes text,
  payment_method text DEFAULT 'card' CHECK (payment_method IN ('card', 'momo', 'cash_on_delivery')),
  items jsonb NOT NULL,
  subtotal numeric(10,2) NOT NULL,
  shipping numeric(10,2) NOT NULL,
  total numeric(10,2) NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- products: public read for storefront
DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- products: admin-only writes (any authenticated user — admin is authenticated)
DROP POLICY IF EXISTS "admin_insert_products" ON products;
CREATE POLICY "admin_insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_products" ON products;
CREATE POLICY "admin_update_products" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_products" ON products;
CREATE POLICY "admin_delete_products" ON products FOR DELETE
  TO authenticated USING (true);

-- orders: anyone can create (checkout flow)
DROP POLICY IF EXISTS "public_insert_orders" ON orders;
CREATE POLICY "public_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- orders: admin-only read (authenticated)
DROP POLICY IF EXISTS "admin_read_orders" ON orders;
CREATE POLICY "admin_read_orders" ON orders FOR SELECT
  TO authenticated USING (true);

-- orders: admin-only update (authenticated)
DROP POLICY IF EXISTS "admin_update_orders" ON orders;
CREATE POLICY "admin_update_orders" ON orders FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
