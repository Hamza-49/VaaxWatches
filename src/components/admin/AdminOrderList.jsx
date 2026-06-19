import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from "@/components/ui/use-toast";
import { MessageCircle, User, MapPin, Phone, ChevronDown, ChevronUp } from 'lucide-react';

const STATUSES = ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const STATUS_STYLES = {
  processing: 'text-text-secondary',
  confirmed: 'text-text-primary',
  shipped: 'text-gold',
  delivered: 'text-text-primary',
  cancelled: 'text-text-secondary/50',
};

export default function AdminOrderList({ orders, onRefresh }) {
  const [updatingId, setUpdatingId] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      await onRefresh();
      toast({ title: "Success", description: "Order status updated." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleTrackingUpdate = async (orderId, trackingNumber) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ tracking_number: trackingNumber })
        .eq('id', orderId);

      if (error) throw error;
      toast({ title: "Success", description: "Tracking number updated." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const generateWhatsAppLink = (order) => {
    const phone = order.whatsapp_number || order.phone_number;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

    const orderItems = order.items || [];
    const itemsList = orderItems.map(item =>
      `- ${item.watch_name} (Qty: ${item.quantity}) - $${item.price?.toLocaleString()}`
    ).join('\n');

    const message = encodeURIComponent(
`Hello ${order.first_name} ${order.last_name},

Thank you for your order at VAAX Watches!

Order #${order.id.slice(0, 8).toUpperCase()}
Status: ${order.status}

Items:
${itemsList}

Total: $${order.total?.toLocaleString()}

Delivery Address:
${order.address}

We wanted to confirm your order details. Is everything correct?

Best regards,
VAAX Watches`
    );

    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-px bg-stroke">
      {orders.map((order) => {
        const isExpanded = expandedOrders.has(order.id);
        const orderItems = order.items || [];

        return (
          <div key={order.id} className="bg-surface">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                <button
                  onClick={() => toggleExpand(order.id)}
                  className="flex items-center gap-2 flex-1 min-w-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-xs font-mono text-text-secondary">#{order.id.slice(0, 8)}</p>
                      <span className={`text-[10px] tracking-[0.2em] uppercase ${STATUS_STYLES[order.status] || 'text-text-secondary'}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-text-primary font-display">${order.total?.toLocaleString()}</p>
                    <p className="text-xs text-text-secondary mt-1">{formatDate(order.created_at)}</p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-text-secondary flex-shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-text-secondary flex-shrink-0" />
                  )}
                </button>

                <div className="flex items-center gap-3 flex-wrap">
                  <select
                    className="bg-void border border-stroke px-3 py-2 text-xs uppercase tracking-[0.1em] cursor-pointer"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    disabled={updatingId === order.id}
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>

                  <input
                    className="bg-void border border-stroke px-3 py-2 text-xs w-40 focus:border-gold outline-none"
                    placeholder="Tracking number"
                    defaultValue={order.tracking_number || ''}
                    onBlur={(e) => handleTrackingUpdate(order.id, e.target.value)}
                  />

                  {(order.whatsapp_number || order.phone_number) && (
                    <a
                      href={generateWhatsAppLink(order)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white text-xs tracking-[0.1em] uppercase flex items-center gap-2 transition-colors duration-500"
                    >
                      <MessageCircle size={14} />
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-stroke">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-3 flex items-center gap-2">
                        <User size={12} />
                        Customer
                      </p>
                      <div className="space-y-2 text-sm">
                        <p className="text-text-primary">{order.first_name} {order.last_name}</p>
                        <p className="text-text-secondary">{order.email || 'N/A'}</p>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Phone size={12} />
                          <span>{order.phone_number}</span>
                        </div>
                        {order.whatsapp_number && (
                          <div className="flex items-center gap-2 text-text-secondary">
                            <MessageCircle size={12} />
                            <span>{order.whatsapp_number}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-3 flex items-center gap-2">
                        <MapPin size={12} />
                        Shipping Address
                      </p>
                      <p className="text-sm text-text-secondary whitespace-pre-line">{order.address}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-3">Order Items</p>
                    <div className="space-y-3">
                      {orderItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 bg-void/50 border border-stroke">
                          {item.image_url && (
                            <img
                              src={item.image_url}
                              alt={item.watch_name}
                              className="w-16 h-16 object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-text-primary truncate">{item.watch_name}</p>
                            <p className="text-xs text-text-secondary">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm text-gold">${item.price?.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
