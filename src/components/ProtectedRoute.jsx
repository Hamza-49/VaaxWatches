import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>
);

export default function ProtectedRoute({ adminOnly = false }) {
  const { isAuthenticated, isLoadingAuth, profile } = useAuth();

  // 1. إلى كان الموقع مازال كيتأكد من السيسيون، نبينو الـ Loading
  if (isLoadingAuth) {
    return <DefaultFallback />;
  }

  // 2. إلى ما كانش اليوزر مكونيكطي، نصيفطوه لصفحة Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. إلى كان الراوت خاص غير بالأدمين (adminOnly={true}) وكان اليوزر ماشي أدمين، نمنعوه
  if (adminOnly && profile?.role !== 'admin') {
    return <Navigate to="/" replace />; // نصيفطوه للـ Home
  }

  // 4. كلشي مقاد، دوز للمحتوى (Outlet)
  return <Outlet />;
}