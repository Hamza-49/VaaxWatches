import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Eye, Package, Clock, Shield, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/AuthContext';
import { toast } from '@/components/ui/use-toast';

const STATUS_STYLES = {
  processing: 'text-text-secondary',
  confirmed: 'text-text-primary',
  shipped: 'text-gold',
  delivered: 'text-text-primary',
  cancelled: 'text-text-secondary/50'
};

export default function Account() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile(profileData);

        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;
        setOrders(ordersData || []);
      } catch (error) {
        console.error('Error loading account data:', error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="h-screen bg-void flex items-center justify-center">
        <div className="w-5 h-5 border border-text-secondary/30 border-t-gold animate-spin" />
      </div>
    );
  }

  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const pastOrders = orders.filter(o => o.status === 'delivered' || o.status === 'cancelled');

  return (
    <div className="bg-void min-h-screen pt-32 pb-20 px-[8vw]">
      {/* Header */}
      <div className="flex items-start justify-between mb-16">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl tracking-[-0.02em] text-text-primary"
          >
            The Ledger
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-text-secondary mt-3"
          >
            {profile?.full_name || user?.email}
          </motion.p>
        </div>

        <div className="flex items-center gap-4">
          {profile?.role === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-gold transition-colors duration-500"
            >
              <Eye size={14} />
              Observatory
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-500"
          >
            <LogOut size={14} />
            Exit
          </button>
        </div>
      </div>

      {/* Active Orders */}
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <Clock size={16} className="text-text-secondary" strokeWidth={1.5} />
          <p className="text-xs tracking-[0.2em] uppercase text-text-secondary">Active Orders</p>
        </div>

        {activeOrders.length === 0 ? (
          <div className="bg-surface border border-stroke p-8 text-center">
            <p className="text-sm text-text-secondary">No active orders</p>
          </div>
        ) : (
          <div className="space-y-px">
            {activeOrders.map((order, i) => (
              <OrderItem key={order.id} order={order} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Past Orders */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <Package size={16} className="text-text-secondary" strokeWidth={1.5} />
          <p className="text-xs tracking-[0.2em] uppercase text-text-secondary">Vault</p>
        </div>

        {pastOrders.length === 0 ? (
          <div className="bg-surface border border-stroke p-8 text-center">
            <p className="text-sm text-text-secondary">No past orders</p>
          </div>
        ) : (
          <div className="space-y-px">
            {pastOrders.map((order, i) => (
              <OrderItem key={order.id} order={order} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function OrderItem({ order, index }) {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(order.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const items = order.items || order.order_items || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface border border-stroke"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <div className="flex items-center gap-8">
          <span className="text-xs font-mono text-text-secondary">
            #{order.id?.slice(0, 8)}
          </span>
          <span className="text-sm text-text-primary">{date}</span>
          <span className={`text-[10px] tracking-[0.2em] uppercase ${STATUS_STYLES[order.status] || 'text-text-secondary'}`}>
            {order.status}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gold">
            ${order.total?.toLocaleString()}
          </span>
          <ChevronRight
            size={14}
            className={`text-text-secondary transition-transform duration-500 ${expanded ? 'rotate-90' : ''}`}
          />
        </div>
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-stroke px-6 py-5"
        >
          <div className="space-y-4">
            {items.map((item, i) => {
              const watch = item.watches;
              const name = item.watch_name || watch?.name || 'Unknown Timepiece';
              const image = item.image_url || watch?.image_url;
              const price = item.price_at_time ?? item.price;

              return (
                <div key={i} className="flex items-center gap-4">
                  {image && (
                    <div className="w-12 h-12 bg-void flex-shrink-0 overflow-hidden">
                      <img src={image} alt={name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-text-primary">{name}</p>
                    <p className="text-xs text-text-secondary">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm text-text-secondary">
                    ${price?.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>

          {order.tracking_number && (
            <div className="mt-4 pt-4 border-t border-stroke">
              <p className="text-xs text-text-secondary">Tracking</p>
              <p className="text-sm font-mono text-text-primary mt-1">
                {order.tracking_number}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
