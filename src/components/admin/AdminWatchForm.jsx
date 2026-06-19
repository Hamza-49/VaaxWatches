import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Upload } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const SERIES = ['Void', 'Horizon', 'Apex', 'Eclipse', 'Genesis'];
const MATERIALS = ['Titanium', 'Stainless Steel', 'Ceramic', 'Carbon Fiber', 'Rose Gold'];
const MOVEMENTS = ['Automatic', 'Manual', 'Quartz', 'Tourbillon'];

export default function AdminWatchForm({ watch, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: watch?.name || '',
    series: watch?.series || 'Void',
    price: watch?.price || '',
    image_url: watch?.image_url || '',
    case_material: watch?.case_material || 'Titanium',
    movement: watch?.movement || 'Automatic',
    case_diameter: watch?.case_diameter || '',
    water_resistance: watch?.water_resistance || '',
    power_reserve: watch?.power_reserve || '',
    description: watch?.description || '',
    short_description: watch?.short_description || '',
    reference_number: watch?.reference_number || '',
    stock: watch?.stock ?? 10,
    is_featured: watch?.is_featured || false,
    is_new: watch?.is_new || false,
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `watches/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('products').getPublicUrl(filePath);
      handleChange('image_url', data.publicUrl);
      toast({ title: "Success", description: "Image uploaded successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Upload failed", description: error.message });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      toast({ variant: "destructive", title: "Validation Error", description: "Name is required." });
      return;
    }
    if (!form.image_url) {
      toast({ variant: "destructive", title: "Validation Error", description: "Product image is required." });
      return;
    }
    onSave({
      ...form,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0
    });
  };

  const inputClass = "w-full bg-void border border-stroke px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 focus:border-gold focus:outline-none transition-colors duration-500";
  const selectClass = "w-full bg-void border border-stroke px-4 py-3 text-sm text-text-primary focus:border-gold focus:outline-none transition-colors duration-500";
  const textareaClass = "w-full bg-void border border-stroke px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 focus:border-gold focus:outline-none transition-colors duration-500 resize-none";
  const checkboxLabel = "flex items-center gap-3 cursor-pointer";

  return (
    <div className="bg-surface border border-stroke p-8 mb-8">
      <div className="flex items-center justify-between mb-8">
        <p className="text-lg font-display text-text-primary">{watch ? 'Edit Timepiece' : 'New Timepiece'}</p>
        <button onClick={onCancel} className="text-text-secondary hover:text-text-primary transition-colors duration-500">
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Name *</label>
          <input className={inputClass} placeholder="VAAX Void Chronos" value={form.name} onChange={e => handleChange('name', e.target.value)} />
        </div>

        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Reference Number</label>
          <input className={inputClass} placeholder="VX-2024-001" value={form.reference_number} onChange={e => handleChange('reference_number', e.target.value)} />
        </div>

        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Series *</label>
          <select className={selectClass} value={form.series} onChange={e => handleChange('series', e.target.value)}>
            {SERIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Price ($) *</label>
          <input type="number" className={inputClass} placeholder="12500" value={form.price} onChange={e => handleChange('price', e.target.value)} />
        </div>

        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Stock</label>
          <input type="number" className={inputClass} placeholder="10" value={form.stock} onChange={e => handleChange('stock', e.target.value)} />
        </div>

        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Case Material *</label>
          <select className={selectClass} value={form.case_material} onChange={e => handleChange('case_material', e.target.value)}>
            {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Movement *</label>
          <select className={selectClass} value={form.movement} onChange={e => handleChange('movement', e.target.value)}>
            {MOVEMENTS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Case Diameter</label>
          <input className={inputClass} placeholder="42mm" value={form.case_diameter} onChange={e => handleChange('case_diameter', e.target.value)} />
        </div>

        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Water Resistance</label>
          <input className={inputClass} placeholder="100m" value={form.water_resistance} onChange={e => handleChange('water_resistance', e.target.value)} />
        </div>

        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Power Reserve</label>
          <input className={inputClass} placeholder="72 hours" value={form.power_reserve} onChange={e => handleChange('power_reserve', e.target.value)} />
        </div>

        <div className="flex items-end gap-6">
          <label className={checkboxLabel}>
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={e => handleChange('is_featured', e.target.checked)}
              className="w-4 h-4 border border-stroke bg-void checked:bg-gold checked:border-gold focus:ring-gold"
            />
            <span className="text-xs text-text-secondary">Featured</span>
          </label>
          <label className={checkboxLabel}>
            <input
              type="checkbox"
              checked={form.is_new}
              onChange={e => handleChange('is_new', e.target.checked)}
              className="w-4 h-4 border border-stroke bg-void checked:bg-gold checked:border-gold focus:ring-gold"
            />
            <span className="text-xs text-text-secondary">New Arrival</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Short Description</label>
          <input className={inputClass} placeholder="Where nothing becomes everything." value={form.short_description} onChange={e => handleChange('short_description', e.target.value)} />
        </div>

        <div className="md:col-span-1">
          <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Product Image *</label>
          <div className="flex items-center gap-4">
            {form.image_url && (
              <div className="w-20 h-20 bg-void overflow-hidden flex-shrink-0 border border-stroke">
                <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <label className="h-10 px-4 border border-stroke text-text-secondary text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 cursor-pointer hover:border-gold hover:text-gold transition-all duration-500">
              <Upload size={12} />
              {uploading ? 'Uploading...' : 'Upload Image'}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-2 block">Full Description</label>
        <textarea
          className={textareaClass}
          rows={4}
          placeholder="Detailed product description..."
          value={form.description}
          onChange={e => handleChange('description', e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-stroke">
        <button
          onClick={handleSubmit}
          className="h-10 px-8 border border-stroke text-text-primary text-[10px] tracking-[0.2em] uppercase hover:bg-gold hover:text-void hover:border-gold transition-all duration-500"
        >
          {watch ? 'Update Timepiece' : 'Create Timepiece'}
        </button>
        <button
          onClick={onCancel}
          className="h-10 px-8 text-text-secondary text-[10px] tracking-[0.2em] uppercase hover:text-text-primary transition-colors duration-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
