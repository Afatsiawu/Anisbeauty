import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { STATIC_PRODUCTS } from './catalog';
import type { Product } from './types';

// Loads products from Supabase, auto-seeds the table from the static catalog
// on first load (idempotent), and falls back to static data if DB is unreachable.
export function useStoreProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // Try to fetch active products
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          if (!cancelled) {
            setProducts(data as Product[]);
            setLoading(false);
          }
          return;
        }

        // Table is empty — seed it from the static catalog (idempotent)
        const inserts = STATIC_PRODUCTS.map(({ id, ...rest }) => rest);
        await supabase.from('products').insert(inserts);

        // Re-fetch after seeding
        const { data: refetched } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (!cancelled) {
          setProducts((refetched as Product[]) || STATIC_PRODUCTS);
          setLoading(false);
        }
      } catch {
        // DB unreachable — fall back to static data so storefront never breaks
        if (!cancelled) {
          setProducts(STATIC_PRODUCTS);
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading };
}
