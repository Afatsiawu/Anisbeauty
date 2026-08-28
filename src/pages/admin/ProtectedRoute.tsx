import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAdmin } from '@/lib/admin-context';
import AdminLayout from './AdminLayout';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAdmin();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-nude-50">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-rosegold-500 border-t-transparent" />
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;

  return <AdminLayout>{children}</AdminLayout>;
}
