import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setProducts(data as Product[]);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await supabase.from('products').delete().eq('id', id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('Failed to delete product');
    }
  }

  async function toggleActive(product: Product) {
    try {
      await supabase
        .from('products')
        .update({ is_active: !product.is_active })
        .eq('id', product.id);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, is_active: !p.is_active } : p))
      );
    } catch {
      alert('Failed to update product status');
    }
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal-700">Products</h1>
          <p className="font-body text-sm text-charcoal-400">
            {products.length} products in your catalog
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="btn-primary flex items-center gap-2 self-start"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or category..."
          className="w-full rounded-luxe border border-blush-200 bg-white py-3 pl-11 pr-4 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
        />
      </div>

      {/* Products */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 rounded-luxe skeleton" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-luxe bg-white p-12 text-center shadow-soft">
          <Package className="mx-auto h-12 w-12 text-blush-300" />
          <p className="mt-4 font-display text-lg font-semibold text-charcoal-700">
            No products found
          </p>
          <p className="mt-1 font-body text-sm text-charcoal-400">
            {search ? 'Try a different search' : 'Add your first product to get started'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-luxe bg-white shadow-soft md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blush-100 bg-nude-50 text-left">
                  <th className="px-6 py-4 font-button text-xs uppercase tracking-wider text-charcoal-500">Product</th>
                  <th className="px-6 py-4 font-button text-xs uppercase tracking-wider text-charcoal-500">Category</th>
                  <th className="px-6 py-4 font-button text-xs uppercase tracking-wider text-charcoal-500">Price</th>
                  <th className="px-6 py-4 font-button text-xs uppercase tracking-wider text-charcoal-500">Status</th>
                  <th className="px-6 py-4 font-button text-xs uppercase tracking-wider text-charcoal-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-blush-50 transition-colors hover:bg-nude-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-10 rounded-lg object-cover"
                        />
                        <span className="font-body text-sm font-medium text-charcoal-700 line-clamp-1 max-w-xs">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-charcoal-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 font-display text-sm font-semibold text-charcoal-700">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(product)}
                        className={`rounded-full px-3 py-1 font-button text-[10px] uppercase tracking-wider transition-colors ${
                          product.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-charcoal-100 text-charcoal-500'
                        }`}
                      >
                        {product.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-blush-50 text-rosegold-500 transition-colors hover:bg-blush-100"
                          aria-label="Edit product"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 transition-colors hover:bg-red-100"
                          aria-label="Delete product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-luxe bg-white p-4 shadow-soft"
              >
                <div className="flex gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-body text-sm font-medium text-charcoal-700 line-clamp-2">
                      {product.name}
                    </p>
                    <p className="font-button text-xs uppercase tracking-wider text-rosegold-400">
                      {product.category}
                    </p>
                    <p className="mt-1 font-display text-sm font-bold text-charcoal-700">
                      ${product.price}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => toggleActive(product)}
                      className={`rounded-full px-2 py-1 font-button text-[9px] uppercase tracking-wider ${
                        product.is_active ? 'bg-green-100 text-green-700' : 'bg-charcoal-100 text-charcoal-500'
                      }`}
                    >
                      {product.is_active ? 'Active' : 'Hidden'}
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    to={`/admin/products/${product.id}/edit`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-luxe bg-blush-50 py-2 font-button text-xs uppercase tracking-wider text-rosegold-500"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-luxe bg-red-50 py-2 font-button text-xs uppercase tracking-wider text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
