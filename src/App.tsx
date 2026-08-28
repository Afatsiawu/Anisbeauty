import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { ToastProvider } from '@/lib/toast-context';
import { AdminProvider } from '@/lib/admin-context';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Checkout from '@/pages/Checkout';

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('@/pages/admin/AdminProducts'));
const ProductForm = lazy(() => import('@/pages/admin/ProductForm'));
const AdminOrders = lazy(() => import('@/pages/admin/AdminOrders'));
const ProtectedRoute = lazy(() => import('@/pages/admin/ProtectedRoute'));

function AdminLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-nude-50">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-rosegold-500 border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <AdminProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/admin/login"
                  element={
                    <Suspense fallback={<AdminLoader />}>
                      <AdminLogin />
                    </Suspense>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <Suspense fallback={<AdminLoader />}>
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <Suspense fallback={<AdminLoader />}>
                      <ProtectedRoute>
                        <AdminProducts />
                      </ProtectedRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="/admin/products/new"
                  element={
                    <Suspense fallback={<AdminLoader />}>
                      <ProtectedRoute>
                        <ProductForm />
                      </ProtectedRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="/admin/products/:id/edit"
                  element={
                    <Suspense fallback={<AdminLoader />}>
                      <ProtectedRoute>
                        <ProductForm />
                      </ProtectedRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <Suspense fallback={<AdminLoader />}>
                      <ProtectedRoute>
                        <AdminOrders />
                      </ProtectedRoute>
                    </Suspense>
                  }
                />
                <Route path="/admin" element={<AdminLogin />} />
              </Routes>
            </AdminProvider>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
