import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, Trash2, ArrowLeft, ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';

const CATEGORIES = ['Makeup', 'Skincare', 'Fragrances', 'Accessories'];
const BADGES = ['', 'New', 'Sale', 'Trending', 'Best Seller', 'Limited Edition', "Editor's Pick"];

const emptyForm = {
  name: '',
  category: 'Makeup',
  price: '',
  old_price: '',
  rating: '5',
  reviews: '0',
  badge: '',
  discount: '0',
  image: '',
  hover_image: '',
  description: '',
  is_active: true,
};

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (error) throw error;
        if (data) {
          const p = data as Product;
          setForm({
            name: p.name,
            category: p.category,
            price: String(p.price),
            old_price: p.old_price ? String(p.old_price) : '',
            rating: String(p.rating),
            reviews: String(p.reviews),
            badge: p.badge || '',
            discount: String(p.discount),
            image: p.image,
            hover_image: p.hover_image || '',
            description: p.description || '',
            is_active: p.is_active,
          });
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return 'Product name is required';
    if (!form.price || Number(form.price) <= 0) return 'Price must be greater than 0';
    if (!form.image.trim()) return 'Product image URL is required';
    if (form.old_price && Number(form.old_price) <= Number(form.price)) {
      return 'Old price must be greater than the current price';
    }
    return null;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      old_price: form.old_price ? Number(form.old_price) : null,
      rating: Number(form.rating) || 5,
      reviews: Number(form.reviews) || 0,
      badge: form.badge || null,
      discount: Number(form.discount) || 0,
      image: form.image.trim(),
      hover_image: form.hover_image.trim() || null,
      description: form.description.trim() || null,
      is_active: form.is_active,
    };

    try {
      if (isEdit && id) {
        const { error } = await supabase.from('products').update(payload).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert(payload);
        if (error) throw error;
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await supabase.from('products').delete().eq('id', id);
      navigate('/admin/products');
    } catch {
      alert('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 rounded-luxe skeleton" />
        <div className="h-96 rounded-luxe skeleton" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <Link
        to="/admin/products"
        className="mb-4 inline-flex items-center gap-2 font-button text-sm text-charcoal-500 hover:text-rosegold-500"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <h1 className="font-display text-2xl font-bold text-charcoal-700">
        {isEdit ? 'Edit Product' : 'Add New Product'}
      </h1>

      <form onSubmit={handleSave} className="mt-6 space-y-6">
        {error && (
          <div className="rounded-luxe bg-red-50 px-4 py-3">
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Image preview */}
        <div className="rounded-luxe bg-white p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold text-charcoal-700">Product Image</h2>
          <div className="mt-4 flex gap-4">
            <div className="relative h-40 w-32 flex-shrink-0 overflow-hidden rounded-luxe bg-nude-100">
              {form.image ? (
                <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-charcoal-300">
                  <ImageIcon className="h-8 w-8" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-2.5 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                />
              </div>
              <div>
                <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                  Hover Image URL
                </label>
                <input
                  type="url"
                  name="hover_image"
                  value={form.hover_image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-2.5 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="rounded-luxe bg-white p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold text-charcoal-700">Product Details</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-2.5 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
              />
            </div>
            <div>
              <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-2.5 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                Badge
              </label>
              <select
                name="badge"
                value={form.badge}
                onChange={handleChange}
                className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-2.5 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
              >
                {BADGES.map((badge) => (
                  <option key={badge} value={badge}>{badge || 'None'}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-2.5 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
              />
            </div>
            <div>
              <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                Old Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                name="old_price"
                value={form.old_price}
                onChange={handleChange}
                className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-2.5 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
              />
            </div>
            <div>
              <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                Rating (0-5)
              </label>
              <input
                type="number"
                step="0.1"
                max="5"
                min="0"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-2.5 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
              />
            </div>
            <div>
              <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                Reviews Count
              </label>
              <input
                type="number"
                name="reviews"
                value={form.reviews}
                onChange={handleChange}
                className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-2.5 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
              />
            </div>
            <div>
              <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                Discount (%)
              </label>
              <input
                type="number"
                max="100"
                min="0"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-2.5 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-2.5 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-blush-300 text-rosegold-500 focus:ring-rosegold-400"
                />
                <span className="font-body text-sm text-charcoal-600">
                  Active (visible on storefront)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex items-center gap-2 disabled:opacity-60"
          >
            {saving ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isEdit ? 'Save Changes' : 'Create Product'}
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 rounded-full bg-red-50 px-6 py-4 font-button text-sm font-semibold uppercase tracking-wider text-red-500 transition-colors hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
