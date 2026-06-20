import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/AuthContext';
import { CartProvider } from '@/lib/cartContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import AppLayout from '@/components/layout/AppLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import ScrollToTop from '@/components/ScrollToTop';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import WatchDetail from '@/pages/WatchDetail';
import Wishlist from '@/pages/Wishlist';
import Account from '@/pages/Account';
import Admin from '@/pages/Admin';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <ScrollToTop />
              <Routes>
                {/* Auth routes (no layout) */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* App routes (with layout) */}
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/watch/:id" element={<WatchDetail />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/account" element={<Account />} />
                </Route>

                {/* Admin routes (protected) */}
                <Route element={<ProtectedRoute adminOnly />}>
                  <Route element={<AppLayout />}>
                    <Route path="/admin" element={<Admin />} />
                  </Route>
                </Route>
              </Routes>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
