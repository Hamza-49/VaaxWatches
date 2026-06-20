import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, DollarSign, Watch, ShoppingBag, Eye, Pencil, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import AdminWatchForm from '@/components/admin/AdminWatchForm';
import AdminOrderList from '@/components/admin/AdminOrderList';

export default function Admin() {
  const [watches, setWatches] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('watches');
  const [editingWatch, setEditingWatch] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [watchesRes, ordersRes] = await Promise.all([
        supabase.from('watches').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false })
      ]);

      if (watchesRes.error) throw watchesRes.error;
      if (ordersRes.error) throw ordersRes.error;

      setWatches(watchesRes.data || []);
      setOrders(ordersRes.data || []);
    } catch (error) {
      console.error('Error loading admin data:', error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard data."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWatch = async (watchId) => {
    if (!window.confirm('Are you sure you want to delete this timepiece?')) return;

    try {
      const { error } = await supabase.from('watches').delete().eq('id', watchId);
      if (error) throw error;

      setWatches(prev => prev.filter(w => w.id !== watchId));
      toast({ title: "Success", description: "Timepiece deleted successfully." });
    } catch (error) {
      console.error('Error deleting watch:', error.message);
    }
  };

  const handleSaveWatch = async (formData) => {
    try {
      setLoading(true);

      if (editingWatch) {
        const { error } = await supabase
          .from('watches')
          .update(formData)
          .eq('id', editingWatch.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('watches').insert([formData]);
        if (error) throw error;
      }

      setShowForm(false);
      setEditingWatch(null);
      await loadData();
      toast({
        title: "Success",
        description: `Timepiece ${editingWatch ? 'updated' : 'added'} successfully.`
      });
    } catch (error) {
      console.error('Error saving watch:', error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save timepiece."
      });
      setLoading(false);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;

  if (loading && watches.length === 0) {
    return (
      <div className="h-screen bg-void flex items-center justify-center">
        <div className="w-5 h-5 border border-text-secondary/30 border-t-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-void min-h-screen pt-32 pb-20 px-[8vw]">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl sm:text-5xl tracking-[-0.02em] text-text-primary mb-4"
      >
        The Observatory
      </motion.h1>

      <p className="text-sm text-text-secondary mb-12">Administration</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-stroke mb-16">
        <div className="bg-surface p-6">
          <div className="flex items-center gap-3 mb-3">
            <Watch size={14} className="text-text-secondary" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-text-secondary">Timepieces</p>
          </div>
          <p className="text-2xl font-display text-text-primary">{watches.length}</p>
        </div>

        <div className="bg-surface p-6">
          <div className="flex items-center gap-3 mb-3">
            <ShoppingBag size={14} className="text-text-secondary" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-text-secondary">Active Orders</p>
          </div>
          <p className="text-2xl font-display text-text-primary">{activeOrders}</p>
        </div>

        <div className="bg-surface p-6">
          <div className="flex items-center gap-3 mb-3">
            <DollarSign size={14} className="text-text-secondary" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-text-secondary">Revenue</p>
          </div>
          <p className="text-2xl font-display text-gold">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 mb-10 border-b border-stroke">
        <button
          onClick={() => setActiveTab('watches')}
          className={`pb-4 text-xs tracking-[0.2em] uppercase transition-colors duration-500 border-b ${
            activeTab === 'watches'
              ? 'text-text-primary border-gold'
              : 'text-text-secondary border-transparent hover:text-text-primary'
          }`}
        >
          Timepieces
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 text-xs tracking-[0.2em] uppercase transition-colors duration-500 border-b ${
            activeTab === 'orders'
              ? 'text-text-primary border-gold'
              : 'text-text-secondary border-transparent hover:text-text-primary'
          }`}
        >
          Orders
        </button>
      </div>

      {/* Content */}
      {activeTab === 'watches' && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-text-secondary">{watches.length} timepieces</p>

            <button
              onClick={() => {
                setEditingWatch(null);
                setShowForm(true);
              }}
              className="h-10 px-6 border border-stroke text-text-primary text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 hover:border-gold hover:text-gold transition-all duration-500"
            >
              <span>+</span>
              Add
            </button>
          </div>

          {showForm && (
            <AdminWatchForm
              watch={editingWatch}
              onSave={handleSaveWatch}
              onCancel={() => {
                setShowForm(false);
                setEditingWatch(null);
              }}
            />
          )}

          <div className="space-y-px">
            {watches.map(watch => (
              <div
                key={watch.id}
                className="bg-surface border border-stroke flex items-center gap-6 px-6 py-4"
              >
                <div className="w-14 h-14 bg-void flex-shrink-0 overflow-hidden">
                  <img src={watch.image_url} alt={watch.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">{watch.name}</p>
                  <p className="text-xs text-text-secondary">{watch.series} · {watch.case_material}</p>
                </div>

                <p className="text-sm text-gold">${watch.price?.toLocaleString()}</p>

                <p className="text-xs text-text-secondary">Stock: {watch.stock ?? 0}</p>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/watch/${watch.id}`}
                    className="w-8 h-8 border border-stroke flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary transition-all duration-500"
                  >
                    <Eye size={12} />
                  </Link>

                  <button
                    onClick={() => {
                      setEditingWatch(watch);
                      setShowForm(true);
                    }}
                    className="w-8 h-8 border border-stroke flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all duration-500"
                  >
                    <Pencil size={12} />
                  </button>

                  <button
                    onClick={() => handleDeleteWatch(watch.id)}
                    className="w-8 h-8 border border-stroke flex items-center justify-center text-text-secondary hover:text-red-500 hover:border-red-500 transition-all duration-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <AdminOrderList orders={orders} onRefresh={loadData} />
      )}
    </div>
  );
}
